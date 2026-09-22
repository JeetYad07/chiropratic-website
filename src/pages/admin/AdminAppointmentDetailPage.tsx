import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History,
} from 'lucide-react';
import { appointmentApiService, ADMIN_AUTH_TOKEN } from '../../services/appointmentApiService';
import { AppointmentRecord, BookingStatus } from '../../types/booking';
import { AppointmentStatusHistory } from '../../types/statusHistory';
import { SEOHead } from '../../components/seo/SEOHead';

export const AdminAppointmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<AppointmentRecord | null>(null);
  const [history, setHistory] = useState<AppointmentStatusHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // Propose Alternative state
  const [isAltModalOpen, setIsAltModalOpen] = useState(false);
  const [altDate, setAltDate] = useState('');
  const [altTime, setAltTime] = useState('Morning (9:00 AM - 12:00 PM)');
  const [altNote, setAltNote] = useState('');

  const loadData = () => {
    if (!id) return;
    const appt = appointmentApiService.getAppointmentById(id);
    const hist = appointmentApiService.getStatusHistory(id);
    setAppointment(appt);
    setHistory(hist);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleConfirm = () => {
    if (!id) return;
    const res = appointmentApiService.confirmAppointment(id, ADMIN_AUTH_TOKEN);
    if (res.success) loadData();
  };

  const handleDecline = () => {
    if (!id) return;
    const res = appointmentApiService.declineAppointment(id, ADMIN_AUTH_TOKEN);
    if (res.success) loadData();
  };

  const handleUpdateStatus = (status: BookingStatus) => {
    if (!id) return;
    const res = appointmentApiService.updateAppointmentStatus(id, status, ADMIN_AUTH_TOKEN);
    if (res.success) loadData();
  };

  const handleProposeAlternativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !altDate || !altTime) return;

    const res = appointmentApiService.proposeAlternative(
      id,
      altDate,
      altTime,
      ADMIN_AUTH_TOKEN,
      altNote || undefined
    );

    if (res.success) {
      setIsAltModalOpen(false);
      loadData();
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            🟢 Confirmed
          </span>
        );
      case 'PENDING_CONFIRMATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            🟡 Pending Confirmation
          </span>
        );
      case 'ALTERNATIVE_PROPOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
            <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
            🔵 Alternative Proposed
          </span>
        );
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            🔴 Declined
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            🟣 Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Appointment Record Not Found</h2>
        <Link to="/admin/appointments" className="text-sky-600 font-bold text-sm underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`Audit Detail ${appointment.id} | Dr Hashi Admin`}
        description="Appointment audit trail and status detail view."
      />
      <main className="py-10 bg-slate-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back Navigation */}
          <div>
            <Link
              to="/admin/appointments"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Appointments Dashboard</span>
            </Link>
          </div>

          {/* Main Top Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Booking Reference Audit
              </span>
              <h1 className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900">
                {appointment.id}
              </h1>
              <p className="text-xs text-slate-500">
                Created: {new Date(appointment.createdAt).toLocaleString()} • Source: {appointment.source || 'Website'}
              </p>
            </div>
            <div>{getStatusBadge(appointment.status)}</div>
          </div>

          {/* Doctor Actions Bar */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Doctor Status Actions
            </span>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleConfirm}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Confirm Appointment 🟢
              </button>
              <button
                onClick={() => {
                  setAltDate(appointment.preferredDate);
                  setIsAltModalOpen(true);
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Propose Alternative Time 🔵
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Decline Request 🔴
              </button>
              <button
                onClick={() => handleUpdateStatus('COMPLETED')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Mark as Completed 🟣
              </button>
              <button
                onClick={() => handleUpdateStatus('NO_SHOW')}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Mark as No-Show ⚫
              </button>
            </div>
          </div>

          {/* 2-Column Info & Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Patient & Booking Information */}
            <div className="lg:col-span-6 space-y-6">
              {/* Patient Details Card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Patient Profile & Contact
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Patient Name</span>
                    <span className="font-bold text-slate-900">{appointment.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Phone Number</span>
                    <a
                      href={`tel:${appointment.phone}`}
                      className="font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{appointment.phone}</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Requested Date</span>
                    <span className="font-bold text-slate-900">{appointment.preferredDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Requested Time</span>
                    <span className="font-bold text-slate-900">{appointment.preferredTime}</span>
                  </div>
                  {appointment.mainConcern && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Primary Concern</span>
                      <span className="font-bold text-slate-900">{appointment.mainConcern}</span>
                    </div>
                  )}
                  {appointment.message && (
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-slate-500 font-medium block">Patient Notes</span>
                      <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                        &ldquo;{appointment.message}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Status History & Audit Trail */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-sky-600" />
                  <span>Appointment Status History (Audit Trail)</span>
                </h3>

                {history.length === 0 ? (
                  <p className="text-xs text-slate-500">No status changes recorded yet.</p>
                ) : (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {history.map((h) => (
                      <div key={h.id} className="relative space-y-1">
                        <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-sky-600 ring-4 ring-white" />
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {h.previous_status} → {h.new_status}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(h.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{h.note}</p>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          Actor: {h.changed_by} ({h.change_source})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Propose Alternative Modal */}
        {isAltModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-slate-900">Suggest Alternative Slot</h3>
                <button
                  onClick={() => setIsAltModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleProposeAlternativeSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={altDate}
                    onChange={(e) => setAltDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Time Slot</label>
                  <select
                    value={altTime}
                    onChange={(e) => setAltTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Note to Patient (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Schedule full in the morning; evening alignment slot available."
                    value={altNote}
                    onChange={(e) => setAltNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-xs transition-colors"
                  >
                    Dispatch Alternative Proposal
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAltModalOpen(false)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-3 rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
