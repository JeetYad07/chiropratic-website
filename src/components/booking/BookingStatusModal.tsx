import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Calendar as CalendarIcon,
  MessageSquare,
  ExternalLink,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import {
  getActiveAppointment,
  clearActiveAppointment,
} from '../../utils/appointmentStorage';
import { appointmentApiService } from '../../services/appointmentApiService';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { openWhatsAppChat } from '../../utils/whatsapp';
import { AppointmentRecord, BookingStatus } from '../../types/booking';

interface BookingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCleared?: () => void;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({
  isOpen,
  onClose,
  onAppointmentCleared,
}) => {
  const [appointment, setAppointment] = useState<AppointmentRecord | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const active = getActiveAppointment();
      setAppointment(active);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePatientAlternative = (decision: 'ACCEPT' | 'DECLINE') => {
    if (!appointment) return;
    const res = appointmentApiService.patientRespondAlternative(appointment.id, decision);
    if (res.success && res.data) {
      setAppointment(res.data);
      setActionFeedback(
        decision === 'ACCEPT'
          ? 'You accepted the alternative slot! Session is now confirmed.'
          : 'You declined the alternative slot. Please contact the clinic for other slots.'
      );
    }
  };

  const handleClear = () => {
    clearActiveAppointment();
    setAppointment(null);
    if (onAppointmentCleared) onAppointmentCleared();
    onClose();
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            🟢 Confirmed by Dr. Hashi
          </span>
        );
      case 'PENDING_CONFIRMATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            🟡 Awaiting Doctor Confirmation
          </span>
        );
      case 'ALTERNATIVE_PROPOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
            🔵 Alternative Time Suggested
          </span>
        );
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            🔴 Slot Unavailable
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            🟣 Consultation Completed
          </span>
        );
      case 'NO_SHOW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
            ⚫ No Show
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            ⚪ Cancelled
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!appointment ? (
          <div className="text-center py-8 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Active Booking Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have any pending appointment requests on this device.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Booking Reference
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-lg font-mono font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
                  {appointment.id}
                </span>
                {getStatusBadge(appointment.status)}
              </div>
            </div>

            {actionFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
                {actionFeedback}
              </div>
            )}

            {/* Alternative Proposed Decision Banner */}
            {appointment.status === 'ALTERNATIVE_PROPOSED' && appointment.alternativeSlot && (
              <div className="p-5 bg-sky-50 border border-sky-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                  <CalendarIcon className="w-4 h-4 text-sky-600" />
                  <span>Dr. Hashi Proposed a Different Time</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Requested slot was unavailable. Dr. Hashi suggested:{' '}
                  <strong>
                    {appointment.alternativeSlot.date} ({appointment.alternativeSlot.time})
                  </strong>
                  .
                </p>
                {appointment.alternativeSlot.doctorNote && (
                  <p className="text-xs text-slate-600 italic">
                    Note: &ldquo;{appointment.alternativeSlot.doctorNote}&rdquo;
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handlePatientAlternative('ACCEPT')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-xs transition-colors"
                  >
                    Accept New Time
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePatientAlternative('DECLINE')}
                    className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors"
                  >
                    Decline Slot
                  </button>
                </div>
              </div>
            )}

            {/* Appointment Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Patient Name</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.name}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Contact Number</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.phone}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Scheduled Date</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.preferredDate}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block">Preferred Time</span>
                <span className="font-bold text-slate-800 text-sm">{appointment.preferredTime}</span>
              </div>
            </div>

            {/* Actions for Confirmed Status */}
            {appointment.status === 'CONFIRMED' && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Calendar Sync
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={generateGoogleCalendarUrl({
                      date: appointment.preferredDate,
                      time: appointment.preferredTime,
                      patientName: appointment.name,
                      concern: appointment.mainConcern,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Add to Google Calendar</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      downloadIcsFile({
                        date: appointment.preferredDate,
                        time: appointment.preferredTime,
                        patientName: appointment.name,
                        concern: appointment.mainConcern,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Download .ICS</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick WhatsApp Contact */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => openWhatsAppChat({ name: appointment.name, phone: appointment.phone })}
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Clinic on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-red-600 text-xs font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear from Device</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
