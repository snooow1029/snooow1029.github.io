// Type definitions for the portfolio application

export interface PageFlipperOptions {
  currentPage?: number;
  totalPages?: number;
  isAnimating?: boolean;
}

export interface TimelineAnimatorOptions {
  threshold?: number;
  rootMargin?: string;
}

export type Language = 'en' | 'zh';

export interface LanguageData {
  zh: string;
  en: string;
}

// DOM Element interfaces
export interface PageElement extends HTMLElement {
  dataset: {
    page?: string;
  };
}

export interface LanguageElement extends HTMLElement {
  dataset: {
    zh?: string;
    en?: string;
  };
}
