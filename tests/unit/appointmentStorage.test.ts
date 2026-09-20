import { describe, it, expect, beforeEach } from 'vitest';
import { saveAppointment, getActiveAppointment, updateAppointmentStatus, clearActiveAppointment } from '../../src/utils/appointmentStorage';

describe('appointmentStorage', () => {
  beforeEach(() => {
    clearActiveAppointment();
  });

  it('should save and retrieve an appointment with unique reference ID', () => {
    const saved = saveAppointment({
      name: 'Priya Sharma',
      phone: '9876543210',
      preferredDate: '2026-10-01',
      preferredTime: 'Morning',
      mainConcern: 'Neck Pain',
    });

    expect(saved.id).toContain('HASHI-');
    expect(saved.status).toBe('PENDING');

    const retrieved = getActiveAppointment();
    expect(retrieved).not.toBeNull();
    expect(retrieved?.name).toBe('Priya Sharma');
  });

  it('should update appointment status to CONFIRMED', () => {
    saveAppointment({
      name: 'Anish Kumar',
      phone: '9988776655',
      preferredDate: '2026-10-02',
      preferredTime: 'Evening',
    });

    const updated = updateAppointmentStatus('CONFIRMED');
    expect(updated?.status).toBe('CONFIRMED');
    expect(updated?.confirmedAt).toBeDefined();

    const current = getActiveAppointment();
    expect(current?.status).toBe('CONFIRMED');
  });
});
