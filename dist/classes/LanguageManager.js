/**
 * LanguageManager handles language switching functionality
 */
export class LanguageManager {
    constructor(initialLanguage = 'en') {
        this.currentLanguage = 'en';
        this.currentLanguage = initialLanguage;
    }
    /**
     * Toggle between English and Chinese
     */
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'zh' : 'en';
        this.updateLanguage();
    }
    /**
     * Set specific language
     */
    setLanguage(language) {
        this.currentLanguage = language;
        this.updateLanguage();
    }
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    /**
     * Update all language-dependent elements on the page
     */
    updateLanguage() {
        const elements = document.querySelectorAll('[data-zh][data-en]');
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
    init() {
        this.updateLanguage();
    }
}
//# sourceMappingURL=LanguageManager.js.map
