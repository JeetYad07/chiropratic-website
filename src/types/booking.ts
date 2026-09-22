export type BookingStatus =
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'DECLINED'
  | 'ALTERNATIVE_PROPOSED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW';

export interface AlternativeSlot {
  date: string;
  time: string;
  proposedAt: string;
  doctorNote?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  respondedAt?: string;
}

export interface AppointmentFormData {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  mainConcern?: string;
  message?: string;
}

export interface AppointmentRecord {
  id: string; // referenceId (e.g. HASHI-YYYYMMDD-XXXX)
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  mainConcern?: string;
  message?: string;
  status: BookingStatus;
  alternativeSlot?: AlternativeSlot;
  source?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
  declineReason?: string;
}
