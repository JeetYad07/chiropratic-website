import { clinicInfo } from '../data/clinicInfo';
import { AppointmentRecord, BookingStatus } from '../types/booking';
import { appointmentApiService, ADMIN_AUTH_TOKEN } from '../services/appointmentApiService';

export type StoredAppointment = AppointmentRecord;

const STORAGE_ACTIVE_KEY = 'dr_hashi_active_appointment';

/**
 * Saves a new appointment request to both the backend repository and active session.
 * Initial status is strictly PENDING_CONFIRMATION.
 */
export function saveAppointment(
  appointmentData: Omit<AppointmentRecord, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'statusHistory'>
): AppointmentRecord {
  const res = appointmentApiService.createAppointment({
    name: appointmentData.name,
    phone: appointmentData.phone,
    preferredDate: appointmentData.preferredDate,
    preferredTime: appointmentData.preferredTime,
    mainConcern: appointmentData.mainConcern,
    message: appointmentData.message,
  });

  const record = res.data!;
  try {
    localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(record));
  } catch (err) {
    console.error('Failed to save active appointment:', err);
  }

  return record;
}

/**
 * Retrieves the current active appointment from storage or fetches fresh record from API.
 */
export function getActiveAppointment(): AppointmentRecord | null {
  try {
    const data = localStorage.getItem(STORAGE_ACTIVE_KEY);
    if (!data) return null;
    const active = JSON.parse(data) as AppointmentRecord;
    // Sync latest state from backend DB
    const fresh = appointmentApiService.getAppointmentById(active.id);
    return fresh || active;
  } catch (err) {
    console.error('Failed to parse active appointment:', err);
    return null;
  }
}

/**
 * Updates status of active appointment (doctor simulation or admin action).
 */
export function updateAppointmentStatus(status: BookingStatus): AppointmentRecord | null {
  const current = getActiveAppointment();
  if (!current) return null;

  let res;
  if (status === 'CONFIRMED') {
    res = appointmentApiService.confirmAppointment(current.id, ADMIN_AUTH_TOKEN);
  } else if (status === 'DECLINED') {
    res = appointmentApiService.declineAppointment(current.id, ADMIN_AUTH_TOKEN);
  } else {
    res = appointmentApiService.updateAppointmentStatus(current.id, status, ADMIN_AUTH_TOKEN);
  }

  if (res.success && res.data) {
    localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(res.data));
    if (status === 'CONFIRMED') {
      triggerConfirmationNotification(res.data);
    }
    return res.data;
  }

  return current;
}

/**
 * Clears active appointment from local session.
 */
export function clearActiveAppointment(): void {
  try {
    localStorage.removeItem(STORAGE_ACTIVE_KEY);
  } catch (err) {
    console.error('Failed to clear active appointment:', err);
  }
}

/**
 * Requests browser notification permission.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

/**
 * Triggers a Web Push Notification when doctor confirms appointment.
 */
export function triggerConfirmationNotification(appointment: AppointmentRecord): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  try {
    new Notification('🟢 Appointment Confirmed by Dr Hashi', {
      body: `Your chiropractic session is confirmed for ${appointment.preferredDate} (${appointment.preferredTime}) at ${clinicInfo.name}.`,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: appointment.id,
    });
  } catch (err) {
    console.error('Failed to trigger web notification:', err);
  }
}
