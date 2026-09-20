import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { AppointmentForm } from '../components/booking/AppointmentForm';
import { clinicInfo } from '../data/clinicInfo';
import { Phone, MessageSquare, MapPin, Star, ShieldCheck } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

export const BookPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Book Appointment | Dr Hashi Chiropractic Electronic City"
        description="Book your chiropractic consultation with Dr Shinto Thomas in Electronic City, Bangalore. Simple WhatsApp appointment request form."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Quick Appointment Booking
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Book Your Chiropractic Session
            </h1>
            <p className="text-slate-700 text-base max-w-xl mx-auto leading-relaxed">
              Fill in your details to launch an instant WhatsApp appointment request directly with our clinic team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <AppointmentForm />
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Rating Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-base">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span>5.0 Google Rating</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Join 77+ satisfied patients in Electronic City who have experienced personalized joint pain relief and posture correction.
                </p>
              </div>

              {/* Direct Booking Actions */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Prefer Direct Contact?</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>Call {clinicInfo.phoneDisplay}</span>
                  </a>

                  <button
                    onClick={() => openWhatsAppChat()}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp Chat</span>
                  </button>
                </div>
              </div>

              {/* Clinic Address Info */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{clinicInfo.address.full}</span>
                </div>
                <p className="pl-7 text-slate-500">Landmark: {clinicInfo.address.landmark}</p>
                <div className="flex items-center gap-2 pl-7 text-emerald-600 font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>No referral required for initial evaluation</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
};
