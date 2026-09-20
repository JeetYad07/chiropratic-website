import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { reviewsData } from '../data/reviews';
import { clinicInfo } from '../data/clinicInfo';
import { Star, Quote, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReviewsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = React.useState<string>('All');

  const tags = ['All', 'Back Pain', 'Neck Care', 'Sciatica', 'Posture Correction', 'Desk Fatigue'];

  const filteredReviews = selectedTag === 'All'
    ? reviewsData
    : reviewsData.filter((r) => r.highlightTag.toLowerCase().includes(selectedTag.toLowerCase()) || r.comment.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <>
      <SEOHead
        title="Patient Reviews | Dr Hashi Chiropractic Electronic City"
        description="Read genuine 5.0-star Google reviews for Dr Hashi Chiropractic and Dr Shinto Thomas in Electronic City, Bengaluru."
      />
      <main className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Star Average • 77 Google Reviews</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Patient Testimonials & Reviews
            </h1>
            <p className="text-slate-700 text-base max-w-2xl mx-auto leading-relaxed">
              Read real patient experiences regarding back pain relief, neck care, cervical spondylitis, and posture realignment at Dr Hashi Chiropractic.
            </p>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTag === tag
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
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

                  <Quote className="w-8 h-8 text-slate-200" />

                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

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

          {/* External Google Review Link Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Have you visited Dr Hashi Chiropractic?</h3>
            <p className="text-slate-600 text-sm">
              We value genuine feedback from our patients! You can view all 77+ reviews directly on Google Maps.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <span>View Google Business Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Session</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
