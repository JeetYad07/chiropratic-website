export interface Condition {
  id: string;
  slug: string;
  title: string;
  summary: string;
  symptoms: string[];
  assessmentApproach: string[];
  carePlan: string[];
  whenToSeekEvaluation: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const conditionsData: Condition[] = [
  {
    id: "back-pain",
    slug: "back-pain",
    title: "Lower & Upper Back Pain",
    summary: "Comprehensive assessment and non-invasive spinal care for acute and chronic back discomfort.",
    symptoms: [
      "Dull, aching soreness in lower back after prolonged sitting",
      "Stiffness when standing up from a chair or morning waking",
      "Sharp pain when bending, lifting, or twisting",
      "Muscle tightness along the lumbar spine and pelvic rim"
    ],
    assessmentApproach: [
      "Detailed posture analysis and lumbar spinal palpation",
      "Range-of-motion and joint flexibility testing",
      "Evaluation of ergonomic habits and daily activities"
    ],
    carePlan: [
      "Precision gentle lumbar adjustments to restore joint motion",
      "Pelvic alignment and muscle relaxation techniques",
      "Custom posture exercises to strengthen core support"
    ],
    whenToSeekEvaluation: [
      "Pain persists for more than 5–7 days despite rest",
      "Discomfort restricts daily work, sitting, or sleeping",
      "Back stiffness returns repeatedly during routine activities"
    ],
    faqs: [
      {
        question: "How many sessions are typically required for back pain relief?",
        answer: "Every individual is unique. Many patients notice improved mobility after 1 to 3 sessions, but a customized plan will be discussed during your initial assessment."
      },
      {
        question: "Can chiropractic care help if I work long hours at a desk?",
        answer: "Yes! Desk workers in Electronic City frequently visit us for posture correction and lumbar strain relief caused by extended sitting."
      }
    ]
  },
  {
    id: "neck-pain",
    slug: "neck-pain",
    title: "Neck Pain & Cervical Spondylitis",
    summary: "Targeted cervical spine alignment for stiffness, tech-neck posture, and radiating shoulder tension.",
    symptoms: [
      "Difficulty turning head sideways or tilting up/down",
      "Constant tightness in neck muscles and upper traps",
      "Tension headaches starting at the base of the skull",
      "Radiating soreness into upper back and shoulders"
    ],
    assessmentApproach: [
      "Cervical spine curvature assessment",
      "Neck rotation and side-flexion mobility check",
      "Screening for neck nerve pressure or muscle spasms"
    ],
    carePlan: [
      "Gentle cervical joint mobilization and gentle alignment",
      "Release of tight suboccipital and trapezius muscles",
      "Ergonomic computer monitor and pillow posture advice"
    ],
    whenToSeekEvaluation: [
      "Neck stiffness prevents safe driving or head movement",
      "Discomfort is accompanied by frequent tension headaches",
      "Stiffness worsens after working on laptops or smartphones"
    ],
    faqs: [
      {
        question: "Is cervical adjustment safe and comfortable?",
        answer: "Dr Shinto Thomas uses gentle, controlled mobilization techniques customized to your comfort level."
      }
    ]
  },
  {
    id: "sciatica",
    slug: "sciatica",
    title: "Sciatica & Nerve Irritation",
    summary: "Relief for sharp, radiating pain that travels down the hip, glutes, and legs.",
    symptoms: [
      "Sharp or burning pain extending from lower back down one leg",
      "Numbness, tingling, or 'pins and needles' sensation in thigh or calf",
      "Increased pain when sitting for extended periods or walking",
      "Weakness in leg muscles during walking or standing"
    ],
    assessmentApproach: [
      "Sciatic nerve stretch and neurological mobility testing",
      "Pelvic tilt and sacroiliac (SI) joint inspection",
      "Lumbar spine nerve compression evaluation"
    ],
    carePlan: [
      "Decompressing lower lumbar joints to relieve sciatic nerve pressure",
      "SI joint realignment to balance hip height",
      "Targeted nerve gliding stretches and glute relaxation"
    ],
    whenToSeekEvaluation: [
      "Leg pain interferes with walking, sleeping, or standing",
      "Tingling or numbness travels past the knee into the foot",
      "Self-stretching provides no lasting relief"
    ],
    faqs: [
      {
        question: "How does chiropractic help sciatica without medication?",
        answer: "Chiropractic care focuses on correcting the mechanical spinal misalignments causing physical pressure on the sciatic nerve root."
      }
    ]
  },
  {
    id: "shoulder-pain",
    slug: "shoulder-pain",
    title: "Shoulder & Upper Trapezius Pain",
    summary: "Restoring joint mechanics and shoulder blade positioning for pain-free arm rotation.",
    symptoms: [
      "Pain when reaching overhead, behind back, or lifting objects",
      "Deep ache in shoulder joint or top of shoulder blade",
      "Clicking or popping sensation during arm rotation",
      "Tightness stretching between shoulder and neck"
    ],
    assessmentApproach: [
      "Shoulder girdle range-of-motion testing",
      "Rotator cuff and thoracic spine alignment check",
      "Scapular mobility evaluation"
    ],
    carePlan: [
      "Glenohumeral joint and thoracic spine adjustment",
      "Soft tissue release for rotator cuff and pec minor muscles",
      "Scapular stabilization exercises"
    ],
    whenToSeekEvaluation: [
      "Pain limits arm mobility or sleep on that side",
      "Shoulder stiffness persists after gym or sports activities"
    ],
    faqs: [
      {
        question: "Can shoulder pain be caused by a neck issue?",
        answer: "Yes, nerve roots from the cervical spine supply the shoulder girdle. A thorough assessment checks both neck and shoulder mechanics."
      }
    ]
  },
  {
    id: "knee-pain",
    slug: "knee-pain",
    title: "Knee & Lower Limb Joint Care",
    summary: "Aligning hip, knee, and ankle mechanics to relieve joint pressure and stiffness.",
    symptoms: [
      "Aching around kneecap during stairs or squatting",
      "Joint tightness after walking or long sitting",
      "Uneven weight distribution when standing"
    ],
    assessmentApproach: [
      "Gait assessment and foot arch inspection",
      "Patellar tracking and pelvic balance examination"
    ],
    carePlan: [
      "Knee, hip, and ankle joint mobilization",
      "Quad and hamstring tension balancing"
    ],
    whenToSeekEvaluation: [
      "Knee discomfort recurs during routine walking or stairs"
    ],
    faqs: [
      {
        question: "Why adjust the spine for knee pain?",
        answer: "Pelvic tilts and spinal misalignment alter how weight transfers down your legs, putting extra stress on one knee."
      }
    ]
  },
  {
    id: "sports-injuries",
    slug: "sports-injuries",
    title: "Sports & Gym Strain Recovery",
    summary: "Helping active individuals recover faster from joint sprains, strains, and overuse.",
    symptoms: [
      "Post-workout joint stiffness or localized muscle soreness",
      "Reduced rotational power or mobility during sports",
      "Recurrent tightness in hamstrings, calves, or shoulders"
    ],
    assessmentApproach: [
      "Biomechanical movement and joint flexibility screening",
      "Functional athletic movement analysis"
    ],
    carePlan: [
      "Joint mobilization and myofascial strain release",
      "Preventative alignment maintenance for active lifestyle"
    ],
    whenToSeekEvaluation: [
      "Minor athletic aches do not resolve with routine rest"
    ],
    faqs: [
      {
        question: "Is chiropractic suitable for recreational athletes?",
        answer: "Absolutely. Chiropractic adjustments keep joints properly aligned to optimize performance and lower strain risk."
      }
    ]
  }
];
