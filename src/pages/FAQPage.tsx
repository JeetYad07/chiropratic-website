import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { faqsData } from '../data/faqs';
import { ChevronDown, HelpCircle, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openWhatsAppChat } from '../utils/whatsapp';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string>(faqsData[0].id);

  const categories = ['All', 'First Visit', 'General', 'Services', 'Booking & Location'];

  const filteredFAQs = selectedCategory === 'All'
    ? faqsData
    : faqsData.filter((f) => f.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions | Dr Hashi Chiropractic"
        description="Find answers to common questions about chiropractic care, first visit procedures, safety, location in Electronic City, and appointment booking."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Patient Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-700 text-base max-w-xl mx-auto">
              Everything you need to know about your treatment and appointment at Dr Hashi Chiropractic.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4 mb-16">
            {filteredFAQs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sky-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-6 pt-0 text-slate-700 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Help Banner */}
          <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-8 rounded-3xl text-white shadow-xl text-center space-y-4">
            <h3 className="text-xl font-bold">Still Have Questions?</h3>
            <p className="text-sky-100 text-sm max-w-md mx-auto">
              Our clinic team is happy to assist you directly via WhatsApp or phone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm shadow-md"
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Book Appointment</span>
              </Link>
              <button
                onClick={() => openWhatsAppChat()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
