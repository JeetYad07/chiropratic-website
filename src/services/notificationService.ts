import { clinicInfo } from '../data/clinicInfo';
import { AppointmentRecord } from '../types/booking';

export interface NotificationLog {
  id: string;
  recipient: 'doctor' | 'patient';
  channel: 'whatsapp' | 'sms' | 'email';
  title: string;
  message: string;
  sentAt: string;
  status: 'SENT' | 'FAILED';
}

export class NotificationService {
  private logs: NotificationLog[] = [];

  /**
   * Generates the doctor WhatsApp notification message upon a new patient request.
   */
  formatDoctorAppointmentRequestMessage(appointment: AppointmentRecord): string {
    const concern = appointment.mainConcern || 'General Chiropractic Consultation';
    const cleanAddress = clinicInfo.address.full;
    const mapsLink = clinicInfo.googleMapsUrl;

    return `NEW APPOINTMENT REQUEST

Patient: ${appointment.name.trim()}
Phone: ${appointment.phone.trim()}
Concern: ${concern}

Date: ${appointment.preferredDate}
Time: ${appointment.preferredTime}

Booking Ref: ${appointment.id}

Clinic:
${cleanAddress}

Directions:
${mapsLink}

Doctor action:
CONFIRM ${appointment.id}
DECLINE ${appointment.id}
ALTERNATIVE ${appointment.id} <newDate> <newTime>`;
  }

  /**
   * Generates patient confirmation message when the doctor confirms the slot.
   */
  formatPatientConfirmationMessage(appointment: AppointmentRecord): string {
    const cleanAddress = clinicInfo.address.full;
    const mapsLink = clinicInfo.googleMapsUrl;

    return `Your appointment with Dr. Hashi Chiropractic is confirmed.

Date: ${appointment.preferredDate}
Time: ${appointment.preferredTime}

Booking Ref: ${appointment.id}

Clinic:
${cleanAddress}

Directions:
${mapsLink}`;
  }

  /**
   * Generates patient decline message when requested slot is unavailable.
   */
  formatPatientDeclinedMessage(): string {
    return `Your appointment request could not be accommodated for the requested time. Please choose another available slot.`;
  }

  /**
   * Generates alternative proposal message sent to patient.
   */
  formatAlternativeProposalMessage(
    appointment: AppointmentRecord,
    newDate: string,
    newTime: string,
    trackingUrl?: string
  ): string {
    const portalUrl = trackingUrl || `${typeof window !== 'undefined' ? window.location.origin : 'https://drhashichiropractic.com'}/appointments/${appointment.id}`;

    return `Dr. Hashi has suggested an alternative appointment:

Date: ${newDate}
Time: ${newTime}

Please confirm whether you'd like to accept this time:
${portalUrl}`;
  }

  /**
   * Generates patient response message back to clinic.
   */
  formatPatientAlternativeResponseMessage(
    appointment: AppointmentRecord,
    accepted: boolean
  ): string {
    return `PATIENT RESPONSE - ALTERNATIVE TIME

Patient: ${appointment.name}
Phone: ${appointment.phone}
Booking Ref: ${appointment.id}
Decision: ${accepted ? '✅ ACCEPTED' : '❌ DECLINED'}
Proposed Slot: ${appointment.alternativeSlot?.date || appointment.preferredDate} (${appointment.alternativeSlot?.time || appointment.preferredTime})`;
  }

  /**
   * Generates formatted WhatsApp click-to-chat URL.
   */
  getWhatsAppUrl(phoneNumber: string, messageText: string): string {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
  }

  /**
   * Dispatches doctor appointment request notification.
   */
  sendAppointmentRequest(appointment: AppointmentRecord): { url: string; message: string } {
    const message = this.formatDoctorAppointmentRequestMessage(appointment);
    const url = this.getWhatsAppUrl(clinicInfo.whatsappNumber, message);

    this.logNotification({
      recipient: 'doctor',
      channel: 'whatsapp',
      title: `New Request (${appointment.id})`,
      message,
    });

    return { url, message };
  }

  /**
   * Dispatches patient confirmation notification.
   */
  sendAppointmentConfirmation(appointment: AppointmentRecord): { url: string; message: string } {
    const message = this.formatPatientConfirmationMessage(appointment);
    const url = this.getWhatsAppUrl(appointment.phone, message);

    this.logNotification({
      recipient: 'patient',
      channel: 'whatsapp',
      title: `Booking Confirmed (${appointment.id})`,
      message,
    });

    return { url, message };
  }

  /**
   * Dispatches patient decline notification.
   */
  sendAppointmentDeclined(appointment: AppointmentRecord): { url: string; message: string } {
    const message = this.formatPatientDeclinedMessage();
    const url = this.getWhatsAppUrl(appointment.phone, message);

    this.logNotification({
      recipient: 'patient',
      channel: 'whatsapp',
      title: `Booking Declined (${appointment.id})`,
      message,
    });

    return { url, message };
  }

  /**
   * Dispatches alternative proposal notification.
   */
  sendAlternativeProposal(
    appointment: AppointmentRecord,
    newDate: string,
    newTime: string
  ): { url: string; message: string } {
    const message = this.formatAlternativeProposalMessage(appointment, newDate, newTime);
    const url = this.getWhatsAppUrl(appointment.phone, message);

    this.logNotification({
      recipient: 'patient',
      channel: 'whatsapp',
      title: `Alternative Slot Proposed (${appointment.id})`,
      message,
    });

    return { url, message };
  }

  private logNotification(params: Omit<NotificationLog, 'id' | 'sentAt' | 'status'>): void {
    const log: NotificationLog = {
      ...params,
      id: `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sentAt: new Date().toISOString(),
      status: 'SENT',
    };
    this.logs.unshift(log);
  }

  getLogs(): NotificationLog[] {
    return [...this.logs];
  }
}

export const notificationService = new NotificationService();
