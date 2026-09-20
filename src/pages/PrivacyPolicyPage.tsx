import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { clinicInfo } from '../data/clinicInfo';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Dr Hashi Chiropractic"
        description="Privacy policy and patient data protection information for Dr Hashi Chiropractic."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: September 2026</p>

          <p>
            At <strong>{clinicInfo.name}</strong>, we respect your privacy and are committed to protecting any contact details you share when inquiring about chiropractic care.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">1. Information Collection</h2>
          <p>
            Our website operates as a client-side web application. When you request an appointment via our online form, your details (Name, Phone number, preferred date, and general concern) are formatted into a WhatsApp deep link and sent directly to our official WhatsApp Business account.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">2. No Medical Record Storage</h2>
          <p>
            We do not store, collect, or transmit personal health records or medical histories on public web servers or cloud databases through this website.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">3. Third-Party Services</h2>
          <p>
            This website embeds Google Maps for location guidance. Opening WhatsApp deep links transfers your communication to the WhatsApp messaging platform subject to WhatsApp's terms and privacy policy.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">4. Contact Us</h2>
          <p>
            For any privacy inquiries or to update your contact preferences, please reach out to us at <strong className="text-slate-900">{clinicInfo.phoneDisplay}</strong> or visit our clinic at {clinicInfo.address.full}.
          </p>
        </div>
      </main>
    </>
  );
};
