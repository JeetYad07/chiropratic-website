# Dr Hashi Chiropractic — Web Application

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

A modern, responsive, mobile-first web application for **Dr Hashi Chiropractic**, replacing legacy web presentation with a high-conversion, patient-centered digital clinic experience.

Located on **Neeladri Road in Electronic City Phase 1, Bengaluru**, the clinic specializes in gentle full-body spinal alignments, cervical spondylitis care, lower back relief, sciatica treatment, and desk worker posture rehabilitation by **Dr Shinto Thomas**.

---

## 🌟 Key Features

### 🩺 1. Structured WhatsApp Booking System
- **Formatted Card Messages**: Automatically generates structured WhatsApp booking requests containing a unique Reference ID (`HASHI-YYYYMMDD-XXXX`), patient details, preferred time slot, clinic address, and a doctor confirmation prompt.
- **Privacy-First Architecture**: Operates without a database server—no sensitive patient medical records are stored on remote web servers.

### 📅 2. Client-Side Appointment Tracking & Calendar Sync
- **Live Status Indicator**: Patients can track booking status (🟡 *Pending Doctor Confirmation* → 🟢 *Session Confirmed*).
- **1-Click Google Calendar Add**: Generates instant pre-filled Google Calendar event URLs with clinic location and navigation links.
- **Downloadable .ICS File**: Generates `.ics` calendar invitation files compatible with Apple Calendar, Outlook, and iOS.
- **Web Browser Notifications**: Web Push Notification API integration (`Notification.requestPermission()`) alerting patients when their appointment is confirmed.

### 🎯 3. Interactive Patient Concern Finder
- A 3-step interactive wizard (**Body Area → Symptom Duration → Daily Impact**) that guides patients to relevant educational guides and pre-fills their appointment request.

### 💻 4. Electronic City IT Desk Worker Ergonomic Hub
- Tailored for software professionals in Electronic City (Infosys, Wipro, TCS).
- Features a **3-Minute Doctor-Approved Desk Micro-Stretches Modal** (Neck Side Stretch, Upper Back Extension, Chest Opener, Torso Twist) and an **Ergonomic Workstation Setup Checklist**.

### ⏱️ 5. Interactive First Visit Preparation Checklist & Visual Timeline
- Step-by-step visual timeline (*01 Consultation → 02 Physical Assessment → 03 Care Plan → 04 Follow-up Guidance*).
- Interactive preparation cards covering **What to Wear** (activewear), **What to Bring** (MRI/X-Ray reports), and **Expected Visit Duration** (40–50 mins).

### 📍 6. Electronic City Landmark & Travel Time Bar
- Distance badges showing approximate travel times from key landmarks:
  - 📍 Neeladri Circle: **2 mins**
  - 🏢 Infosys Gate 1: **5 mins**
  - 💼 Wipro Campus: **8 mins**
  - 🚇 Electronic City Metro: **6 mins**

### ⭐ 7. Patient Testimonials with Category Filtering
- Genuine 5.0-star Google reviews with category tag filters (`All`, `Back Pain`, `Neck Care`, `Sciatica`, `Posture Correction`, `Desk Fatigue`).
- Verified Google Business Profile badges and deep-links.

### 🔍 8. Advanced Local SEO & Schema.org JSON-LD Integration
- **Dynamic Meta Tags**: Dynamic title, meta description, and OpenGraph tags via `react-helmet-async`.
- **JSON-LD Schema**: Automatically injects Schema.org `MedicalClinic` and `Physician` structured data for Google Rich Search Results in Electronic City.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **React 18** | UI component architecture |
| **Build Tool** | **Vite 5** | Lightning-fast dev server and bundle optimization |
| **Language** | **TypeScript 5** | Strict type safety across components and data models |
| **Styling** | **Tailwind CSS 3** | Utility-first responsive design & custom design tokens |
| **Typography** | **Plus Jakarta Sans** | Clean, high-trust healthcare typography via Google Fonts |
| **Design System** | **UI/UX Pro Max** | Visual style guidelines, glassmorphic cards, and hover glows |
| **Routing** | **React Router DOM 6** | Client-side Single Page Application (SPA) routing |
| **Form & Validation** | **React Hook Form + Zod** | Uncontrolled form management with type-safe schema validation |
| **SEO** | **React Helmet Async** | Page title, meta descriptions, and JSON-LD schema injection |
| **Icons** | **Lucide React** | Medical, navigation, and interaction icon set |
| **Testing** | **Vitest + RTL** | Fast unit testing for utilities, forms, and storage helpers |

---

## 📁 Repository Structure

```text
dr-hashi-website/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── booking/
│   │   │   ├── AppointmentForm.tsx
│   │   │   └── BookingStatusModal.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── ConcernFinder.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ErgonomicHubSection.tsx
│   │   │   ├── DeskStretchesModal.tsx
│   │   │   ├── DoctorProfileSection.tsx
│   │   │   ├── FirstVisitProcess.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── LocationSection.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileStickyBar.tsx
│   │   └── seo/
│   │       └── SEOHead.tsx
│   ├── data/
│   │   ├── clinicInfo.ts
│   │   ├── doctor.ts
│   │   ├── services.ts
│   │   ├── conditions.ts
│   │   ├── faqs.ts
│   │   └── reviews.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ConditionsPage.tsx
│   │   ├── ConditionDetailPage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── BookPage.tsx
│   ├── utils/
│   │   ├── whatsapp.ts
│   │   ├── calendar.ts
│   │   ├── appointmentStorage.ts
│   │   └── schema.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   └── unit/
│       ├── whatsapp.test.ts
│       ├── calendar.test.ts
│       └── appointmentStorage.test.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/jeetyadav/Dr_Hashi_website.git
cd Dr_Hashi_website
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Unit Tests
Execute the unit test suite with Vitest:
```bash
npm run test
```

### 4. Type Checking
Run strict TypeScript compilation check:
```bash
npx tsc --noEmit
```

### 5. Production Build
Build the optimized static bundle for production:
```bash
npm run build
```

---

## 📍 Clinic Details & Contact

- **Clinic Name**: Dr Hashi Chiropractic
- **Lead Chiropractor**: Dr Shinto Thomas
- **Phone**: [+91 96450 10120](tel:+919645010120)
- **WhatsApp**: [+91 96450 10120](https://wa.me/919645010120)
- **Instagram**: [@chiro_hashi](https://www.instagram.com/chiro_hashi/)
- **Address**: 13th Cross, Neeladri Rd, Above Apollo Pharmacy, Electronic City Phase 1, Bengaluru, Karnataka 560100
- **Google Maps Profile**: [Dr Hashi Chiropractic on Google Maps](https://maps.google.com/?q=Dr+Hashi+Chiropractic+Electronic+City)

---

## 📄 License

Copyright © 2026 **Dr Hashi Chiropractic**. All rights reserved.
