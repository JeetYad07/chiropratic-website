import { BookingStatus } from './booking';

export interface AppointmentStatusHistory {
  id: string;
  appointment_id: string;
  previous_status: BookingStatus;
  new_status: BookingStatus;
  changed_by: 'doctor' | 'patient' | 'system' | 'admin';
  change_source: 'whatsapp_action' | 'admin_dashboard' | 'patient_portal' | 'system_scheduler';
  timestamp: string;
  note?: string;
}
