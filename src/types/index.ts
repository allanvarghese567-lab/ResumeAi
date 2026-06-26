// Resume Data Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  profilePhoto?: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description: string;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  order: number;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'elementary' | 'limited' | 'professional' | 'fluent' | 'native';
  order: number;
}

export interface Interest {
  id: string;
  name: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: 'modern' | 'classic' | 'minimal';
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  interests: Interest[];
  createdAt: Date;
  updatedAt: Date;
  completeness: number;
  atsScore?: number;
}

export interface AIRequest {
  type: 'summary' | 'experience' | 'skills' | 'project_description' | 'ats_score' | 'suggestions';
  content: string;
  context?: Record<string, any>;
}

export interface AIResponse {
  success: boolean;
  result?: string;
  suggestions?: string[];
  score?: number;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
