export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  relatedConditions: string[];
}

export const servicesData: Service[] = [
  {
    id: "full-body-alignment",
    slug: "full-body-alignment",
    title: "Full Body Alignment",
    shortDescription: "Comprehensive spinal and joint mobilization to restore natural body symmetry and movement balance.",
    fullDescription: "Gentle, targeted chiropractic adjustments aimed at restoring proper vertebral positioning, easing neural pressure, and optimizing body mechanics from neck to pelvis.",
    iconName: "Activity",
    benefits: [
      "Restores natural joint range of motion",
      "Reduces nerve compression and joint strain",
      "Improves daily functional movement and energy",
      "Enhances overall spinal posture"
    ],
    relatedConditions: ["back-pain", "neck-pain", "sciatica"]
  },
  {
    id: "cervical-neck-care",
    slug: "cervical-neck-care",
    title: "Cervical Spine & Neck Care",
    shortDescription: "Specialized relief for cervical stiffness, desk-work strain, tension headaches, and neck immobility.",
    fullDescription: "Tailored cervical realignment designed to alleviate neck tightness, upper spine tension, and radiating shoulder stiffness caused by desk posture or sudden strain.",
    iconName: "UserCheck",
    benefits: [
      "Relieves chronic upper back & neck stiffness",
      "Eases tension headaches & cervicogenic pain",
      "Restores head turning and neck flexibility",
      "Reduces muscle spasms in shoulder blade region"
    ],
    relatedConditions: ["neck-pain", "shoulder-pain"]
  },
  {
    id: "lower-back-pain-relief",
    slug: "lower-back-pain-relief",
    title: "Lower Back Pain Relief",
    shortDescription: "Targeted lumbar spinal therapy for acute strain, chronic lumbar stiffness, and posture imbalance.",
    fullDescription: "Precise lumbar spinal alignment and tissue mobilization to release compressed discs, reduce lower back aching, and improve bending and sitting comfort.",
    iconName: "ShieldCheck",
    benefits: [
      "Alleviates lumbar stiffness and shooting aches",
      "Improves sitting and standing endurance",
      "Promotes optimal intervertebral disc health",
      "Strengthens spinal stabilization muscles"
    ],
    relatedConditions: ["back-pain", "sciatica"]
  },
  {
    id: "sciatica-therapy",
    slug: "sciatica-therapy",
    title: "Sciatica & Nerve Relief",
    shortDescription: "Targeted decompression and pelvic alignment to ease sharp leg pain and nerve irritation.",
    fullDescription: "Non-invasive pelvic and lower lumbar adjustments aimed at easing pressure on the sciatic nerve pathway, reducing radiating thigh and leg numbness.",
    iconName: "Zap",
    benefits: [
      "Reduces sharp sciatic nerve radiation down leg",
      "Relieves piriformis and gluteal muscle tightness",
      "Improves comfortable walking and sleeping positions",
      "Restores lower extremity reflex and mobility"
    ],
    relatedConditions: ["sciatica", "back-pain"]
  },
  {
    id: "posture-correction",
    slug: "posture-correction",
    title: "Posture Correction & Ergonomics",
    shortDescription: "Structural realignment paired with ergonomic guidance for IT professionals and desk workers.",
    fullDescription: "Comprehensive postural assessment identifying forward-head carriage, rounded shoulders, and pelvic tilts, followed by spinal adjustments and desk ergonomic advice.",
    iconName: "Sparkles",
    benefits: [
      "Corrects tech-neck and forward head posture",
      "Prevents repetitive strain injuries from long sitting",
      "Provides personalized office desk ergonomic tips",
      "Improves breathing mechanics and spinal tallness"
    ],
    relatedConditions: ["neck-pain", "shoulder-pain", "back-pain"]
  },
  {
    id: "sports-rehab",
    slug: "sports-rehab",
    title: "Sports Injury & Joint Mobilization",
    shortDescription: "Functional joint care to accelerate recovery, improve flexibility, and prevent athletic strain.",
    fullDescription: "Restores optimal joint tracking in shoulders, knees, hips, and ankles for active individuals, gym-goers, and sports enthusiasts.",
    iconName: "Flame",
    benefits: [
      "Accelerates post-exercise joint recovery",
      "Restores rotational flexibility and power",
      "Corrects micro-alignments caused by repetitive strain",
      "Enhances athletic performance naturally"
    ],
    relatedConditions: ["sports-injuries", "knee-pain", "shoulder-pain"]
  }
];
