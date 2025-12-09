// src/types.ts

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
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
  color: string; // Cor usada na Home/Lista
  
  // NOVAS PROPRIEDADES
  detailBg?: string; // Cor de fundo específica da página interna (ex: #FBEFEF)
  isDarkText?: boolean; // Se true, inverte o texto para escuro (para fundos claros)

  agency?: string;
  client: string;
  description: string;
  technicalDetails?: string[];
  testimonial?: Testimonial;
  mediaSections: MediaSection[];
}