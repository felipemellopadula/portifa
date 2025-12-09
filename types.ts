// src/types.ts

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  // --- CORREÇÃO: Adicionada a propriedade opcional className ---
  className?: string; 
}

export interface MediaSection {
  layout: 'full' | 'grid' | 'columns-4' | 'carousel-split' | 'audio';
  items: MediaItem[];
  audioUrl?: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface Project {
  id: string;
  year: string;
  role: string;
  title: string;
  color: string;
  
  detailBg?: string; 
  isDarkText?: boolean; 

  agency?: string;
  client: string;
  description: string;
  technicalDetails?: string[];
  testimonial?: Testimonial;
  mediaSections: MediaSection[];
}