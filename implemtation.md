# Dr Hashi Chiropractic — Implementation Plan

## 1. Project Objective

Rebuild the current Google Sites website into a modern, responsive, mobile-first chiropractic clinic SPA (Single Page Application) for **Dr Hashi Chiropractic**, replacing the old presentation with a high-conversion, professional web application.

### Key Focus Areas:
- **Patient Trust**: Highlight credentials, doctor profile, authentic imagery, and genuine patient reviews.
- **Local Search & SEO**: Localized metadata (`React Helmet Async`), structured data (`JSON-LD`), sitemap, and semantic HTML.
- **Primary Conversions**: WhatsApp chat integration, direct phone calls (`tel:`), appointment requests, and Google Maps directions.
- **Interactive Patient Tools**: Concern Finder (body area, duration, impact) to guide patients to relevant conditions/services.
- **Mobile-First Experience**: Fixed bottom CTA bar (`Call | WhatsApp | Book`), no horizontal scroll, high touch target sizes.
- **Zero Backend / Privacy-Focused**: Direct WhatsApp link generation with validated form inputs—no medical data saved on servers.

---

## 2. Technology Stack & Constraints

Strict adherence to frontend-only technologies as defined in `requirement.md`:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **React.js (v18+)** | Component-based UI library |
| **Build Tool** | **Vite** | Fast dev server & optimized productionbundler |
| **Language** | **TypeScript** | Strict type safety across components and data models |
| **Styling** | **Tailwind CSS (v3/v4)** | Utility-first responsive styling and custom color tokens |
| **Routing** | **React Router (v6/v7)** | Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`) |
| **SEO & Meta** | **React Helmet Async** | Dynamic HTML title, meta description, and OpenGraph tags per route |
| **Icons** | **Lucide React** | Clean, accessible medical and UI icon set |
| **Animations** | **Motion / Framer Motion** | Restrained, accessible UI transitions & scroll animations |
| **Form Handling** | **React Hook Form** | Uncontrolled form management with high performance |
| **Schema Validation** | **Zod** | Type-safe form validation for appointment/contact forms |
| **Unit Testing** | **Vitest + React Testing Library** | Component, utility, and form validation tests |
| **E2E Testing** | **Playwright** | Full user flow testing (Home → Services → Condition → Book → WhatsApp) |
| **Hosting & CI/CD** | **GitHub + Vercel** | Automated deployment pipeline via Git push |

> [!IMPORTANT]
> **No Backend Required**: There is no server API, database (PostgreSQL/Prisma), or headless CMS (Sanity) in the MVP. All clinic data (services, FAQs, doctor bio, condition pages) will reside in structured, type-safe local data files (`src/data/`).

---

## 3. Recommended Repository Structure (Vite SPA)

```text
dr-hashi-website/
├── public/
│   ├── images/
│   │   ├── doctor/
│   │   ├── clinic/
│   │   └── services/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileStickyBar.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── ConcernFinder.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── DoctorProfileSection.tsx
│   │   │   ├── FirstVisitProcess.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── LocationSection.tsx
│   │   ├── booking/
│   │   │   └── AppointmentForm.tsx
│   │   ├── seo/
│   │   │   └── SEOHead.tsx
│   │   └── shared/
│   │       ├── WhatsAppButton.tsx
│   │       └── PhoneButton.tsx
│   ├── data/
│   │   ├── clinicInfo.ts
│   │   ├── doctor.ts
│   │   ├── services.ts
│   │   ├── conditions.ts
│   │   ├── faqs.ts
│   │   ├── reviews.ts
│   │   └── gallery.ts
│   ├── hooks/
│   │   ├── useWhatsApp.ts
│   │   └── useScrollToTop.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ConditionsPage.tsx
│   │   ├── ConditionDetailPage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── BookPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── MedicalDisclaimerPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── types/
│   │   ├── service.ts
│   │   ├── condition.ts
│   │   ├── review.ts
│   │   └── booking.ts
│   ├── utils/
│   │   ├── whatsapp.ts
│   │   ├── schema.ts (JSON-LD generators)
│   │   └── analytics.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── unit/
│   │   ├── whatsapp.test.ts
│   │   ├── ConcernFinder.test.tsx
│   │   └── AppointmentForm.test.tsx
│   └── e2e/
│       └── booking-flow.spec.ts
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Page Architecture & Routing

