export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "First Visit" | "Services" | "Booking & Location";
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "First Visit",
    question: "What should I expect during my first chiropractic consultation?",
    answer: "Your initial visit includes a comprehensive physical assessment where Dr Shinto Thomas listens to your health history, examines posture and joint range of motion, performs targeted orthopedic/neurological tests, and explains your customized care plan before gentle treatment."
  },
  {
    id: "faq-2",
    category: "General",
    question: "Is chiropractic treatment safe?",
    answer: "Yes, chiropractic adjustments are non-invasive, safe, and tailored specifically to your body type, age, and comfort level. Dr Thomas carefully screens every patient to ensure chiropractic care is suitable for your condition."
  },
  {
    id: "faq-3",
    category: "First Visit",
    question: "What should I wear to my chiropractic appointment?",
    answer: "Wear comfortable, loose-fitting attire or athletic wear (like t-shirts, track pants, or leggings) that allows full flexibility and free movement during joint mobility checks."
  },
  {
    id: "faq-4",
    category: "Booking & Location",
    question: "Where is Dr Hashi Chiropractic located in Electronic City?",
    answer: "We are located at 13th Cross, Neeladri Rd, Electronic City, Doddathoguru, Bengaluru (above Cavanio Family Salon). Ample street and building parking is available nearby."
  },
  {
    id: "faq-5",
    category: "Booking & Location",
    question: "Do I need a doctor's referral to book an appointment?",
    answer: "No referral is needed! You can directly request an appointment via WhatsApp or phone call at +91 96450 10120."
  },
  {
    id: "faq-6",
    category: "Services",
    question: "Do chiropractic adjustments hurt or pop loud?",
    answer: "Chiropractic adjustments are generally pain-free. Any popping or cracking sound is simply gas bubbles releasing from joint capsule pressure (similar to cracking knuckles) and is completely natural."
  },
  {
    id: "faq-7",
    category: "Services",
    question: "Can chiropractic care help IT professionals with desk posture?",
    answer: "Definitely! A majority of our patients in Electronic City work long hours at computers. We focus on tech-neck relief, forward-head posture correction, and shoulder tension release."
  },
  {
    id: "faq-8",
    category: "General",
    question: "Should I bring previous X-rays or MRI reports?",
    answer: "If you have recent medical imaging reports (X-rays, MRI scans, or spine reports from the last 1–2 years), please bring them along to your first consultation."
  }
];
