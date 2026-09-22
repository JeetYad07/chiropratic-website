import { StoredAppointment } from './appointmentStorage';
import { appointmentApiService } from '../services/appointmentApiService';

export interface BookingValidationResult {
  isValid: boolean;
  errorCode?: 'PAST_DATE' | 'INVALID_PHONE' | 'DUPLICATE_REQUEST' | 'INVALID_SLOT';
  message?: string;
}

/**
 * Validates requested appointment date to ensure it is not in the past.
 */
export function isFutureOrTodayDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const targetDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return targetDate >= today;
}

/**
 * Validates Indian 10-digit mobile number format.
 */
export function isValidPhoneNumber(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Valid Indian mobile numbers are 10 digits, or 12 digits with country code 91
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return true;
  }
  if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]\d{9}$/.test(digits)) {
    return true;
  }
  return false;
}

/**
 * Checks if an active duplicate appointment request was already placed
 * within the last 2 hours for the same phone number and date.
 */
export function checkDuplicateBooking(
  phone: string,
  preferredDate: string,
  explicitRecord?: StoredAppointment | null
): { isDuplicate: boolean; existingRecord?: StoredAppointment } {
  const cleanInputPhone = phone.replace(/\D/g, '');
  if (!cleanInputPhone) return { isDuplicate: false };

  if (explicitRecord) {
    const cleanActivePhone = explicitRecord.phone.replace(/\D/g, '');
    const isSamePhone = cleanInputPhone.endsWith(cleanActivePhone) || cleanActivePhone.endsWith(cleanInputPhone);
    const isSameDate = explicitRecord.preferredDate === preferredDate;

    if (isSamePhone && isSameDate && (explicitRecord.status === 'PENDING_CONFIRMATION' || explicitRecord.status === 'CONFIRMED')) {
      const createdTime = new Date(explicitRecord.createdAt).getTime();
      const now = Date.now();
      const twoHoursInMs = 2 * 60 * 60 * 1000;

      if (now - createdTime < twoHoursInMs) {
        return { isDuplicate: true, existingRecord: explicitRecord };
      }
    }
    return { isDuplicate: false };
  }

  // Check backend records specifically for this phone number
  const matches = appointmentApiService.getAppointments({ search: cleanInputPhone });
  const found = matches.find((appt) => {
    const cleanApptPhone = appt.phone.replace(/\D/g, '');
    const isSamePhone = cleanInputPhone.endsWith(cleanApptPhone) || cleanApptPhone.endsWith(cleanInputPhone);
    const isSameDate = appt.preferredDate === preferredDate;
    const isPendingOrConfirmed = appt.status === 'PENDING_CONFIRMATION' || appt.status === 'CONFIRMED';
    if (isSamePhone && isSameDate && isPendingOrConfirmed) {
      const createdTime = new Date(appt.createdAt).getTime();
      const now = Date.now();
      const twoHoursInMs = 2 * 60 * 60 * 1000;
      return now - createdTime < twoHoursInMs;
    }
    return false;
  });

  if (found) {
    return { isDuplicate: true, existingRecord: found };
  }

  return { isDuplicate: false };
}

/**
 * Full pre-booking validation validator.
 */
export function validateBookingRequest(params: {
  phone: string;
  preferredDate: string;
  preferredTime: string;
}): BookingValidationResult {
  if (!isValidPhoneNumber(params.phone)) {
    return {
      isValid: false,
      errorCode: 'INVALID_PHONE',
      message: 'Please enter a valid 10-digit Indian mobile number.',
    };
  }

  if (!isFutureOrTodayDate(params.preferredDate)) {
    return {
      isValid: false,
      errorCode: 'PAST_DATE',
      message: 'Appointment date cannot be in the past. Please select today or a future date.',
    };
  }

  const duplicateCheck = checkDuplicateBooking(params.phone, params.preferredDate);
  if (duplicateCheck.isDuplicate) {
    return {
      isValid: false,
      errorCode: 'DUPLICATE_REQUEST',
      message: `You already have an active request (${duplicateCheck.existingRecord?.id}) for this date. Please wait for clinic confirmation or contact via WhatsApp.`,
    };
  }

  return { isValid: true };
}
