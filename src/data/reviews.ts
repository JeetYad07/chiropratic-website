export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  highlightTag: string;
  source: string;
}

export const reviewsData: Testimonial[] = [
  {
    id: "rev-1",
    name: "Sudesh Ganjoo",
    role: "Verified Patient",
    rating: 5,
    date: "3 months ago",
    comment: "Excellent, I had cervical pain from last 5 years, took physiotherapy treatment for 21 days, nothing worked, now after taking a session at Dr Hashi Chiropractic, now I am rid of that pain.",
    highlightTag: "Cervical Pain Relief",
    source: "Google Review"
  },
  {
    id: "rev-2",
    name: "Mansoor Ahmed",
    role: "Local Guide (34 reviews)",
    rating: 5,
    date: "1 month ago",
    comment: "Had a great experience at Hashi Chiropractic. Dr. Hashi was very professional, knowledgeable, and took the time to understand my concerns and explain the treatment clearly. The session was comfortable, and I felt a noticeable improvement afterward. Highly recommend Dr. Hashi and the team for their excellent care and professionalism!",
    highlightTag: "Full Body Alignment",
    source: "Google Review"
  },
  {
    id: "rev-3",
    name: "Sibasish Mohapatra",
    role: "Local Guide (40 reviews)",
    rating: 5,
    date: "6 months ago",
    comment: "Thanks Dr Shinto Thomas. Really good session and informative one. I was having this upper body pain, around my neck and shoulder.",
    highlightTag: "Neck & Shoulder Pain",
    source: "Google Review"
  },
  {
    id: "rev-4",
    name: "Ananya R.",
    role: "Software Engineer, Electronic City",
    rating: 5,
    date: "2 months ago",
    comment: "Working 9-10 hours on laptop caused severe lower back stiffness. Dr Shinto's adjustment techniques gave me instant mobility. The posture guidance was extremely practical.",
    highlightTag: "Back Pain Relief",
    source: "Google Review"
  },
  {
    id: "rev-5",
    name: "Vikram P.",
    role: "Verified Patient",
    rating: 5,
    date: "4 months ago",
    comment: "Sciatica pain was bothering me while driving. After 3 targeted chiropractic sessions, the radiating numbness has completely cleared up.",
    highlightTag: "Sciatica Relief",
    source: "Google Review"
  }
];
