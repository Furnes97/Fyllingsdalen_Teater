export interface Review {
  score: number; // Dice score from 1-6
  reviewer: string; // e.g., "BT"
  reviewUrl: string; // URL to the review page
}

export interface ShowContent {
  title: string;
  tagline: string;
  description?: string; // Added description field for homepage short text
  premiere?: string;    // Added premiere field for homepage
  playing_period?: string; // Added playing_period field for homepage
  reviews?: Review[]; // Optional array of reviews with dice scores
  body: string;
  // Optional per-play hero layout controls, editable via markdown frontmatter
  heroAlignTop?: boolean;
}

export interface Benefit {
  title: string;
  icon: string;
  description: string;
}

export interface GroupContent {
  heading: string;
  subheading: string;
  image?: string; // Added optional image field
  benefits: Benefit[];
  body: string;
}

export interface ShowDate {
  date: string;
  time: string;
  status: 'available' | 'few_left' | 'sold_out';
}

export interface RecurringScheduleItem {
  day: string;
  time: string;
}

export interface RecurringSchedule {
  period: string;
  schedule: RecurringScheduleItem[];
}

export interface DatesContent {
  heading: string;
  contact_phone: string;
  contact_email: string;
  shows?: ShowDate[];
  recurring?: RecurringSchedule;
  body: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}
