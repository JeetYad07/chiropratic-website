import { describe, it, expect } from 'vitest';
import { notificationService } from '../../src/services/notificationService';
import { AppointmentRecord } from '../../src/types/booking';

describe('NotificationService', () => {
  const sampleAppointment: AppointmentRecord = {
    id: 'HASHI-20260922-9999',
    name: 'Rahul Sharma',
    phone: '9876543210',
    preferredDate: '2026-09-25',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    mainConcern: 'Lower Back Pain',
    status: 'PENDING_CONFIRMATION',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('formats doctor appointment request notification correctly with structured doctor action commands', () => {
    const text = notificationService.formatDoctorAppointmentRequestMessage(sampleAppointment);

    expect(text).toContain('NEW APPOINTMENT REQUEST');
    expect(text).toContain('Patient: Rahul Sharma');
    expect(text).toContain('Phone: 9876543210');
    expect(text).toContain('Concern: Lower Back Pain');
    expect(text).toContain('Booking Ref: HASHI-20260922-9999');
    expect(text).toContain('CONFIRM HASHI-20260922-9999');
    expect(text).toContain('DECLINE HASHI-20260922-9999');
    expect(text).toContain('ALTERNATIVE HASHI-20260922-9999 <newDate> <newTime>');
  });

  it('formats patient confirmation message correctly', () => {
    const text = notificationService.formatPatientConfirmationMessage(sampleAppointment);

    expect(text).toContain('Your appointment with Dr. Hashi Chiropractic is confirmed.');
    expect(text).toContain('Date: 2026-09-25');
    expect(text).toContain('Time: Morning (9:00 AM - 12:00 PM)');
    expect(text).toContain('Booking Ref: HASHI-20260922-9999');
    expect(text).toContain('Clinic:');
  });

  it('formats patient declined message correctly', () => {
    const text = notificationService.formatPatientDeclinedMessage();
    expect(text).toContain('Your appointment request could not be accommodated for the requested time.');
  });

  it('formats doctor alternative proposal message correctly with patient review link', () => {
    const text = notificationService.formatAlternativeProposalMessage(
      sampleAppointment,
      '2026-09-26',
      'Evening (4:00 PM - 5:00 PM)'
    );

    expect(text).toContain('Dr. Hashi has suggested an alternative appointment:');
    expect(text).toContain('Date: 2026-09-26');
    expect(text).toContain('Time: Evening (4:00 PM - 5:00 PM)');
    expect(text).toContain('/appointments/HASHI-20260922-9999');
  });

  it('formats patient alternative response notification correctly', () => {
    const acceptedText = notificationService.formatPatientAlternativeResponseMessage(sampleAppointment, true);
    expect(acceptedText).toContain('PATIENT RESPONSE - ALTERNATIVE TIME');
    expect(acceptedText).toContain('Decision: ✅ ACCEPTED');

    const declinedText = notificationService.formatPatientAlternativeResponseMessage(sampleAppointment, false);
    expect(declinedText).toContain('Decision: ❌ DECLINED');
  });
});
