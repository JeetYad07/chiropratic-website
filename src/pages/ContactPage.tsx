import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { LocationSection } from '../components/home/LocationSection';
import { AppointmentForm } from '../components/booking/AppointmentForm';
import { Instagram } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Contact Us & Location | Dr Hashi Chiropractic Electronic City"
        description="Contact Dr Hashi Chiropractic in Electronic City, Bengaluru. Phone: +91 96450 10120. Address: 13th Cross, Neeladri Rd, Electronic City."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Page Header */}
          <div className="text-center space-y-4">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contact & Visit Dr Hashi Chiropractic
            </h1>
            <p className="text-slate-700 text-base max-w-xl mx-auto leading-relaxed">
              We are located on Neeladri Road in Electronic City Phase 1. Reach out for appointments or general inquiries.
            </p>
          </div>

          {/* Form & Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <AppointmentForm />
            </div>
            
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Direct Contact Information</h3>
                
                <div className="space-y-4 text-sm text-slate-700">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Clinic Phone</span>
                    <a href={`tel:${clinicInfo.phone}`} className="text-base font-bold text-sky-600 hover:underline">
                      {clinicInfo.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Direct</span>
                    <a href={`https://wa.me/${clinicInfo.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-base font-bold text-emerald-600 hover:underline">
                      {clinicInfo.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Instagram</span>
                    <a href={clinicInfo.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-base font-bold text-pink-600 hover:underline mt-0.5">
                      <Instagram className="w-4 h-4" />
                      <span>{clinicInfo.instagramHandle}</span>
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Full Address</span>
                    <p className="font-medium text-slate-800">
                      {clinicInfo.address.full}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Landmark: {clinicInfo.address.landmark}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <LocationSection />

        </div>
      </main>
    </>
  );
};
