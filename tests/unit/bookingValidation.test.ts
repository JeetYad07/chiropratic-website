import { describe, it, expect } from 'vitest';
import {
  isValidPhoneNumber,
  isFutureOrTodayDate,
  checkDuplicateBooking,
  validateBookingRequest,
} from '../../src/utils/bookingValidation';
import { StoredAppointment } from '../../src/utils/appointmentStorage';

describe('Booking Validation & Anti-Duplicate Guards', () => {
  it('validates 10-digit Indian phone numbers', () => {
    expect(isValidPhoneNumber('9876543210')).toBe(true);
    expect(isValidPhoneNumber('+91 98765 43210')).toBe(true);
    expect(isValidPhoneNumber('12345')).toBe(false);
    expect(isValidPhoneNumber('0000000000')).toBe(false);
  });

  it('rejects past dates and permits today or future dates', () => {
    const today = new Date().toISOString().split('T')[0];
    const future = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];
    const past = '2020-01-01';

    expect(isFutureOrTodayDate(today)).toBe(true);
    expect(isFutureOrTodayDate(future)).toBe(true);
    expect(isFutureOrTodayDate(past)).toBe(false);
  });

  it('detects duplicate active bookings within 2-hour window', () => {
    const activeRecord: StoredAppointment = {
      id: 'HASHI-20260922-1111',
      name: 'John Doe',
      phone: '9876543210',
      preferredDate: '2026-09-25',
      preferredTime: 'Morning (9:00 AM - 12:00 PM)',
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const duplicateResult = checkDuplicateBooking('9876543210', '2026-09-25', activeRecord);
    expect(duplicateResult.isDuplicate).toBe(true);
    expect(duplicateResult.existingRecord?.id).toBe('HASHI-20260922-1111');

    // Different date is not duplicate
    const differentDateResult = checkDuplicateBooking('9876543210', '2026-09-26', activeRecord);
    expect(differentDateResult.isDuplicate).toBe(false);
  });

  it('runs complete pre-booking request validation', () => {
    const futureDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const validResult = validateBookingRequest({
      phone: '9876543210',
      preferredDate: futureDate,
      preferredTime: 'Morning',
    });
    expect(validResult.isValid).toBe(true);

    const invalidPhoneResult = validateBookingRequest({
      phone: '123',
      preferredDate: futureDate,
      preferredTime: 'Morning',
    });
    expect(invalidPhoneResult.isValid).toBe(false);
    expect(invalidPhoneResult.errorCode).toBe('INVALID_PHONE');
  });
});
