import { clinicInfo } from '../data/clinicInfo';

export interface StoredAppointment {
  id: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  mainConcern?: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED';
  createdAt: string;
  confirmedAt?: string;
}

const STORAGE_KEY = 'dr_hashi_active_appointment';

/**
 * Generates a unique, human-readable appointment reference ID.
 * Format: HASHI-YYYYMMDD-XXXX
 */
export function generateReferenceId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `HASHI-${dateStr}-${randomSuffix}`;
}

/**
 * Saves a new appointment request to browser localStorage.
 */
export function saveAppointment(appointmentData: Omit<StoredAppointment, 'id' | 'status' | 'createdAt'>): StoredAppointment {
  const newAppointment: StoredAppointment = {
    ...appointmentData,
    id: generateReferenceId(),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointment));
  } catch (err) {
    console.error('Failed to save appointment to localStorage:', err);
  }

  return newAppointment;
}

/**
 * Retrieves the current active appointment from localStorage.
 */
export function getActiveAppointment(): StoredAppointment | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as StoredAppointment;
  } catch (err) {
    console.error('Failed to parse appointment from localStorage:', err);
    return null;
  }
}

/**
 * Updates the status of the current active appointment (e.g., CONFIRMED).
 * Triggers a web browser notification if permission is granted.
 */
export function updateAppointmentStatus(status: 'PENDING' | 'CONFIRMED'): StoredAppointment | null {
  const current = getActiveAppointment();
  if (!current) return null;

  const updated: StoredAppointment = {
    ...current,
    status,
    confirmedAt: status === 'CONFIRMED' ? new Date().toISOString() : undefined,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update appointment in localStorage:', err);
  }

  if (status === 'CONFIRMED') {
    triggerConfirmationNotification(updated);
  }

  return updated;
}

/**
 * Clears the active appointment from localStorage.
 */
export function clearActiveAppointment(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear appointment from localStorage:', err);
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
 * Triggers a native Web Browser Notification when appointment is confirmed.
 */
export function triggerConfirmationNotification(appointment: StoredAppointment): void {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    const title = `🟢 Appointment Confirmed! - ${clinicInfo.name}`;
    const options: NotificationOptions = {
      body: `Hi ${appointment.name}, Dr Hashi has confirmed your session for ${appointment.preferredDate} (${appointment.preferredTime}). See you at the clinic!`,
      icon: '/favicon.ico',
      tag: appointment.id,
    };
    new Notification(title, options);
  }
}
