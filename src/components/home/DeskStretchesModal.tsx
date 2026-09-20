import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeskStretchesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeskStretchesModal: React.FC<DeskStretchesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stretches' | 'checklist'>('stretches');

  if (!isOpen) return null;

  const stretches = [
    {
      title: '1. Seated Neck Side Stretch',
      target: 'Relieves Upper Trapezius & Tech-Neck Tension',
      duration: '30 seconds per side',
      instructions:
        'Sit upright. Drop your right ear toward your right shoulder without lifting your shoulder. Gently place your right hand over your left temple for extra stretch. Hold and breathe deeply.',
    },
    {
      title: '2. Seated Upper Back Extension',
      target: 'Counteracts Hunching & Slouching',
      duration: '5 repetitions',
      instructions:
        'Place your feet flat on the floor. Interlock fingers behind your neck. Inhale and gently arch your spine back over the chair backrest while opening elbows wide.',
    },
    {
      title: '3. Desk Chest Opener',
      target: 'Opens Tight Pecs & Shoulder Blades',
      duration: '30 seconds',
      instructions:
        'Reach behind your back and clasp your hands together. Straighten arms and gently lift hands upward away from your seat. Feel the stretch across the front of your shoulders.',
    },
    {
      title: '4. Seated Torso Twist',
      target: 'Mobilizes Lower Spine & Thoracic Region',
      duration: '20 seconds per side',
      instructions:
        'Sit tall with knees at 90 degrees. Turn your upper body to the right, placing your left hand on your right thigh and right hand on the chair back. Twist gently on exhale.',
    },
  ];

  const checklistItems = [
    'Eye level should align with the top 1/3 of your monitor (use a laptop stand).',
    'Elbows should rest naturally at 90–100 degrees near armrests.',
    'Hips, knees, and ankles should form comfortable 90-degree angles.',
    'Maintain a small lumbar cushion or roll behind your lower back curve.',
    'Take a 60-second micro-break every 45 minutes of continuous desk work.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Electronic City IT Ergonomic Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Desk Worker Ergonomic & Stretch Guide
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Doctor-approved micro-stretches and posture tips for tech professionals sitting 6+ hours daily.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('stretches')}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === 'stretches'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3-Min Desk Stretches
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === 'checklist'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ergonomic Desk Setup
          </button>
        </div>

        {/* Tab 1: Stretches */}
        {activeTab === 'stretches' && (
          <div className="space-y-4">
            {stretches.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                </div>
                <p className="text-xs font-semibold text-teal-700">{item.target}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.instructions}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner & CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>If pain persists while sitting, schedule a physical spinal evaluation.</span>
          </div>
          <Link
            to="/book"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