| Route | Page Component | Key Features & Sections |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero, Trust Bar, Concern Finder, Services preview, Doctor bio, First visit steps, Reviews, FAQ, Location, CTAs |
| `/about` | `AboutPage` | Detailed Doctor Bio, Qualifications, Practice Philosophy, Clinic Gallery, Certifications |
| `/services` | `ServicesPage` | Comprehensive list of Chiropractic care services, benefits, and approach |
| `/conditions` | `ConditionsPage` | Overview of manageable concerns (Back Pain, Sciatica, Neck Pain, Scoliosis, etc.) |
| `/conditions/:slug` | `ConditionDetailPage` | Symptom breakdown, assessment approach, care guidance, FAQ & CTA |
| `/reviews` | `ReviewsPage` | Verified patient testimonials, Google Business review links & ratings |
| `/faq` | `FAQPage` | Categorized interactive accordions for first visits, pricing, location, attire |
| `/contact` | `ContactPage` | Full clinic address, interactive Google Map, operating hours, phone & WhatsApp buttons |
| `/book` | `BookPage` | Appointment Request Form (React Hook Form + Zod) redirecting to formatted WhatsApp |
| `/privacy-policy` | `PrivacyPolicyPage` | Data protection notice & communication privacy |
| `/medical-disclaimer` | `MedicalDisclaimerPage` | Standard health information & scope of practice disclaimers |

---

## 5. Core Feature Specifications

### 5.1 Appointment Request Flow (WhatsApp Integration)
1. User enters details into `AppointmentForm`:
   - Name (*Required*)
   - Phone Number (*Required*)
   - Preferred Date (*Required*)
   - Preferred Time (*Required*)
   - Main Concern (*Optional*)
   - Message (*Optional*)
2. Form validates using **Zod** schema.
3. On submit, `useWhatsApp` hook formats a pre-filled WhatsApp URI:
   `https://wa.me/91XXXXXXXXXX?text=Hi%20Dr%20Hashi,%20I%20would%20like%20to%20book%20an%20appointment.%20Name:%20...`
4. Opens WhatsApp in a new tab/app window. No patient data is sent to or stored in a backend server.

### 5.2 Concern Finder Component (3-Step Interactive Guidance)
- **Step 1: Concern Area** (`Back`, `Neck`, `Shoulder`, `Knee`, `Sciatica`, `Sports Injury`, `Other`)
- **Step 2: Symptom Duration** (`< 1 week`, `1-4 weeks`, `1-3 months`, `3+ months`)
- **Step 3: Daily Impact** (`Low`, `Moderate`, `High`)
- **Outcome**: Presents tailored educational guidance and directs user to the relevant `/conditions/:slug` route or `/book` CTA.
- *Strict Rule*: Disclaimers clearly state the tool provides educational navigation, not a medical diagnosis.

### 5.3 Mobile Sticky Bar (`MobileStickyBar`)
- Appears on mobile viewports (< 768px).
- Fixed at bottom with three primary action buttons:
  - 📞 **Call** (`tel:`)
  - 💬 **WhatsApp** (`https://wa.me/...`)
  - 📅 **Book** (`/book`)

---

## 6. Development & Implementation Roadmap

### Phase 1: Project Setup & Design Tokens
- Initialize Vite + React + TypeScript app.
- Configure Tailwind CSS with custom color palette (Calm Healthcare Blue/Teal, Deep Navy, Warm White background).
- Set up React Router, `react-helmet-async`, and Lucide icons.
- Configure ESLint, Prettier, and Vitest.

### Phase 2: Static Data & Types Setup
- Define TypeScript interfaces (`Service`, `Condition`, `Doctor`, `Review`, `FAQ`).
- Populate `src/data/` with verified practitioner data, clinic location (Electronic City, Bangalore), operating hours, and genuine patient reviews.

