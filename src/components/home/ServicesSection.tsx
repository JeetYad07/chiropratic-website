import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, UserCheck, ShieldCheck, Zap, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/services';

const iconMap: Record<string, React.ElementType> = {
  Activity,
  UserCheck,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame,
};

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Our Care Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Chiropractic Services
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
            Non-surgical, drug-free treatments tailored to restore your spinal health, joint flexibility, and everyday comfort.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Activity;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-gradient-to-tr group-hover:from-sky-600 group-hover:to-teal-600 text-sky-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Key Benefits List */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs font-bold text-sky-600 group-hover:text-teal-600 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <span>View All Services & Care Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
