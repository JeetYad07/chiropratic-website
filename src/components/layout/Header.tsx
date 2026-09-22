import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Star, Calendar, Instagram } from 'lucide-react';
import { clinicInfo } from '../../data/clinicInfo';
import { openWhatsAppChat } from '../../utils/whatsapp';
import { trackEvent } from '../../utils/analytics';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Conditions', path: '/conditions' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        {/* Top Banner */}
        <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center text-amber-400 font-semibold gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                5.0 ({clinicInfo.reviewCount} Google Reviews)
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="hidden sm:inline text-slate-300">Neeladri Rd, Electronic City</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={clinicInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors flex items-center gap-1 font-medium text-slate-300"
                title="Follow Dr Hashi on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span className="hidden sm:inline">{clinicInfo.instagramHandle}</span>
              </a>
              <a
                href={`tel:${clinicInfo.phone}`}
                onClick={() => trackEvent('cta_phone_click', { placement: 'header_top_bar' })}
                className="hover:text-sky-400 transition-colors flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3 text-sky-400" />
                <span>{clinicInfo.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  trackEvent('cta_whatsapp_click', { placement: 'header_top_bar' });
                  openWhatsAppChat();
                }}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline">WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'glass-header shadow-sm py-3 border-b border-slate-200/80'
              : 'bg-white py-4 border-b border-slate-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                H
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                  Dr Hashi
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 block">
                  Chiropractic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-sky-700 bg-sky-50 font-semibold'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/book"
                onClick={() => trackEvent('cta_book_click', { placement: 'header_navbar' })}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow-glow transition-all transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[100px] z-40 bg-white/95 backdrop-blur-md flex flex-col justify-between p-6 border-t border-slate-200 animate-in fade-in slide-in-from-top duration-200">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-sky-700 bg-sky-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 mb-16">
              <Link
                to="/book"
                onClick={() => trackEvent('cta_book_click', { placement: 'mobile_drawer' })}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white font-semibold py-3.5 rounded-xl shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <button
                onClick={() => {
                  trackEvent('cta_whatsapp_click', { placement: 'mobile_drawer' });
                  openWhatsAppChat();
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3.5 rounded-xl shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
