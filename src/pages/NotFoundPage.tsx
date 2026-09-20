import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Page Not Found | Dr Hashi Chiropractic" />
      <main className="py-24 bg-slate-50 text-center">
        <div className="max-w-md mx-auto px-4 space-y-6">
          <span className="text-6xl font-extrabold text-sky-600 block">404</span>
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>
    </>
  );
};
