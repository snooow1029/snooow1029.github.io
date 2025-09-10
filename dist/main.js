import { PageFlipper } from './classes/PageFlipper.js';
import { TimelineAnimator } from './classes/TimelineAnimator.js';
import { LanguageManager } from './classes/LanguageManager.js';
/**
 * Main application entry point
 */
class PortfolioApp {
    constructor() {
        this.languageManager = new LanguageManager('en');
        this.pageFlipper = new PageFlipper();
        this.timelineAnimator = new TimelineAnimator();
    }
    /**
     * Initialize the application
     */
    init() {
        // Initialize language manager
        this.languageManager.init();
        // Bind global language toggle function
        window.toggleLanguage = () => {
            this.languageManager.toggleLanguage();
        };
    }
    /**
     * Cleanup resources
     */
    destroy() {
        this.timelineAnimator.destroy();
    }
}
// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
    // Store app instance globally for potential cleanup
    window.portfolioApp = app;
});
export { PortfolioApp };
//# sourceMappingURL=main.js.map
