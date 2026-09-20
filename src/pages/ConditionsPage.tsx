import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { conditionsData } from '../data/conditions';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ConditionsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Conditions We Treat | Dr Hashi Chiropractic Electronic City"
        description="Learn how chiropractic assessment helps back pain, neck pain, sciatica, shoulder stiffness, knee pain, and sports strain in Electronic City, Bangalore."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Patient Concerns
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Conditions & Symptoms We Assess
            </h1>
            <p className="text-slate-700 text-base max-w-2xl mx-auto leading-relaxed">
              Explore symptom guides and learn how non-invasive physical evaluation can help restore joint mechanics.
            </p>
          </div>

          {/* Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {conditionsData.map((cond) => (
              <div
                key={cond.id}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {cond.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {cond.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Common Complaints</span>
                    <ul className="space-y-1.5">
                      {cond.symptoms.slice(0, 2).map((symptom, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={`/conditions/${cond.slug}`}
                    className="text-xs font-bold text-sky-600 group-hover:text-teal-600 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Symptom Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
};
