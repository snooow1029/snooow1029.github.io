import { Language, LanguageElement } from '../types/index.js';

/**
 * LanguageManager handles language switching functionality
 */
export class LanguageManager {
  private currentLanguage: Language = 'en';

  constructor(initialLanguage: Language = 'en') {
    this.currentLanguage = initialLanguage;
  }

  /**
   * Toggle between English and Chinese
   */
  public toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'zh' : 'en';
    this.updateLanguage();
  }

  /**
   * Set specific language
   */
  public setLanguage(language: Language): void {
    this.currentLanguage = language;
    this.updateLanguage();
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Update all language-dependent elements on the page
   */
  private updateLanguage(): void {
    const elements = document.querySelectorAll<LanguageElement>('[data-zh][data-en]');
    const langDisplay = document.getElementById('current-lang');

    elements.forEach(element => {
      const text = this.currentLanguage === 'zh' 
        ? element.dataset.zh 
        : element.dataset.en;
      
      if (text) {
        element.textContent = text;
      }
    });

    if (langDisplay) {
      langDisplay.textContent = this.currentLanguage.toUpperCase();
    }
  }

  /**
   * Initialize language on page load
   */
  public init(): void {
    this.updateLanguage();
  }
}
