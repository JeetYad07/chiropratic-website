import React, { useState } from 'react';
import { Laptop, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { DeskStretchesModal } from './DeskStretchesModal';

export const ErgonomicHubSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-12 bg-gradient-to-r from-sky-900 to-teal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-800/60 p-8 sm:p-10 rounded-3xl border border-sky-500/20 backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5" />
                <span>Electronic City IT Ergonomic Care</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Working Long Desk Hours in E-City?
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Prolonged desk sitting often causes <strong>Tech Neck</strong>, lower back stiffness, and shoulder fatigue. Explore our doctor-approved 3-minute desk stretches and ergonomic checklist designed specifically for software professionals.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-sky-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>3-Min Seated Micro-Stretches</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>Workstation Setup Checklist</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 hover:bg-sky-50 font-bold px-7 py-4 rounded-2xl text-sm shadow-lg transition-all hover:scale-105 group"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Open Desk Worker Guide</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      <DeskStretchesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
