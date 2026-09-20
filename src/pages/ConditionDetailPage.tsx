import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { conditionsData } from '../data/conditions';
import { CheckCircle2, AlertCircle, Calendar, MessageSquare, HelpCircle, ArrowLeft } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

export const ConditionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const condition = conditionsData.find((c) => c.slug === slug);

  if (!condition) {
    return <Navigate to="/conditions" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${condition.title} Relief | Dr Hashi Chiropractic`}
        description={`Detailed guide on ${condition.title}. Symptoms, assessment approach, and chiropractic care in Electronic City, Bangalore by Dr Shinto Thomas.`}
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <Link
            to="/conditions"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Conditions</span>
          </Link>

          {/* Title Header */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Symptom & Assessment Guide
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {condition.title}
            </h1>
            <p className="text-slate-700 text-base leading-relaxed">
              {condition.summary}
            </p>
          </div>

          {/* Section 1: Symptoms */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Common Symptoms & Complaints</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {condition.symptoms.map((sym, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Assessment Approach */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">How Physical Assessment May Work</h2>
            <div className="space-y-2.5">
              {condition.assessmentApproach.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: General Care Approach */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">General Care & Alignment Plan</h2>
            <div className="space-y-2.5">
              {condition.carePlan.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: When to seek evaluation */}
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200/80 mb-8 space-y-4">
            <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>When Professional Evaluation May Be Appropriate</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900 font-medium">
              {condition.whenToSeekEvaluation.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: FAQs for this condition */}
          {condition.faqs.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Condition FAQs</h2>
              <div className="space-y-4">
                {condition.faqs.map((f, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-600" />
                      {f.question}
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed pl-6">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Call to Action */}
          <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-8 sm:p-10 rounded-3xl text-white shadow-xl text-center space-y-6">
            <h3 className="text-2xl font-extrabold">Ready to Address Your {condition.title}?</h3>
            <p className="text-sky-100 text-sm max-w-lg mx-auto">
              Book a thorough consultation and spinal mobility assessment with Dr Shinto Thomas in Electronic City.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:bg-sky-50 transition-colors"
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Book Consultation</span>
              </Link>
              <button
                onClick={() => openWhatsAppChat({ name: '', phone: '', mainConcern: condition.title })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
