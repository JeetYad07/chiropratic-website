import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, ExternalLink } from 'lucide-react';
import { reviewsData } from '../../data/reviews';
import { clinicInfo } from '../../data/clinicInfo';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Rating • 77 Verified Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Stories from Real Patients
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              See how chiropractic adjustments by Dr Shinto Thomas have restored mobility and comfort for patients in Electronic City.
            </p>
          </div>

          <a
            href={clinicInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-800 font-bold text-sm bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-xs hover:shadow-sm transition-all"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Header Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                    {rev.highlightTag}
                  </span>
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-slate-200 group-hover:text-sky-200 transition-colors" />

                {/* Comment */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Patient Reviews Link */}
        <div className="text-center mt-12">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-sky-700 font-bold text-sm hover:underline"
          >
            <span>Read More Testimonials & Patient Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
