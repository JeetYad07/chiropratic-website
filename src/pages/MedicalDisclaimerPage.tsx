import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { clinicInfo } from '../data/clinicInfo';

export const MedicalDisclaimerPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Medical Disclaimer | Dr Hashi Chiropractic"
        description="Medical disclaimer regarding educational information on Dr Hashi Chiropractic website."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900">Medical & Health Disclaimer</h1>
          <p className="text-xs text-slate-400">Last updated: September 2026</p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            The information contained on this website is for general educational and informational purposes only and does not constitute medical advice or a formal diagnostic assessment.
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">1. Not a Substitute for Medical Advice</h2>
          <p>
            No content on this website (including symptom guides, Concern Finder results, service descriptions, or FAQs) should replace direct evaluation, diagnosis, or treatment by a licensed healthcare professional.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">2. Practitioner Scope</h2>
          <p>
            Chiropractic adjustments and spinal wellness services at <strong>{clinicInfo.name}</strong> are conducted by <strong>Dr Shinto Thomas</strong> following thorough clinical screening and physical assessment.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">3. Individual Results Vary</h2>
          <p>
            Treatment outcomes and recovery times vary between individuals depending on physical condition, age, health history, compliance with exercises, and anatomical factors.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">4. Emergency Care</h2>
          <p>
            If you are experiencing severe progressive neurological deficits, sudden bowel/bladder incontinence, or severe traumatic injury, please seek immediate emergency hospital care.
          </p>
        </div>
      </main>
    </>
  );
};
