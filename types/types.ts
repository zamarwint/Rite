export interface FeatureCard {
  id: string;
  title: string;
  headline: string;
  body: string;
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  publication?: string;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
  documentId?: string;
  dueDate?: string;
}

export interface DocumentEntry {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  folder: string;
  tags: string[];
  wordCount: number;
  isFavorite?: boolean;
}

export interface WorkspaceFolder {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface WireframeSectionSpec {
  id: string;
  sectionName: string;
  designNotes: string[];
  headline: string;
  subHeadline?: string;
  ctaText?: string;
  microCopy?: string;
  keyElements: string[];
}

