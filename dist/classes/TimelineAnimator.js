/**
 * TimelineAnimator class handles timeline animations using Intersection Observer
 */
export class TimelineAnimator {
    constructor(options = {}) {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.observer = this.createObserver(options);
        this.init();
    }
    /**
     * Create intersection observer with options
     */
    createObserver(options) {
        const observerOptions = {
            threshold: options.threshold || 0.2,
            rootMargin: options.rootMargin || '0px 0px -50px 0px'
        };
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);
    }
    /**
     * Initialize timeline animations
     */
    init() {
        // Observe all timeline items
        this.timelineItems.forEach(item => {
            this.observer.observe(item);
        });
    }
    /**
     * Cleanup observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
//# sourceMappingURL=TimelineAnimator.js.map
