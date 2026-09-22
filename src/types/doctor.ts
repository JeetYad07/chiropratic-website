export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string[];
  experienceYears: number;
  bio: string;
  specialties: string[];
  languages: string[];
  memberships: string[];
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
