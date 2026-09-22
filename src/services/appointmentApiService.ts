import { AppointmentRecord, BookingStatus, AppointmentFormData } from '../types/booking';
import { AppointmentStatusHistory } from '../types/statusHistory';
import { notificationService } from './notificationService';

const APPOINTMENTS_DB_KEY = 'dr_hashi_appointments_db';
const STATUS_HISTORY_DB_KEY = 'dr_hashi_status_history_db';
export const ADMIN_AUTH_TOKEN = 'dr_hashi_admin_auth_2026';

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: string;
}

export interface AppointmentFilters {
  status?: BookingStatus | 'ALL';
  search?: string;
}

/**
 * Valid state transition matrix
 */
const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  PENDING_CONFIRMATION: ['CONFIRMED', 'DECLINED', 'ALTERNATIVE_PROPOSED', 'CANCELLED'],
  ALTERNATIVE_PROPOSED: ['CONFIRMED', 'DECLINED', 'CANCELLED'],
  CONFIRMED: ['COMPLETED', 'NO_SHOW', 'CANCELLED', 'CONFIRMED'], // Idempotent CONFIRMED
  DECLINED: ['DECLINED'], // Terminal/Idempotent
  CANCELLED: ['CANCELLED'], // Terminal/Idempotent
  COMPLETED: ['COMPLETED'], // Terminal/Idempotent
  NO_SHOW: ['NO_SHOW'], // Terminal/Idempotent
};

export class AppointmentApiService {
  /**
   * Generates a unique, human-readable appointment reference ID.
   * Format: HASHI-YYYYMMDD-XXXX
   */
  private generateReferenceId(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `HASHI-${dateStr}-${randomSuffix}`;
  }

  private getStoredAppointments(): AppointmentRecord[] {
    try {
      const raw = localStorage.getItem(APPOINTMENTS_DB_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as AppointmentRecord[];
    } catch {
      return [];
    }
  }

  private saveAppointments(appointments: AppointmentRecord[]): void {
    try {
      localStorage.setItem(APPOINTMENTS_DB_KEY, JSON.stringify(appointments));
    } catch (err) {
      console.error('Failed to write appointments DB:', err);
    }
  }

  private getStoredHistory(): AppointmentStatusHistory[] {
    try {
      const raw = localStorage.getItem(STATUS_HISTORY_DB_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as AppointmentStatusHistory[];
    } catch {
      return [];
    }
  }

  private saveHistoryRecord(history: AppointmentStatusHistory): void {
    try {
      const allHistory = this.getStoredHistory();
      allHistory.unshift(history);
      localStorage.setItem(STATUS_HISTORY_DB_KEY, JSON.stringify(allHistory));
    } catch (err) {
      console.error('Failed to write status history DB:', err);
    }
  }

  /**
   * Validates if doctor/admin authentication token is valid.
   */
  private verifyAdminAuth(token?: string): boolean {
    return token === ADMIN_AUTH_TOKEN;
  }

  /**
   * 1. Patient Creates Booking: POST /appointments
   * Initial Status is ALWAYS PENDING_CONFIRMATION.
   */
  createAppointment(formData: AppointmentFormData, source: string = 'website_book_page'): ApiResult<AppointmentRecord> {
    const id = this.generateReferenceId();
    const now = new Date().toISOString();

    const record: AppointmentRecord = {
      id,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      mainConcern: formData.mainConcern,
      message: formData.message,
      status: 'PENDING_CONFIRMATION',
      source,
      createdAt: now,
      updatedAt: now,
    };

    const appointments = this.getStoredAppointments();
    appointments.unshift(record);
    this.saveAppointments(appointments);

    // Record initial status history
    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: 'PENDING_CONFIRMATION',
      new_status: 'PENDING_CONFIRMATION',
      changed_by: 'patient',
      change_source: 'patient_portal',
      timestamp: now,
      note: 'Appointment request submitted by patient',
    });

    // Generate doctor notification
    notificationService.sendAppointmentRequest(record);

    return { success: true, data: record };
  }

  /**
   * 2. Doctor Action: POST /appointments/:id/confirm
   * Transitions status to CONFIRMED.
   */
  confirmAppointment(id: string, token: string, note?: string): ApiResult<AppointmentRecord> {
    if (!this.verifyAdminAuth(token)) {
      return { success: false, error: 'Unauthorized: Invalid admin token', errorCode: 'UNAUTHORIZED' };
    }

    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];

