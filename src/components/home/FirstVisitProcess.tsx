import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const FirstVisitProcess: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Detailed Consultation",
      description: "We start by discussing your pain history, lifestyle habits, work ergonomics, and specific physical discomforts."
    },
    {
      number: "02",
      title: "Physical & Posture Assessment",
      description: "Dr Shinto Thomas conducts range-of-motion tests, spinal palpation, and postural screening to locate structural tension."
    },
    {
      number: "03",
      title: "Personalized Care Plan & Alignment",
      description: "You receive gentle, controlled chiropractic adjustments and spinal mobilizations tailored to your joint health."
    },
    {
      number: "04",
      title: "Ergonomic & Follow-up Guidance",
      description: "We provide easy home exercises, sitting posture tips, and a clear roadmap for sustained long-term mobility."
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="inline-block bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            What to Expect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your First Visit Process
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            A transparent, 4-step care workflow designed to keep you comfortable, informed, and involved every step of the way.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/70 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl font-extrabold text-sky-400 block mb-4 group-hover:scale-110 transition-transform origin-left">
                  {s.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Visit Prep Checklist Cards */}
        <div className="bg-slate-800/50 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4 mb-12">
          <h3 className="text-lg font-bold text-white text-center mb-4">First Visit Preparation Checklist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/70">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">👔 What to Wear</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Wear comfortable, loose clothing or activewear (t-shirt and track pants) that allow easy joint movement during physical assessment.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/70">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">📄 What to Bring</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bring any recent MRI scans, X-ray reports, or blood tests relevant to your spinal or joint pain if available.
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/70">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">⏱️ Duration</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Plan approximately 40–50 minutes for your initial visit, covering thorough health history, posture evaluation, and care plan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Initial Consultation</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
