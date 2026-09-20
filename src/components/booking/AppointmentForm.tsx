import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSquare, Calendar as CalendarIcon, Clock, User, Phone, FileText, Download, ExternalLink, Bell, CheckCircle2 } from 'lucide-react';
import { openWhatsAppChat } from '../../utils/whatsapp';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { saveAppointment, requestNotificationPermission, updateAppointmentStatus, StoredAppointment } from '../../utils/appointmentStorage';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  mainConcern: z.string().optional(),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const AppointmentForm: React.FC = () => {
  const [activeRecord, setActiveRecord] = useState<StoredAppointment | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    const record = saveAppointment({
      name: data.name,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      mainConcern: data.mainConcern,
      message: data.message,
    });
    setActiveRecord(record);

    openWhatsAppChat({
      name: data.name,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      mainConcern: data.mainConcern,
      message: data.message,
      referenceId: record.id,
    });
  };

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  };

  const handleToggleDoctorSim = () => {
    if (!activeRecord) return;
    const nextStatus = activeRecord.status === 'PENDING' ? 'CONFIRMED' : 'PENDING';
    const updated = updateAppointmentStatus(nextStatus);
    setActiveRecord(updated);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
      <div className="mb-8 space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900">Request Your Appointment</h3>
        <p className="text-slate-600 text-sm">
          Fill out the form below to generate a detailed WhatsApp booking request with Dr Hashi Chiropractic.
        </p>
      </div>

      {isSubmitSuccessful && activeRecord && (
        <div className="mb-8 p-6 rounded-3xl bg-slate-900 text-white space-y-5 shadow-xl animate-in fade-in duration-300 border border-slate-800">
          
          {/* Status Badge */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-3 h-3 rounded-full ${
                  activeRecord.status === 'CONFIRMED' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'
                }`}
              />
              <span className="font-extrabold text-sm sm:text-base">
                {activeRecord.status === 'CONFIRMED' ? '🟢 Session Confirmed by Clinic!' : '🟡 Request Dispatched to Clinic'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-lg border border-sky-900">
              {activeRecord.id}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeRecord.status === 'CONFIRMED'
              ? `Great news ${activeRecord.name}! Dr Hashi has confirmed your appointment for ${activeRecord.preferredDate} (${activeRecord.preferredTime}).`
              : `Your structured WhatsApp appointment card was launched. Once Dr Hashi reviews your request, your status will update to confirmed.`}
          </p>

          {/* Calendar Sync Actions */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Save Session to Calendar</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={generateGoogleCalendarUrl({
                  date: activeRecord.preferredDate,
                  time: activeRecord.preferredTime,
                  patientName: activeRecord.name,
                  concern: activeRecord.mainConcern,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  downloadIcsFile({
                    date: activeRecord.preferredDate,
                    time: activeRecord.preferredTime,
                    patientName: activeRecord.name,
                    concern: activeRecord.mainConcern,
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download .ICS File</span>
              </button>
            </div>
          </div>

          {/* Notification Opt-In & Doctor Sim */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-sky-400 shrink-0" />
              {notificationsEnabled ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Notifications Enabled
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleEnableNotifications}
                  className="text-sky-400 hover:underline font-bold"
                >
                  Enable Browser Confirmation Notifications
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleToggleDoctorSim}
              className="text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              Simulate Doctor Reply: {activeRecord.status === 'PENDING' ? 'Set Confirmed 🟢' : 'Set Pending 🟡'}
            </button>
          </div>

        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register('name')}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-sky-500'
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              {...register('phone')}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-sky-500'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone.message}</p>}
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('preferredDate')}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.preferredDate ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-sky-500'
                }`}
              />
            </div>
            {errors.preferredDate && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.preferredDate.message}</p>
            )}
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Time Slot <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Clock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <select
                {...register('preferredTime')}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.preferredTime ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-sky-500'
                }`}
              >
                <option value="">Select Time</option>
                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
              </select>
            </div>
            {errors.preferredTime && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.preferredTime.message}</p>
            )}
          </div>

        </div>

        {/* Main Concern */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Main Concern / Symptom (Optional)
          </label>
          <select
            {...register('mainConcern')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          >
            <option value="">Select Primary Concern</option>
            <option value="Lower Back Pain">Lower Back Pain</option>
            <option value="Neck Pain & Stiffness">Neck Pain & Stiffness</option>
            <option value="Sciatica Pain">Sciatica Pain</option>
            <option value="Shoulder Pain">Shoulder Pain</option>
            <option value="Full Body Alignment">Full Body Alignment</option>
            <option value="Sports Injury">Sports / Gym Injury</option>
            <option value="Other">Other Musculoskeletal Concern</option>
          </select>
        </div>

        {/* Optional Note */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Additional Note (Optional)
          </label>
          <div className="relative">
            <FileText className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <textarea
              rows={3}
              placeholder="e.g. Pain increases while sitting at desk"
              {...register('message')}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base py-4 rounded-xl shadow-lg transition-all transform active:scale-98 disabled:opacity-50"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Send Appointment Request via WhatsApp</span>
        </button>

        <p className="text-[11px] text-slate-500 text-center">
          🔒 Your privacy is important. No sensitive health records are stored on public servers.
        </p>

      </form>
    </div>
  );
};
