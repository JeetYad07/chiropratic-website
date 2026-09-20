import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../../data/clinicInfo';
import { openWhatsAppChat } from '../../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-slate-200/80 text-xs font-semibold text-slate-700 mx-auto lg:mx-0">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span>5.0 Rating on Google</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">77 Verified Reviews</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Personalized Chiropractic Care in{' '}
              <span className="text-gradient">Electronic City, Bangalore</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Find lasting relief from back pain, neck stiffness, sciatica, and postural strain. Experience gentle, non-invasive spinal alignments by <span className="font-semibold text-slate-900">{clinicInfo.doctorName}</span>.
            </p>

            {/* Quick Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Non-Invasive Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Full Body Alignment</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>No Referral Needed</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                to="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md hover:shadow-glow btn-glow transition-all transform active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              
              <button
                onClick={() => openWhatsAppChat()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-all transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Location Pill */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>13th Cross, Neeladri Rd, Electronic City Phase 1</span>
            </div>
          </div>

          {/* Right Visual Card / Doctor & Clinic Highlight */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/60 rounded-full blur-2xl -mr-10 -mt-10" />
                
                {/* Visual Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                    DR
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{clinicInfo.doctorName}</h3>
                    <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider">{clinicInfo.doctorTitle}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>5.0 (77 Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Core Expertise Tags */}
                <div className="py-5 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Clinic Highlights</span>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-sky-500" />
                      <span>Cervical & Lumbar Spine Realignment</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                      <span>Desk Worker Posture Correction</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Sciatica & Nerve Pressure Decompression</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>Sports & Gym Overuse Recovery</span>
                    </div>
                  </div>
                </div>

                {/* Patient Testimonial Quote */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 italic">
                  &ldquo;I had cervical pain for 5 years... after taking a session at Dr Hashi Chiropractic, I am rid of that pain.&rdquo;
                  <span className="block not-italic font-bold text-slate-800 mt-1.5">— Sudesh Ganjoo (Verified Google Review)</span>
                </div>

                {/* Emergency / Direct Call */}
                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Need quick advice?</span>
                  <a href={`tel:${clinicInfo.phone}`} className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                    <span>Call {clinicInfo.phoneDisplay}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
