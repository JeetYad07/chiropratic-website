import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ConditionsPage } from '../pages/ConditionsPage';
import { ConditionDetailPage } from '../pages/ConditionDetailPage';
import { ReviewsPage } from '../pages/ReviewsPage';
import { FAQPage } from '../pages/FAQPage';
import { ContactPage } from '../pages/ContactPage';
import { BookPage } from '../pages/BookPage';
import { AppointmentTrackingPage } from '../pages/AppointmentTrackingPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminAppointmentDetailPage } from '../pages/admin/AdminAppointmentDetailPage';
import { AdminAuthGate } from '../components/admin/AdminAuthGate';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { MedicalDisclaimerPage } from '../pages/MedicalDisclaimerPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/conditions" element={<ConditionsPage />} />
        <Route path="/conditions/:slug" element={<ConditionDetailPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/appointments/:id" element={<AppointmentTrackingPage />} />
        
        {/* Protected Admin Routes */}
        <Route
          path="/admin/appointments"
          element={
            <AdminAuthGate>
              <AdminDashboardPage />
            </AdminAuthGate>
          }
        />
        <Route
          path="/admin/appointments/:id"
          element={
            <AdminAuthGate>
              <AdminAppointmentDetailPage />
            </AdminAuthGate>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