### Phase 3: Layout & UI Primitives
- Create sticky header with responsive mobile drawer menu.
- Build reusable UI primitives (`Button`, `Card`, `Accordion`, `Badge`).
- Implement `MobileStickyBar` and `SEOHead` wrapper.

### Phase 4: Core Pages & Interactive Components
- Build `HomePage` and all required sub-components (Hero, TrustBar, DoctorProfile, FirstVisit).
- Develop interactive `ConcernFinder` tool.
- Build `ServicesPage`, `ConditionsPage`, and dynamic `ConditionDetailPage`.
- Build `AppointmentForm` with React Hook Form + Zod validation and WhatsApp deep link generator.

### Phase 5: SEO, Accessibility & Performance
- Add OpenGraph tags, canonical URLs, and `JSON-LD` LocalBusiness structured data.
- Optimize web images to WebP/AVIF and configure lazy loading.
- Verify WCAG 2.2 AA accessibility (keyboard focus states, ARIA roles, contrast checks).

### Phase 6: Testing & Quality Assurance
- Unit tests for `whatsapp.ts` URL generator, form validation schemas, and `ConcernFinder`.
- E2E Playwright tests covering mobile navigation and booking flow.
- Lighthouse performance audit ensuring LCP < 2.5s and CLS < 0.1.

### Phase 7: Deployment
- Push repository to GitHub.
- Connect Vercel project with environment variables (`VITE_WHATSAPP_NUMBER`, `VITE_PHONE_NUMBER`).
- Verify production domain, SSL, and custom domain configuration.

---

## 7. Verification & Acceptance Criteria

- [ ] All 11 required routes operate cleanly without client-side routing errors.
- [ ] Mobile navigation and sticky CTA bar function seamlessly across all mobile breakpoints.
- [ ] Appointment request form validates inputs and generates a valid WhatsApp message URL.
- [ ] Direct `tel:` phone links and Google Maps directions links are active.
- [ ] SEO titles, meta descriptions, and JSON-LD schema are present on all indexable pages.
- [ ] Zero build warnings, zero console errors, and 90+ Lighthouse Performance score achieved.

---

## 8. UX Enhancements & Feature Expansion Specifications

1. **Ergonomic Hub & Desk Stretch Modal (`src/components/home/DeskStretchesModal.tsx`)**:
   - Interactive modal providing 3-minute desk worker stretches (Neck Rolls, Upper Back Extension, Chest Opener, Seated Twist) with step-by-step instructions for Electronic City IT professionals.
   - Triggered via `ErgonomicHubSection.tsx` on `HomePage`.

2. **Interactive First Visit Prep Checklist (`src/components/home/FirstVisitProcess.tsx`)**:
   - Interactive preparation checklist ("What to Wear", "What Reports to Bring", "Duration Expectations") seamlessly integrated into the 4-step consultation timeline.

3. **Electronic City Landmark Distance Indicators (`src/components/home/LocationSection.tsx`)**:
   - Distance badges showing approximate travel times from Infosys Gate 1 (~5 mins), Wipro Campus (~8 mins), Neeladri Circle (~2 mins), and Electronic City Metro Station (~6 mins).

4. **Review Category Tag Filter (`src/pages/ReviewsPage.tsx`)**:
   - Filter pills (`All`, `Back Pain`, `Neck Care`, `Sciatica`, `Posture`) allowing patients to quickly locate testimonials relevant to their specific condition.

5. **1-Click Calendar Add (`src/utils/calendar.ts`)**:
   - Generates Google Calendar web links and `.ics` file downloads for requested appointment dates/times inside `AppointmentForm.tsx`.

6. **LocalBusiness JSON-LD Schema (`src/utils/schema.ts`)**:
   - Dynamically injects Schema.org `MedicalClinic` / `Physician` JSON-LD structured data into the document `<head>` via `SEOHead.tsx` for Google Rich Search Results.