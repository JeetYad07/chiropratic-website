import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { doctorProfile } from '../data/doctor';
import { Award, Calendar, MessageSquare, Star } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About Dr Shinto Thomas | Chiropractor in Electronic City"
        description="Learn about Dr Shinto Thomas (Dr Hashi Chiropractic), qualifications, spinal wellness practice philosophy, and clinic details in Electronic City, Bangalore."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              About Our Clinic & Practitioner
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Compassionate, Non-Invasive Chiropractic Care
            </h1>
            <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
              Dr Hashi Chiropractic provides evidence-informed joint adjustments, spinal mobilization, and posture education in Electronic City.
            </p>
          </div>

          {/* Doctor Bio Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-tr from-sky-600 via-teal-600 to-sky-700 rounded-3xl p-8 text-white shadow-lg text-center">
                  <div className="w-28 h-28 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-4xl mb-6 border border-white/30 shadow-inner">
                    ST
                  </div>
                  <h2 className="text-2xl font-bold">{doctorProfile.name}</h2>
                  <p className="text-sky-100 text-sm font-semibold mt-1">{doctorProfile.title}</p>
                  
                  <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-center gap-2 text-xs text-amber-300 font-bold">
                    <Star className="w-4 h-4 fill-amber-300" />
                    <span>5.0 Rating (77 Google Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Meet {doctorProfile.name}</h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {doctorProfile.bio}
                </p>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-sky-600" />
                    Our Practice Philosophy
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{doctorProfile.philosophy}&rdquo;
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctorProfile.languages.map((lang) => (
                      <span key={lang} className="bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-100">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </Link>
                  <button
                    onClick={() => openWhatsAppChat()}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Us</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  );
};
