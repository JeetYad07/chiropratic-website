export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string[];
  experienceYears: number;
  specialties: string[];
  languages: string[];
  bio: string;
  philosophy: string;
  certifications: string[];
}

export const doctorProfile: DoctorProfile = {
  name: "Dr Shinto Thomas",
  title: "Lead Chiropractor & Spine Wellness Specialist",
  qualifications: [
    "Certified Chiropractic Practitioner",
    "Spinal Alignment & Manual Therapy Specialist",
    "Postural Correction & Rehabilitation Expert"
  ],
  experienceYears: 8,
  specialties: [
    "Full Body Alignment",
    "Cervical Spondylitis & Neck Pain Relief",
    "Lower Back Pain & Lumbar Care",
    "Sciatica Relief Therapy",
    "Sports Injury & Joint Rehabilitation"
  ],
  languages: ["English", "Hindi", "Malayalam", "Kannada"],
  bio: "Dr Shinto Thomas (Dr Hashi) is a dedicated chiropractic specialist practicing in Electronic City, Bangalore. Known for his compassionate and thorough clinical assessments, Dr Thomas focuses on identifying the root causes of musculoskeletal pain rather than temporary symptom management. He provides precise full-body spinal alignments, neck and shoulder relief sessions, and ergonomic counseling to restore natural mobility.",
  philosophy: "We believe in a holistic, patient-centered care approach that combines hands-on joint adjustments, posture correction, and tailored exercise education to empower long-term pain relief without unnecessary reliance on medications.",
  certifications: [
    "Advanced Manual Spinal Therapy",
    "Posture & Ergonomics Rehabilitation",
    "Myofascial Release & Joint Mobilization"
  ]
};
