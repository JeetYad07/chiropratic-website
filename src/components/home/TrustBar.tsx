import React from 'react';
import { Star, ShieldCheck, Award, MapPin } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const metrics = [
    {
      icon: Star,
      value: "5.0 ★★★★★",
      label: "77 Google Reviews",
      sublabel: "100% Genuine Ratings"
    },
    {
      icon: Award,
      value: "Certified Care",
      label: "Dr Shinto Thomas",
      sublabel: "Spinal Alignment Specialist"
    },
    {
      icon: ShieldCheck,
      value: "Non-Invasive",
      label: "Drug-Free Relief",
      sublabel: "Holistic Joint Mobility"
    },
    {
      icon: MapPin,
      value: "Electronic City",
      label: "Neeladri Road",
      sublabel: "Easy Clinic Access"
    }
  ];

  return (
    <section className="bg-white py-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((m, index) => {
            const Icon = m.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 leading-snug">{m.value}</div>
                  <div className="text-xs font-semibold text-slate-700">{m.label}</div>
                  <div className="text-[11px] text-slate-500">{m.sublabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
