import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Clock, Star, ShieldCheck, Instagram } from 'lucide-react';
import { clinicInfo } from '../../data/clinicInfo';
import { openWhatsAppChat } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Ratings */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                H
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  {clinicInfo.name}
                </span>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                  Electronic City, Bengaluru
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Personalized chiropractic care, full-body spinal alignment, and joint pain relief by Dr Shinto Thomas.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span>5.0 ({clinicInfo.reviewCount} Reviews)</span>
              </a>

              <a
                href={clinicInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 hover:border-transparent transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
                <span>{clinicInfo.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Dr Shinto Thomas</Link></li>
              <li><Link to="/services" className="hover:text-sky-400 transition-colors">Chiropractic Services</Link></li>
              <li><Link to="/conditions" className="hover:text-sky-400 transition-colors">Conditions We Treat</Link></li>
              <li><Link to="/reviews" className="hover:text-sky-400 transition-colors">Patient Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-sky-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/book" className="hover:text-sky-400 transition-colors">Request Appointment</Link></li>
            </ul>
          </div>

          {/* Column 3: Conditions Treated */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Conditions Treated</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/conditions/back-pain" className="hover:text-sky-400 transition-colors">Lower Back Pain</Link></li>
              <li><Link to="/conditions/neck-pain" className="hover:text-sky-400 transition-colors">Neck Pain & Cervical Care</Link></li>
              <li><Link to="/conditions/sciatica" className="hover:text-sky-400 transition-colors">Sciatica Relief</Link></li>
              <li><Link to="/conditions/shoulder-pain" className="hover:text-sky-400 transition-colors">Shoulder Stiffness</Link></li>
              <li><Link to="/conditions/knee-pain" className="hover:text-sky-400 transition-colors">Knee & Joint Care</Link></li>
              <li><Link to="/conditions/sports-injuries" className="hover:text-sky-400 transition-colors">Sports Strain</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Clinic Location</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>{clinicInfo.address.full}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-medium text-white">Mon – Sat: 9:00 AM – 6:00 PM</div>
                  <div className="text-xs text-slate-400">Sun: By Appointment</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-sky-400 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Clinic
                </a>
                <button
                  onClick={() => openWhatsAppChat()}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors border border-emerald-500/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>© {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-300 transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
