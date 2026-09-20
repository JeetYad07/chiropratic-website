Dr Hashi Chiropractic — Frontend Requirements

1. Product

A modern, responsive and interactive website for Dr Hashi Chiropractic, replacing the current Google Sites presentation.

2. Technology Constraint

Primary technologies are strictly:

React.js

Vite

TypeScript

Tailwind CSS

Permitted supporting frontend libraries:

React Router

Lucide React

Motion

React Hook Form

Zod

React Helmet Async

Vitest

React Testing Library

Playwright

No backend is required for MVP.

3. Goals

The website must:

establish trust quickly

explain services clearly

help visitors find relevant concerns

make the clinic easy to contact

make appointment requests simple

work exceptionally well on mobile

improve local search presentation

look substantially more professional than the existing site

Primary conversion actions:

WhatsApp

Phone call

Appointment request

Directions

4. Target Users

Prospective local patient

Needs to understand the clinic, services, trust signals, location and booking process.

Existing patient

Needs fast access to phone, WhatsApp, address, directions and hours.

Family member

Needs practitioner credentials, services, location and first-visit information.

Search visitor

Needs to understand the clinic within seconds and reach a CTA quickly.

5. Required Pages

/
/about
/services
/conditions
/conditions/:slug
/reviews
/faq
/contact
/book
/privacy-policy
/medical-disclaimer

Optional: /gallery.

6. Homepage

Required sections:

Header

Hero

Trust indicators

Concern finder

Services

Doctor profile

First visit process

Reviews

Gallery

FAQ

Location

Final CTA

Footer

Mobile sticky CTA

7. Header

Desktop navigation:

Home | About | Services | Conditions | Reviews | FAQ | Contact | Book

Requirements:

sticky header

responsive mobile menu

active route indication

accessible keyboard navigation

prominent booking CTA

8. Hero

Must immediately communicate:

what the clinic offers

who it serves

location

next action

Required:

headline

supporting text

Book Appointment CTA

WhatsApp CTA

authentic image

Suggested positioning:

Personalized Chiropractic Care in Electronic City, Bangalore

All medical claims must be verified by the practitioner.

9. Trust

Use verified information only:

qualifications

experience

certifications

professional memberships

location

genuine review source

Never invent credentials, ratings, years of experience, or outcome statistics.

10. Doctor Profile

Display:

professional photo

full name

title

qualifications

experience

areas of practice

biography

languages

certifications

CTA

11. Services

The initial list should reflect the existing clinic content, subject to practitioner confirmation:

Back Pain

Lower Back Pain

Neck Pain

Shoulder Pain

Knee Pain

Sciatica

Sports Injuries

Tennis Elbow

Scoliosis

relevant spinal/mobility concerns

posture/alignment-related services

Each service requires:

title

icon/image

plain-language description

Learn More CTA

related concerns

booking/contact CTA

12. Condition Pages

Structure:

Hero
↓
What is the concern?
↓
Common symptoms/complaints
↓
How assessment may work
↓
General care approach
↓
When professional/medical evaluation may be appropriate
↓
FAQ
↓
CTA

The page must not diagnose users or promise outcomes.

13. Concern Finder

Interactive steps:

Step 1

Back, Neck, Shoulder, Knee, Sciatica, Sports Injury, Other.

Step 2

< 1 week, 1–4 weeks, 1–3 months, 3+ months.

Step 3

Low, Moderate, High impact.

Result

Provide educational navigation and an appointment CTA.

It must not:

diagnose

prescribe

predict outcome

claim certainty

14. First Visit

Explain:

01 Consultation → 02 Assessment → 03 Care Plan → 04 Follow-up

Use practitioner-approved wording.

15. Reviews

Only genuine reviews may be displayed.

Show:

review text

approved name/initials

date where useful

source where useful

Do not fabricate or misleadingly edit testimonials.

16. Gallery

Prefer authentic:

clinic exterior

reception

treatment area

equipment

doctor

clinic environment

Patient images require appropriate consent.

17. FAQ

Cover:

first visit

consultation duration

previous reports

what to wear

booking

location

clinic hours

services

visit frequency questions

general suitability questions

Use an accessible accordion.

18. Appointment Form

Required:

name

phone

preferred date

preferred time

Optional:

main concern

message

MVP flow:

Validate → Generate WhatsApp message → Open WhatsApp

No database is required.

Do not collect detailed medical history through the public form.

19. WhatsApp

WhatsApp must be available in:

header

hero

service pages

contact

appointment page

mobile bottom bar

final CTA

Example message:

Hi Dr Hashi, I found your website and would like to book an appointment. Name: ___ Preferred Date: ___ Preferred Time: ___ Main Concern: ___

Do not include unnecessary sensitive health information in the generated URL.

20. Phone

Use a clickable tel: link and show it in the header, hero, contact, footer and mobile CTA.

21. Location

Display:

full verified address

Google Maps/directions

opening hours

phone

WhatsApp

parking/landmark information only if verified

22. Mobile

Mobile-first is mandatory.

Support at least:

320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px.

No horizontal scrolling.

Fixed mobile CTA:

Call | WhatsApp | Book

23. Design

Desired style:

modern

clean

calm

professional

premium but approachable

trustworthy

human

Avoid:

excessive gradients

excessive animations

generic stock photography where real clinic imagery is available

fear-based medical copy

fake urgency

24. Accessibility

Target WCAG 2.2 AA.

