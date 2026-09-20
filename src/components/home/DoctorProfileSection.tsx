import React from 'react';
import { Link } from 'react-router-dom';
import { doctorProfile } from '../../data/doctor';
import { clinicInfo } from '../../data/clinicInfo';
import { CheckCircle2, Star, Calendar, MessageSquare, Award, Globe2 } from 'lucide-react';
import { openWhatsAppChat } from '../../utils/whatsapp';

export const DoctorProfileSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Avatar / Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="bg-gradient-to-tr from-sky-600 via-teal-600 to-sky-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />
                
                {/* Doctor Avatar Placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-3xl mb-6 shadow-inner border border-white/30">
                  ST
                </div>

                <h3 className="text-2xl font-extrabold tracking-tight">{doctorProfile.name}</h3>
                <p className="text-sky-100 text-sm font-semibold mt-1">{doctorProfile.title}</p>
                <p className="text-xs text-sky-200 mt-0.5">{clinicInfo.name}</p>

                {/* Rating Badge */}
                <div className="mt-6 pt-4 border-t border-white/20 flex items-center gap-3">
                  <div className="flex text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">5.0 / 5.0 Rating (77 Google Reviews)</span>
                </div>

                {/* Spoken Languages Pills */}
                <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-sky-200 font-semibold">
                    <Globe2 className="w-4 h-4 text-sky-200 shrink-0" />
                    <span>Languages Spoken:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {doctorProfile.languages.map((lang, idx) => (
                      <span key={idx} className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-white/30">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Qualifications & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Meet Your Practitioner
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Dedicated Spine & Joint Wellness Care
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              {doctorProfile.bio}
            </p>

            {/* Philosophy Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-sky-600" />
                Clinical Practice Philosophy
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{doctorProfile.philosophy}&rdquo;
              </p>
            </div>

            {/* Qualifications Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Expertise & Qualifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctorProfile.qualifications.map((q, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with {doctorProfile.name}</span>
              </Link>
              <button
                onClick={() => openWhatsAppChat()}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask a Question on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