    // Idempotency: If already confirmed, return without duplicate modification
    if (current.status === 'CONFIRMED') {
      return { success: true, data: current };
    }

    const allowed = VALID_TRANSITIONS[current.status] || [];
    if (!allowed.includes('CONFIRMED')) {
      return {
        success: false,
        error: `Invalid transition from ${current.status} to CONFIRMED`,
        errorCode: 'INVALID_STATE_TRANSITION',
      };
    }

    const now = new Date().toISOString();
    const updated: AppointmentRecord = {
      ...current,
      status: 'CONFIRMED',
      confirmedAt: now,
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: current.status,
      new_status: 'CONFIRMED',
      changed_by: 'doctor',
      change_source: 'admin_dashboard',
      timestamp: now,
      note: note || 'Appointment confirmed by doctor',
    });

    notificationService.sendAppointmentConfirmation(updated);

    return { success: true, data: updated };
  }

  /**
   * 3. Doctor Action: POST /appointments/:id/decline
   * Transitions status to DECLINED.
   */
  declineAppointment(id: string, token: string, reason?: string): ApiResult<AppointmentRecord> {
    if (!this.verifyAdminAuth(token)) {
      return { success: false, error: 'Unauthorized: Invalid admin token', errorCode: 'UNAUTHORIZED' };
    }

    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];
    if (current.status === 'DECLINED') {
      return { success: true, data: current };
    }

    const allowed = VALID_TRANSITIONS[current.status] || [];
    if (!allowed.includes('DECLINED')) {
      return {
        success: false,
        error: `Invalid transition from ${current.status} to DECLINED`,
        errorCode: 'INVALID_STATE_TRANSITION',
      };
    }

    const now = new Date().toISOString();
    const updated: AppointmentRecord = {
      ...current,
      status: 'DECLINED',
      declineReason: reason || 'Slot unavailable',
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: current.status,
      new_status: 'DECLINED',
      changed_by: 'doctor',
      change_source: 'admin_dashboard',
      timestamp: now,
      note: reason ? `Declined: ${reason}` : 'Declined by doctor due to slot unavailability',
    });

    notificationService.sendAppointmentDeclined(updated);

    return { success: true, data: updated };
  }

  /**
   * 4. Doctor Action: POST /appointments/:id/alternative
   * Proposes alternative date & time. Status becomes ALTERNATIVE_PROPOSED.
   */
  proposeAlternative(
    id: string,
    newDate: string,
    newTime: string,
    token: string,
    doctorNote?: string
  ): ApiResult<AppointmentRecord> {
    if (!this.verifyAdminAuth(token)) {
      return { success: false, error: 'Unauthorized: Invalid admin token', errorCode: 'UNAUTHORIZED' };
    }

    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];
    const allowed = VALID_TRANSITIONS[current.status] || [];
    if (!allowed.includes('ALTERNATIVE_PROPOSED')) {
      return {
        success: false,
        error: `Invalid transition from ${current.status} to ALTERNATIVE_PROPOSED`,
        errorCode: 'INVALID_STATE_TRANSITION',
      };
    }

    const now = new Date().toISOString();
    const updated: AppointmentRecord = {
      ...current,
      status: 'ALTERNATIVE_PROPOSED',
      alternativeSlot: {
        date: newDate,
        time: newTime,
        proposedAt: now,
        doctorNote,
        status: 'PENDING',
      },
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: current.status,
      new_status: 'ALTERNATIVE_PROPOSED',
      changed_by: 'doctor',
      change_source: 'admin_dashboard',
      timestamp: now,
      note: `Doctor suggested alternative slot: ${newDate} at ${newTime}`,
    });

    notificationService.sendAlternativeProposal(updated, newDate, newTime);

    return { success: true, data: updated };
  }

  /**
   * 5. Patient Decision: POST /appointments/:id/patient-alternative-response
   * Patient responds ACCEPT or DECLINE to alternative time proposal.
   */
  patientRespondAlternative(id: string, decision: 'ACCEPT' | 'DECLINE'): ApiResult<AppointmentRecord> {
    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];
    if (current.status !== 'ALTERNATIVE_PROPOSED' || !current.alternativeSlot) {
      return {
        success: false,
        error: 'No active alternative slot proposal to respond to',
        errorCode: 'INVALID_STATE',
      };
    }

    const now = new Date().toISOString();
    const isAccepted = decision === 'ACCEPT';
    const nextStatus: BookingStatus = isAccepted ? 'CONFIRMED' : 'DECLINED';

    const updated: AppointmentRecord = {
      ...current,
      status: nextStatus,
      preferredDate: isAccepted ? current.alternativeSlot.date : current.preferredDate,
      preferredTime: isAccepted ? current.alternativeSlot.time : current.preferredTime,
      confirmedAt: isAccepted ? now : undefined,
      alternativeSlot: {
        ...current.alternativeSlot,
        status: isAccepted ? 'ACCEPTED' : 'DECLINED',
        respondedAt: now,
      },
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: 'ALTERNATIVE_PROPOSED',
      new_status: nextStatus,
      changed_by: 'patient',
      change_source: 'patient_portal',
      timestamp: now,
      note: `Patient ${decision === 'ACCEPT' ? 'accepted' : 'declined'} alternative proposal for ${current.alternativeSlot.date} (${current.alternativeSlot.time})`,
    });

    if (isAccepted) {
      notificationService.sendAppointmentConfirmation(updated);
    }

    return { success: true, data: updated };
  }

  /**
   * 6. Cancel Appointment: POST /appointments/:id/cancel
   */
  cancelAppointment(id: string, reason?: string, actor: 'patient' | 'doctor' | 'admin' = 'patient'): ApiResult<AppointmentRecord> {
    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];
    if (current.status === 'CANCELLED') {
      return { success: true, data: current };
    }

    if (current.status === 'COMPLETED') {
      return { success: false, error: 'Cannot cancel an already completed appointment', errorCode: 'INVALID_STATE' };
    }

    const now = new Date().toISOString();
    const updated: AppointmentRecord = {
      ...current,
      status: 'CANCELLED',
      cancelledAt: now,
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: current.status,
      new_status: 'CANCELLED',
      changed_by: actor,
      change_source: actor === 'patient' ? 'patient_portal' : 'admin_dashboard',
      timestamp: now,
      note: reason ? `Cancelled: ${reason}` : 'Appointment cancelled',
    });

    return { success: true, data: updated };
  }

  /**
   * 7. Update Status (e.g. Mark COMPLETED or NO_SHOW): PATCH /appointments/:id/status
   */
  updateAppointmentStatus(
    id: string,
    newStatus: BookingStatus,
    token: string,
    note?: string
  ): ApiResult<AppointmentRecord> {
    if (!this.verifyAdminAuth(token)) {
      return { success: false, error: 'Unauthorized: Invalid admin token', errorCode: 'UNAUTHORIZED' };
    }

    const appointments = this.getStoredAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: 'Appointment not found', errorCode: 'NOT_FOUND' };
    }

    const current = appointments[index];
    if (current.status === newStatus) {
      return { success: true, data: current };
    }

    const allowed = VALID_TRANSITIONS[current.status] || [];
    if (!allowed.includes(newStatus)) {
      return {
        success: false,
        error: `Invalid transition from ${current.status} to ${newStatus}`,
        errorCode: 'INVALID_STATE_TRANSITION',
      };
    }

    const now = new Date().toISOString();
    const updated: AppointmentRecord = {
      ...current,
      status: newStatus,
      completedAt: newStatus === 'COMPLETED' ? now : current.completedAt,
      updatedAt: now,
    };

    appointments[index] = updated;
    this.saveAppointments(appointments);

    this.saveHistoryRecord({
      id: `HIST-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      appointment_id: id,
      previous_status: current.status,
      new_status: newStatus,
      changed_by: 'doctor',
      change_source: 'admin_dashboard',
      timestamp: now,
      note: note || `Status updated to ${newStatus}`,
    });

    return { success: true, data: updated };
  }

  /**
   * Query appointments with filtering & search (Sort newest first).
   */
  getAppointments(filters: AppointmentFilters = {}): AppointmentRecord[] {
    let list = this.getStoredAppointments();

    if (filters.status && filters.status !== 'ALL') {
      list = list.filter((a) => a.status === filters.status);
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          a.phone.includes(q) ||
          (a.mainConcern && a.mainConcern.toLowerCase().includes(q))
      );
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get single appointment by ID.
   */
  getAppointmentById(id: string): AppointmentRecord | null {
    const list = this.getStoredAppointments();
    return list.find((a) => a.id === id) || null;
  }

  /**
   * Get full status history audit trail for an appointment.
   */
  getStatusHistory(appointmentId: string): AppointmentStatusHistory[] {
    const list = this.getStoredHistory();
    return list
      .filter((h) => h.appointment_id === appointmentId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

export const appointmentApiService = new AppointmentApiService();
