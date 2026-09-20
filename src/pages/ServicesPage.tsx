import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { servicesData } from '../data/services';
import { Activity, UserCheck, ShieldCheck, Zap, Sparkles, Flame, CheckCircle2, Calendar, MessageSquare } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

const iconMap: Record<string, React.ElementType> = {
  Activity,
  UserCheck,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame,
};

export const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Chiropractic Services | Dr Hashi Chiropractic Electronic City"
        description="Explore our chiropractic treatments: Full Body Alignment, Cervical Spine Care, Lower Back Pain Relief, Sciatica Therapy, and Posture Correction in Electronic City."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Treatment & Care Services
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Chiropractic Treatments We Provide
            </h1>
            <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
              Every treatment plan is tailored to your physical assessment, joint flexibility, and personal health goals.
            </p>
          </div>

          {/* Detailed Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesData.map((service) => {
              const IconComponent = iconMap[service.iconName] || Activity;
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900">{service.title}</h2>
                        <span className="text-xs font-semibold text-sky-600">Non-Invasive Chiropractic Care</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Benefits & Expected Outcomes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                        {service.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book for {service.title}</span>
                    </Link>

                    <button
                      onClick={() => openWhatsAppChat({ name: '', phone: '', mainConcern: service.title })}
                      className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 text-xs font-bold bg-emerald-50 py-2.5 px-3.5 rounded-xl border border-emerald-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </>
  );
};
