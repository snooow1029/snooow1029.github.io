import { PageFlipper } from './classes/PageFlipper.js';
import { TimelineAnimator } from './classes/TimelineAnimator.js';
import { LanguageManager } from './classes/LanguageManager.js';

/**
 * Main application entry point
 */
class PortfolioApp {
  private pageFlipper: PageFlipper;
  private timelineAnimator: TimelineAnimator;
  private languageManager: LanguageManager;

  constructor() {
    this.languageManager = new LanguageManager('en');
    this.pageFlipper = new PageFlipper();
    this.timelineAnimator = new TimelineAnimator();
  }

  /**
   * Initialize the application
   */
  public init(): void {
    // Initialize language manager
    this.languageManager.init();

    // Bind global language toggle function
    (window as any).toggleLanguage = () => {
      this.languageManager.toggleLanguage();
    };
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    this.timelineAnimator.destroy();
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();

  // Store app instance globally for potential cleanup
  (window as any).portfolioApp = app;
});

export { PortfolioApp };
