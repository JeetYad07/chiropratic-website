import { describe, it, expect, beforeEach } from 'vitest';
import {
  appointmentApiService,
  ADMIN_AUTH_TOKEN,
} from '../../src/services/appointmentApiService';

describe('AppointmentApiService & Confirmation Workflow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('creates booking with initial status PENDING_CONFIRMATION', () => {
    const res = appointmentApiService.createAppointment({
      name: 'Priya Nair',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning (9:00 AM - 12:00 PM)',
      mainConcern: 'Cervical Neck Care',
    });

    expect(res.success).toBe(true);
    expect(res.data?.status).toBe('PENDING_CONFIRMATION');
    expect(res.data?.id).toMatch(/^HASHI-/);

    // Verify status history audit record
    const history = appointmentApiService.getStatusHistory(res.data!.id);
    expect(history.length).toBe(1);
    expect(history[0].new_status).toBe('PENDING_CONFIRMATION');
    expect(history[0].changed_by).toBe('patient');
  });

  it('allows authorized doctor to confirm appointment and records audit history', () => {
    const createRes = appointmentApiService.createAppointment({
      name: 'Amit Patel',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning',
    });
    const id = createRes.data!.id;

    // Doctor confirms
    const confirmRes = appointmentApiService.confirmAppointment(id, ADMIN_AUTH_TOKEN);
    expect(confirmRes.success).toBe(true);
    expect(confirmRes.data?.status).toBe('CONFIRMED');
    expect(confirmRes.data?.confirmedAt).toBeDefined();

    // Verify audit trail
    const history = appointmentApiService.getStatusHistory(id);
    expect(history.length).toBe(2);
    expect(history[0].previous_status).toBe('PENDING_CONFIRMATION');
    expect(history[0].new_status).toBe('CONFIRMED');
    expect(history[0].changed_by).toBe('doctor');

    // Idempotency: Confirming again returns CONFIRMED without extra duplicate history
    const secondConfirmRes = appointmentApiService.confirmAppointment(id, ADMIN_AUTH_TOKEN);
    expect(secondConfirmRes.success).toBe(true);
    expect(secondConfirmRes.data?.status).toBe('CONFIRMED');
    expect(appointmentApiService.getStatusHistory(id).length).toBe(2);
  });

  it('rejects confirmation with invalid or missing admin token', () => {
    const createRes = appointmentApiService.createAppointment({
      name: 'Test Patient',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning',
    });
    const id = createRes.data!.id;

    const failRes = appointmentApiService.confirmAppointment(id, 'wrong_token');
    expect(failRes.success).toBe(false);
    expect(failRes.errorCode).toBe('UNAUTHORIZED');

    // Status remains PENDING_CONFIRMATION
    const fresh = appointmentApiService.getAppointmentById(id);
    expect(fresh?.status).toBe('PENDING_CONFIRMATION');
  });

  it('allows doctor to decline appointment and transitions status to DECLINED', () => {
    const createRes = appointmentApiService.createAppointment({
      name: 'Vikram Singh',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning',
    });
    const id = createRes.data!.id;

    const declineRes = appointmentApiService.declineAppointment(id, ADMIN_AUTH_TOKEN, 'Clinic closed for holiday');
    expect(declineRes.success).toBe(true);
    expect(declineRes.data?.status).toBe('DECLINED');
    expect(declineRes.data?.declineReason).toBe('Clinic closed for holiday');

    const history = appointmentApiService.getStatusHistory(id);
    expect(history[0].new_status).toBe('DECLINED');
  });

  it('executes full alternative proposal and patient acceptance lifecycle', () => {
    const createRes = appointmentApiService.createAppointment({
      name: 'Sneha Roy',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning',
    });
    const id = createRes.data!.id;

    // 1. Doctor proposes alternative time
    const altRes = appointmentApiService.proposeAlternative(
      id,
      '2026-09-29',
      'Evening (4:00 PM - 5:00 PM)',
      ADMIN_AUTH_TOKEN,
      'Morning slots full'
    );
    expect(altRes.success).toBe(true);
    expect(altRes.data?.status).toBe('ALTERNATIVE_PROPOSED');
    expect(altRes.data?.alternativeSlot?.date).toBe('2026-09-29');

    // 2. Patient accepts alternative
    const acceptRes = appointmentApiService.patientRespondAlternative(id, 'ACCEPT');
    expect(acceptRes.success).toBe(true);
    expect(acceptRes.data?.status).toBe('CONFIRMED');
    expect(acceptRes.data?.preferredDate).toBe('2026-09-29');
    expect(acceptRes.data?.preferredTime).toBe('Evening (4:00 PM - 5:00 PM)');

    // 3. Verify complete audit trail: PENDING -> ALTERNATIVE_PROPOSED -> CONFIRMED
    const history = appointmentApiService.getStatusHistory(id);
    expect(history.length).toBe(3);
    expect(history[0].new_status).toBe('CONFIRMED');
    expect(history[0].changed_by).toBe('patient');
    expect(history[1].new_status).toBe('ALTERNATIVE_PROPOSED');
    expect(history[1].changed_by).toBe('doctor');
  });

  it('handles patient declining proposed alternative time', () => {
    const createRes = appointmentApiService.createAppointment({
      name: 'Anil K',
      phone: '9876543210',
      preferredDate: '2026-09-28',
      preferredTime: 'Morning',
    });
    const id = createRes.data!.id;

    appointmentApiService.proposeAlternative(id, '2026-09-29', 'Evening', ADMIN_AUTH_TOKEN);
    const declineRes = appointmentApiService.patientRespondAlternative(id, 'DECLINE');

    expect(declineRes.success).toBe(true);
    expect(declineRes.data?.status).toBe('DECLINED');
  });
});
