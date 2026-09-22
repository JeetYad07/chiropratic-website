import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Download,
  Phone,
} from 'lucide-react';
import { appointmentApiService } from '../services/appointmentApiService';
import { AppointmentRecord, BookingStatus } from '../types/booking';
import { clinicInfo } from '../data/clinicInfo';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { openWhatsAppChat } from '../utils/whatsapp';
import { SEOHead } from '../components/seo/SEOHead';

export const AppointmentTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<AppointmentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const data = appointmentApiService.getAppointmentById(id);
      setAppointment(data);
      setLoading(false);
    }
  }, [id]);

  const handleAlternativeResponse = (decision: 'ACCEPT' | 'DECLINE') => {
    if (!id) return;
    const res = appointmentApiService.patientRespondAlternative(id, decision);
    if (res.success && res.data) {
      setAppointment(res.data);
      setActionFeedback(
        decision === 'ACCEPT'
          ? 'You accepted the alternative slot! Your appointment is now confirmed.'
          : 'You declined the alternative slot. Please pick another available time.'
      );
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            🟢 Confirmed by Dr. Hashi
          </span>
        );
      case 'PENDING_CONFIRMATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
            🟡 Awaiting Doctor Confirmation
          </span>
        );
      case 'ALTERNATIVE_PROPOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <AlertTriangle className="w-4 h-4 text-sky-600" />
            🔵 Alternative Time Suggested
          </span>
        );
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-4 h-4 text-red-600" />
            🔴 Slot Unavailable
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            🟣 Consultation Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            ⚪ {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <main className="py-20 bg-slate-50 min-h-[70vh] flex items-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Not Found</h1>
          <p className="text-slate-600 text-sm">
            Could not find an appointment request matching reference <strong>{id}</strong>.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-2 bg-sky-600 text-white font-bold px-6 py-3 rounded-xl text-sm"
          >
            <span>Book New Appointment</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead
        title={`Appointment ${appointment.id} Status | Dr Hashi Chiropractic`}
        description="Check your live chiropractic appointment status with Dr. Hashi Chiropractic."
      />
      <main className="py-12 lg:py-20 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Appointment Reference
                </span>
                <h1 className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                  {appointment.id}
                </h1>
              </div>
              <div>{getStatusBadge(appointment.status)}</div>
            </div>

            {actionFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-sm font-semibold animate-in fade-in">
                {actionFeedback}
              </div>
            )}

            {/* Status-specific banners */}
            {appointment.status === 'PENDING_CONFIRMATION' && (
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-xs sm:text-sm text-amber-900">
                <p className="font-bold">Your booking request is being reviewed by Dr. Hashi.</p>
                <p className="text-amber-800">
                  Once Dr. Hashi confirms your time slot, your status will update automatically. We do not store sensitive medical records online.
                </p>
              </div>
            )}

            {appointment.status === 'ALTERNATIVE_PROPOSED' && appointment.alternativeSlot && (
              <div className="p-6 bg-sky-50 border border-sky-200 rounded-2xl space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-sky-900 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-sky-600" />
                  <span>Dr. Hashi Proposed an Alternative Slot</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Your originally requested slot was unavailable. Dr. Hashi has suggested:{' '}
                  <strong className="text-sky-900">
                    {appointment.alternativeSlot.date} ({appointment.alternativeSlot.time})
                  </strong>
                  .
                </p>
                {appointment.alternativeSlot.doctorNote && (
                  <p className="text-xs text-slate-600 italic bg-white/70 p-3 rounded-xl border border-sky-100">
                    Doctor Note: &ldquo;{appointment.alternativeSlot.doctorNote}&rdquo;
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAlternativeResponse('ACCEPT')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all"
                  >
                    Accept Suggested Time
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAlternativeResponse('DECLINE')}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3.5 px-6 rounded-xl text-sm transition-all"
                  >
                    Decline & Pick Other Slot
                  </button>
                </div>
              </div>
            )}

            {appointment.status === 'CONFIRMED' && (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Appointment Confirmed!</span>
                </div>
                <p className="text-sm leading-relaxed text-emerald-900">
                  We look forward to seeing you on <strong>{appointment.preferredDate}</strong> at{' '}
                  <strong>{appointment.preferredTime}</strong> at our Electronic City clinic.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={generateGoogleCalendarUrl({
                      date: appointment.preferredDate,
                      time: appointment.preferredTime,
                      patientName: appointment.name,
                      concern: appointment.mainConcern,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
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
                    className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs shadow-xs transition-all"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Download .ICS File</span>
                  </button>
                </div>
              </div>
            )}

            {/* Patient & Booking Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block text-xs">Patient Name</span>
                <span className="font-bold text-slate-800">{appointment.name}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block text-xs">Phone Number</span>
                <span className="font-bold text-slate-800">{appointment.phone}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block text-xs">Date</span>
                <span className="font-bold text-slate-800">{appointment.preferredDate}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-medium block text-xs">Time Slot</span>
                <span className="font-bold text-slate-800">{appointment.preferredTime}</span>
              </div>
            </div>

            {/* Clinic Location & Direct WhatsApp */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">{clinicInfo.name}</span>
                  <span>{clinicInfo.address.full}</span>
                  <p className="text-slate-500 text-xs mt-0.5">Landmark: {clinicInfo.address.landmark}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="font-bold text-sky-700 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {clinicInfo.phoneDisplay}</span>
                </a>
                <button
                  type="button"
                  onClick={() => openWhatsAppChat({ name: appointment.name, phone: appointment.phone })}
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
