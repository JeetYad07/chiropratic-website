export interface Condition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  symptoms: string[];
  causes: string[];
  careApproach: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}