Required:

semantic HTML

keyboard navigation

visible focus states

accessible forms

alt text

sufficient contrast

accessible mobile menu

accessible accordion

reduced-motion support

25. SEO

For every indexable route:

unique title

meta description

canonical URL

Open Graph metadata

correct H1/H2/H3 hierarchy

internal links

semantic HTML

Also provide:

sitemap.xml

robots.txt

appropriate local-business structured data

Because this is a Vite SPA, SEO should be tested carefully. If organic search becomes a major acquisition channel, prerendering/static generation can be added later without changing the UI architecture.

26. Performance

Targets:

Metric

Target

LCP

< 2.5s

INP

< 200ms

CLS

< 0.1

Lighthouse Performance

90+ target

Requirements:

optimized WebP/AVIF images

lazy loading below fold

limited JavaScript

code splitting where useful

minimal dependencies

no unnecessary third-party scripts

27. Analytics

Optional for MVP, recommended for production.

Track:

whatsapp_click
phone_click
book_click
appointment_form_start
appointment_form_submit
directions_click
service_click
condition_selected
faq_open
review_click

Do not send names, phone numbers, detailed symptoms, medical records, or other sensitive health information to analytics.

28. Security

Even without a backend:

never expose private API keys

never put secrets in VITE_*

validate user input

avoid unsafe HTML injection

keep dependencies updated

use HTTPS in production

Important: Vite VITE_* variables are public client-side configuration.

29. Privacy and Legal

Required pages:

Privacy Policy

Medical Disclaimer

If analytics/cookies are enabled, implement the consent approach required for the target jurisdiction and services used.

30. Browser Support

Current versions of:

Chrome

Edge

Firefox

Safari

iOS Safari

Android Chrome

31. Testing

Unit/component

Vitest + React Testing Library.

Test:

form validation

WhatsApp URL generation

concern finder

navigation

FAQ

CTA components

E2E

Playwright.

Test:

Home → Services → Condition → Book → WhatsApp

Also test mobile navigation, form errors, and external links.

32. Code Quality

TypeScript strict mode

ESLint

Prettier

reusable components

data-driven UI

clear naming

no duplicated UI

no unnecessary global state

Do not introduce Redux unless future requirements genuinely justify it.

33. Deployment

Recommended:

GitHub → Vercel → Custom Domain → HTTPS

Netlify is an acceptable alternative.

34. Content Required Before Launch

Clinic

official name

phone

WhatsApp

email

address

opening hours

Google Maps link

Google Business Profile

social profiles

Doctor

full name

photo

qualifications

certifications

experience

biography

languages

professional memberships

Services

final service list

practitioner-approved descriptions

approved terminology

Media

logo

clinic photos

doctor photos

equipment photos

Reviews

genuine reviews

source

required permission/approval

35. MVP Scope

Must Have

React

Vite

TypeScript

Tailwind

responsive UI

header

hero

services

conditions

doctor profile

reviews

FAQ

contact

maps

WhatsApp

phone

appointment form

mobile sticky CTA

SEO metadata

accessibility

privacy/disclaimer

Nice to Have

concern finder

gallery lightbox

subtle motion

Google Business review link

36. Future Scope

Do not build initially:

backend

database

authentication

patient portal

EMR

real-time appointment engine

CRM

AI diagnosis

online medical consultation

prescription system

Add these only if actual business requirements emerge.

37. Acceptance Criteria

UX

visitor understands clinic purpose immediately

primary CTA is obvious

WhatsApp is one tap away on mobile

phone is one tap away

appointment flow is simple

navigation is intuitive

UI

responsive across target sizes

consistent design system

no broken layouts

no horizontal scrolling

authentic imagery used where available

animations are subtle

Functionality

all routes work

mobile menu works

FAQ works

concern finder works

appointment form validates

WhatsApp opens correctly

phone link works

maps work

Quality

no critical console errors

production build succeeds

accessibility reviewed

SEO metadata exists

images optimized

major browsers tested

Content

no placeholder content

doctor details verified

clinic details verified

services verified

reviews genuine

legal pages present

38. Final Stack

React.js
Vite
TypeScript
Tailwind CSS
React Router
Lucide React
Motion
React Hook Form
Zod
React Helmet Async
Vitest
React Testing Library
Playwright
GitHub
Vercel

39. Expanded UX & Feature Enhancements

1. Electronic City IT Desk Worker Ergonomic & Desk Stretch Hub
   - Interactive modal with 3-minute doctor-approved desk worker stretches
   - Ergonomic workstation setup checklist for IT professionals

2. Interactive First Visit Preparation Checklist & Timeline
   - Step-by-step visual consultation timeline
   - Interactive "What to bring" (MRIs/X-Rays) and "What to wear" guidance

3. Electronic City Landmark & Transit Distance Bar
   - Distance indicators from Infosys Gate 1, Wipro Campus, Neeladri Circle, and E-City Metro

4. Patient Review Category Tag Filtering
   - Interactive filtering by concern category (Back Pain, Neck Care, Sciatica, Posture)
   - Verified Google Maps review attribution badges

5. 1-Click "Add to Calendar" Appointment Reminder
   - Auto-generated Google Calendar links and downloadable `.ics` files upon appointment request

6. Schema.org JSON-LD LocalBusiness & Physician SEO Integration
   - Structured metadata script injection for rich search result snippets in Electronic City

The first release remains a frontend-only application.