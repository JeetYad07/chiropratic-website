import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, AlertCircle, Calendar, CheckCircle } from 'lucide-react';

export const ConcernFinder: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedConcern, setSelectedConcern] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedImpact, setSelectedImpact] = useState<string>('');

  const concerns = [
    { label: 'Back Pain', slug: 'back-pain', icon: '🦴' },
    { label: 'Neck Pain & Stiffness', slug: 'neck-pain', icon: '💆' },
    { label: 'Sciatica / Leg Pain', slug: 'sciatica', icon: '⚡' },
    { label: 'Shoulder Pain', slug: 'shoulder-pain', icon: '💪' },
    { label: 'Knee & Joint Care', slug: 'knee-pain', icon: '🦵' },
    { label: 'Sports & Gym Strain', slug: 'sports-injuries', icon: '🏋️' },
  ];

  const durations = ['< 1 week', '1–4 weeks', '1–3 months', '3+ months'];
  const impacts = [
    { label: 'Low', desc: 'Mild discomfort during specific movements' },
    { label: 'Moderate', desc: 'Affects desk sitting, driving, or sleep' },
    { label: 'High', desc: 'Severely restricts daily activity and walking' },
  ];

  const handleReset = () => {
    setStep(1);
    setSelectedConcern('');
    setSelectedDuration('');
    setSelectedImpact('');
  };

  const getConcernSlug = () => {
    const matched = concerns.find((c) => c.label === selectedConcern);
    return matched ? matched.slug : 'back-pain';
  };

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Interactive Helper
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find Guidance for Your Concern
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Answer 3 quick questions to discover how chiropractic assessment can help address your pain.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {step <= 3 ? `Step ${step} of 3` : 'Assessment Result'}
            </span>
            {step > 1 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            )}
          </div>

          {/* STEP 1: Body Area */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-100">1. What primary area is causing you discomfort?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {concerns.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => {
                      setSelectedConcern(c.label);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl bg-slate-700/50 hover:bg-sky-600/20 hover:border-sky-500/50 border border-slate-600/50 text-left transition-all group flex flex-col justify-between gap-3 hover:scale-[1.02]"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Duration */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-100">
                2. How long have you experienced discomfort in your <span className="text-sky-400">{selectedConcern}</span>?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDuration(d);
                      setStep(3);
                    }}
                    className="p-4 rounded-2xl bg-slate-700/50 hover:bg-sky-600/20 hover:border-sky-500/50 border border-slate-600/50 text-center transition-all hover:scale-[1.02]"
                  >
                    <span className="text-base font-bold text-slate-200 block">{d}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Daily Impact */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-100">3. How significantly is this impacting your daily routine?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {impacts.map((imp) => (
                  <button
                    key={imp.label}
                    onClick={() => {
                      setSelectedImpact(imp.label);
                      setStep(4);
                    }}
                    className="p-4 rounded-2xl bg-slate-700/50 hover:bg-sky-600/20 hover:border-sky-500/50 border border-slate-600/50 text-left transition-all hover:scale-[1.02]"
                  >
                    <span className="text-base font-bold text-sky-400 block mb-1">{imp.label} Impact</span>
                    <span className="text-xs text-slate-300 leading-relaxed block">{imp.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Outcome & Guidance */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-sky-500/10 border border-sky-500/30 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                  <CheckCircle className="w-5 h-5" />
                  <span>Recommendation Summary</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  You reported experiencing <strong className="text-white">{selectedConcern}</strong> for <strong className="text-white">{selectedDuration}</strong> with <strong className="text-white">{selectedImpact.toLowerCase()} impact</strong> on daily activities.
                </p>
                <p className="text-xs text-slate-300">
                  A personalized physical evaluation by <strong>Dr Shinto Thomas</strong> can help identify whether spinal misalignment, nerve compression, or muscle imbalance is contributing to your discomfort.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/book"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for {selectedConcern}</span>
                </Link>

                <Link
                  to={`/conditions/${getConcernSlug()}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3.5 px-6 rounded-xl text-sm border border-slate-600 transition-colors"
                >
                  <span>Read About {selectedConcern}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Medical Disclaimer Note */}
              <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-3 border-t border-slate-700/60">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  This tool provides educational navigation only and does not constitute a medical diagnosis. Please consult a qualified practitioner for formal evaluation.
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
