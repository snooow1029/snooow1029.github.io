import { TimelineAnimatorOptions } from '../types/index.js';

/**
 * TimelineAnimator class handles timeline animations using Intersection Observer
 */
export class TimelineAnimator {
  private timelineItems: NodeListOf<HTMLElement>;
  private observer: IntersectionObserver;

  constructor(options: TimelineAnimatorOptions = {}) {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.observer = this.createObserver(options);
    this.init();
  }

  /**
   * Create intersection observer with options
   */
  private createObserver(options: TimelineAnimatorOptions): IntersectionObserver {
    const observerOptions: IntersectionObserverInit = {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    };

    return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
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
  private init(): void {
    // Observe all timeline items
    this.timelineItems.forEach(item => {
      this.observer.observe(item);
    });
  }

  /**
   * Cleanup observer
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
