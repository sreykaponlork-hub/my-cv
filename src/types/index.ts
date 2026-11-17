export type Language = 'en' | 'km';

export interface BlogPost {
  id: string;
  title: string;
  title_km?: string;
  slug: string;
  excerpt: string;
  excerpt_km?: string;
  content: string;
  content_km?: string;
  cover_image: string;
  category: string;
  tags: string[];
  author: string;
  created_at: string;
  updated_at?: string;
  published: boolean;
  read_time: string;
  language: 'en' | 'km' | 'both';
  views?: number;
}

export interface Project {
  id: string;
  title: string;
  title_km: string;
  description: string;
  description_km: string;
  category: 'web' | 'mobile' | 'design' | 'fullstack';
  tags: string[];
  image: string;
  demo_url?: string;
  github_url?: string;
  featured: boolean;
  completed_date: string;
}

export interface CVExperience {
  role: string;
  role_km: string;
  company: string;
  period: string;
  period_km: string;
  location: string;
  description: string[];
  description_km: string[];
}

export interface CVEducation {
  degree: string;
  degree_km: string;
  institution: string;
  period: string;
  period_km: string;
  details?: string;
  details_km?: string;
}

export interface CVData {
  name: string;
  name_km: string;
  title: string;
  title_km: string;
  avatar_url?: string;
  email: string;
  phone: string;
  location: string;
  location_km: string;
  portfolio_url: string;
  github_url: string;
  linkedin_url: string;
  summary: string;
  summary_km: string;
  experiences: CVExperience[];
  education: CVEducation[];
  technical_skills: {
    category: string;
    category_km: string;
    skills: string[];
  }[];
  soft_skills: {
    en: string;
    km: string;
  }[];
  languages: {
    language: string;
    language_km: string;
    level?: string;
    level_km?: string;
  }[];
  certifications: {
    name: string;
    name_km: string;
    issuer: string;
    year: string;
  }[];
}

export interface SupabaseConfigState {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  source: 'env' | 'custom' | 'none';
}
