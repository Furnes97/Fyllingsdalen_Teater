export interface ShowContent {
  title: string;
  tagline: string;
  body: string;
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

export interface DatesContent {
  heading: string;
  contact_phone: string;
  contact_email: string;
  shows: ShowDate[];
  body: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}
