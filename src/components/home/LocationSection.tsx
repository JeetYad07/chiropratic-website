import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';
import { clinicInfo } from '../../data/clinicInfo';
import { openWhatsAppChat } from '../../utils/whatsapp';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Visit Our Clinic
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Conveniently Located in Electronic City
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Easily accessible from Neeladri Road, Doddathoguru, and Electronic City Phase 1.
          </p>
        </div>

        {/* Location Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Address Box */}
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-600" />
                  <span>{clinicInfo.name}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {clinicInfo.address.full}
                </p>
                <div className="inline-block bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-100">
                  Landmark: {clinicInfo.address.landmark}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  Clinic Operating Hours
                </h4>
                <div className="space-y-1.5 text-sm text-slate-700">
                  {clinicInfo.hours.map((h, i) => (
                    <div key={i} className="flex justify-between font-medium">
                      <span>{h.days}</span>
                      <span className="text-slate-900 font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmark Distance Indicators */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Nearby Travel Times (E-City)</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium text-slate-700">
                    📍 Neeladri Circle: <strong className="text-slate-900">2 mins</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium text-slate-700">
                    🏢 Infosys Gate 1: <strong className="text-slate-900">5 mins</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium text-slate-700">
                    💼 Wipro Campus: <strong className="text-slate-900">8 mins</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium text-slate-700">
                    🚇 E-City Metro: <strong className="text-slate-900">6 mins</strong>
                  </div>
                </div>
              </div>

              {/* Plus Code & Navigation */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div>Plus Code: <strong className="text-slate-800 font-semibold">{clinicInfo.address.plusCode}</strong></div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions on Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-3 rounded-xl text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call Clinic</span>
                </a>
                <button
                  onClick={() => openWhatsAppChat()}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 font-bold py-3 px-3 rounded-xl text-xs transition-colors border border-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Google Maps Embed Container */}
          <div className="lg:col-span-7 bg-slate-200 rounded-3xl overflow-hidden min-h-[350px] border border-slate-200 shadow-xs relative">
            <iframe
              title="Dr Hashi Chiropractic Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.965829910444!2d77.6521!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c568910b82f%3A0x6b77241cf130a84e!2sDr%20Hashi%20Chiropractic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
