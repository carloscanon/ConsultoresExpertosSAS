export type Language = 'es' | 'en' | 'pt';
export type ThemeMode = 'dark' | 'light';

export interface GovDataModule {
  id: string;
  title: string;
  category: string;
  icon: string;
  badge?: string;
  description: string;
  keyFeatures: string[];
  businessImpact: string;
  metrics: { label: string; value: string }[];
  demoType: 'lineage' | 'scorecard' | 'catalog' | 'marketplace' | 'observability' | 'security';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  overview: string;
  benefits: string[];
  deliverables: string[];
  supportedTech: string[];
  kpi: { value: string; label: string };
}

export interface DAMADomainQuestion {
  id: number;
  domain: string;
  domainShort: string;
  question: string;
  options: {
    level: number;
    title: string;
    description: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  level: string;
  duration: string;
  format: string;
  category: string;
  badge?: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    experience: string;
  };
  modulesCount: number;
  certification: string;
  upcomingDate: string;
  priceType?: 'free' | 'paid' | 'discount';
  priceValue?: number;
  discountPriceValue?: number;
  accessLink?: string;
  conferenceLink?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  logo: string;
  challenge: string;
  solution: string;
  kpis: { label: string; value: string; change: string }[];
  quote: string;
  author: string;
  role: string;
  year: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  tags: string[];
  aiSummary: string;
  featured?: boolean;
}

export interface CloudPlatform {
  name: string;
  category: string;
  badge: string;
  icon: string;
  description: string;
}
