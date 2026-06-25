
export interface Performance {
  year: number;
  title: string;
  venue: string;
  location: string;
  link?: string;
}

export interface PressArticle {
  quote: string;
  publication: string;
  link?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  w: number;
  h: number;
}

export interface PerformanceHighlight {
  title: string;
  date: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

export interface UpcomingShow {
  dateLabel: string;
  title: string;
  venue: string;
  location: string;
  ticketLink?: string;
  description?: string;
}
