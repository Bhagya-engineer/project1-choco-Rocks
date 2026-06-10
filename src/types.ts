export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ChoiceFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  priceEstimate: string;
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  image: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  detailedInfo: string;
}

export interface InquiryLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  message: string;
  createdAt: string;
  ratingStars?: number;
  customBoxConfig?: {
    slotsCount: number;
    flavors: string[];
    packaging: string;
    customMessage: string;
  };
}

export type ThemeMode = 'classic-cream' | 'midnight-cocoa';
