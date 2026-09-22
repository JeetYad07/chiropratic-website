import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Phone,
} from 'lucide-react';
import { appointmentApiService, ADMIN_AUTH_TOKEN } from '../../services/appointmentApiService';
import { AppointmentRecord, BookingStatus } from '../../types/booking';
import { SEOHead } from '../../components/seo/SEOHead';

export const AdminDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal for Propose Alternative
  const [activeAlternativeModal, setActiveAlternativeModal] = useState<AppointmentRecord | null>(null);
  const [altDate, setAltDate] = useState('');
  const [altTime, setAltTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [altNote, setAltNote] = useState('');

  const loadAppointments = () => {
    const list = appointmentApiService.getAppointments({
      status: selectedStatus,
      search: searchQuery,
    });
    setAppointments(list);
  };

  useEffect(() => {
    loadAppointments();
  }, [selectedStatus, searchQuery]);

  const handleConfirm = (id: string) => {
    const res = appointmentApiService.confirmAppointment(id, ADMIN_AUTH_TOKEN);
    if (res.success) {
      loadAppointments();
    }
  };

  const handleDecline = (id: string) => {
    const res = appointmentApiService.declineAppointment(id, ADMIN_AUTH_TOKEN, 'Doctor unavailable at requested time');
    if (res.success) {
      loadAppointments();
    }
  };

  const handleProposeAlternativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlternativeModal || !altDate || !altTime) return;

    const res = appointmentApiService.proposeAlternative(
      activeAlternativeModal.id,
      altDate,
      altTime,
      ADMIN_AUTH_TOKEN,
      altNote || undefined
    );

    if (res.success) {
      setActiveAlternativeModal(null);
      setAltDate('');
      setAltNote('');
      loadAppointments();
    }
  };

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    const res = appointmentApiService.updateAppointmentStatus(id, status, ADMIN_AUTH_TOKEN);
    if (res.success) {
      loadAppointments();
    }
  };

  const statusTabs: Array<{ label: string; value: BookingStatus | 'ALL' }> = [
    { label: 'All', value: 'ALL' },
    { label: 'Pending', value: 'PENDING_CONFIRMATION' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Alternative Proposed', value: 'ALTERNATIVE_PROPOSED' },
    { label: 'Declined', value: 'DECLINED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'No-Show', value: 'NO_SHOW' },
    { label: 'Cancelled', value: 'CANCELLED' },
  ];

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
          </span>
        );
      case 'PENDING_CONFIRMATION':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" /> Pending
          </span>
        );
      case 'ALTERNATIVE_PROPOSED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3 text-sky-600" /> Alternative
          </span>
        );
      case 'DECLINED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2.5 py-1 rounded-full">
            <XCircle className="w-3 h-3 text-red-600" /> Declined
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <>
      <SEOHead
        title="Admin Appointment Dashboard | Dr Hashi Chiropractic"
        description="Doctor & Clinic Admin Appointment Management Dashboard."
      />
      <main className="py-10 bg-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
                Clinic Management Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Appointment Lifecycle Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time doctor confirmation, alternative scheduling, and patient appointment tracking.
              </p>
            </div>
            <button
              onClick={loadAppointments}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Records</span>
            </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient name, phone number, or Ref ID (e.g. HASHI-...)"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedStatus === tab.value
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments Table / Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Appointments ({appointments.length} Total)
              </h2>
              <span className="text-xs text-slate-400">Sorted Newest First</span>
            </div>

            {appointments.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No appointments found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No appointments match the current status filter or search query.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-6 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                          {appt.id}
                        </span>
                        {getStatusBadge(appt.status)}
                        <span className="text-xs text-slate-400">
                          Created {new Date(appt.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                        <span className="font-bold text-slate-900 text-base">{appt.name}</span>
                        <a
                          href={`tel:${appt.phone}`}
                          className="text-slate-600 hover:text-sky-600 flex items-center gap-1 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{appt.phone}</span>
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-600">
                        <span>
                          📅 <strong>Slot:</strong> {appt.preferredDate} ({appt.preferredTime})
                        </span>
                        {appt.mainConcern && (
                          <span>
                            🩺 <strong>Concern:</strong> {appt.mainConcern}
                          </span>
                        )}
                      </div>

                      {appt.alternativeSlot && appt.status === 'ALTERNATIVE_PROPOSED' && (
                        <div className="text-xs text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-200">
                          Suggested Alternative: <strong>{appt.alternativeSlot.date}</strong> ({appt.alternativeSlot.time}) — Awaiting Patient Acceptance
                        </div>
                      )}
                    </div>

                    {/* Right Doctor Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {appt.status === 'PENDING_CONFIRMATION' && (
                        <>
                          <button
                            onClick={() => handleConfirm(appt.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-colors"
                          >
                            Confirm 🟢
                          </button>
                          <button
                            onClick={() => {
                              setActiveAlternativeModal(appt);
                              setAltDate(appt.preferredDate);
                            }}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-colors"
                          >
                            Suggest Time 🔵
                          </button>
                          <button
                            onClick={() => handleDecline(appt.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition-colors"
                          >
                            Decline 🔴
                          </button>
                        </>
                      )}

                      {appt.status === 'CONFIRMED' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(appt.id, 'COMPLETED')}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors"
                          >
                            Mark Completed 🟣
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(appt.id, 'NO_SHOW')}
                            className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-colors"
                          >
                            Mark No-Show ⚫
                          </button>
                        </>
                      )}

                      <Link
                        to={`/admin/appointments/${appt.id}`}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors"
                      >
                        <span>Audit Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Suggest Alternative Slot Modal */}
        {activeAlternativeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-slate-900">Suggest Alternative Slot</h3>
                <button
                  onClick={() => setActiveAlternativeModal(null)}
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
                    placeholder="e.g. Clinic schedule full in the morning; evening adjustment available."
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
                    onClick={() => setActiveAlternativeModal(null)}
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
