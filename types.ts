
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
}

export interface ProfessionalExperience {
  role: string;
  company: string;
  period: string;
  description: string[];
}
