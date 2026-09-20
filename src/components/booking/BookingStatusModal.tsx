import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Calendar as CalendarIcon, MessageSquare, Bell, ExternalLink, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { getActiveAppointment, updateAppointmentStatus, clearActiveAppointment, requestNotificationPermission, StoredAppointment } from '../../utils/appointmentStorage';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { openWhatsAppChat } from '../../utils/whatsapp';
import { clinicInfo } from '../../data/clinicInfo';

interface BookingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentCleared?: () => void;
}

export const BookingStatusModal: React.FC<BookingStatusModalProps> = ({ isOpen, onClose, onAppointmentCleared }) => {
  const [appointment, setAppointment] = useState<StoredAppointment | null>(null);
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setAppointment(getActiveAppointment());
      if ('Notification' in window && Notification.permission === 'granted') {
        setNotificationEnabled(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationEnabled(granted);
  };

  const handleToggleStatusSim = () => {
    if (!appointment) return;
    const nextStatus = appointment.status === 'PENDING' ? 'CONFIRMED' : 'PENDING';
    const updated = updateAppointmentStatus(nextStatus);
    setAppointment(updated);
  };

  const handleClear = () => {
    clearActiveAppointment();
    setAppointment(null);
    if (onAppointmentCleared) onAppointmentCleared();
    onClose();
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

        {/* Modal Header */}
        <div>
          <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Active Appointment Status
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Your Booking Summary
          </h2>
        </div>

        {!appointment ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <p className="text-slate-600 text-sm font-medium">No active appointment requests found on this device.</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Status Card */}
            <div
              className={`p-6 rounded-2xl border flex items-start justify-between gap-4 ${
                appointment.status === 'CONFIRMED'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {appointment.status === 'CONFIRMED' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
                  )}
                  <span className="font-extrabold text-base">
                    {appointment.status === 'CONFIRMED' ? 'Status: Session Confirmed!' : 'Status: Pending Clinic Confirmation'}
                  </span>
                </div>
                <p className="text-xs font-medium leading-relaxed opacity-90">
                  {appointment.status === 'CONFIRMED'
                    ? 'Dr Hashi has confirmed your appointment! Please arrive 10 minutes prior.'
                    : 'Your WhatsApp request was dispatched. Dr Hashi will confirm your slot shortly.'}
                </p>
              </div>

              <span className="text-[11px] font-mono font-bold bg-white/80 px-2.5 py-1 rounded-lg border shrink-0">
                {appointment.id}
              </span>
            </div>

            {/* Details Grid */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="font-semibold text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{appointment.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="font-semibold text-slate-500">Contact Phone:</span>
                <span className="font-bold text-slate-900">{appointment.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="font-semibold text-slate-500">Requested Date & Time:</span>
                <span className="font-bold text-sky-700">{appointment.preferredDate} ({appointment.preferredTime})</span>
              </div>
              {appointment.mainConcern && (
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="font-semibold text-slate-500">Primary Concern:</span>
                  <span className="font-bold text-slate-900">{appointment.mainConcern}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Clinic Address:</span>
                <span className="font-medium text-slate-900 text-right max-w-[200px]">{clinicInfo.address.full}</span>
              </div>
            </div>

            {/* Action Buttons: Calendar Sync */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Calendar Synchronization</span>
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
                  className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <ExternalLink className="w-4 h-4 text-sky-600" />
                  <span>Google Calendar</span>
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
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS File</span>
                </button>
              </div>
            </div>

            {/* Notification Permission & Interactive Doctor Simulation */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-900 text-xs font-bold">
                  <Bell className="w-4 h-4 text-sky-600" />
                  <span>Browser Push Notifications</span>
                </div>
                {!notificationEnabled ? (
                  <button
                    onClick={handleEnableNotifications}
                    className="text-[11px] font-bold text-sky-700 underline hover:text-sky-900"
                  >
                    Enable Notifications
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Enabled
                  </span>
                )}
              </div>

              {/* Status Simulation Toggle */}
              <div className="pt-2 border-t border-sky-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-600">Simulate Doctor Confirmation:</span>
                <button
                  onClick={handleToggleStatusSim}
                  className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                >
                  Set to {appointment.status === 'PENDING' ? '🟢 CONFIRMED' : '🟡 PENDING'}
                </button>
              </div>
            </div>

            {/* Re-Open WhatsApp & Contact */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() =>
                  openWhatsAppChat({
                    name: appointment.name,
                    phone: appointment.phone,
                    preferredDate: appointment.preferredDate,
                    preferredTime: appointment.preferredTime,
                    mainConcern: appointment.mainConcern,
                    referenceId: appointment.id,
                  })
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </button>

              <button
                onClick={handleClear}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-slate-400 hover:text-red-600 text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Booking Record</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
