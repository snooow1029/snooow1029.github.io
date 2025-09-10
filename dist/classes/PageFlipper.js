/**
 * PageFlipper class handles page navigation and transitions
 */
export class PageFlipper {
    constructor(options = {}) {
        this.currentPage = options.currentPage || 0;
        this.totalPages = options.totalPages || 4;
        this.isAnimating = options.isAnimating || false;
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.backgroundSlides = document.querySelectorAll('.background-slide');
        this.currentSlide = 0;
        this.init();
    }
    /**
     * Initialize the page flipper
     */
    init() {
        // Hide loading screen
        setTimeout(() => {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.classList.add('hidden');
            }
        }, 1000);
        // Bind events
        this.bindEvents();
        // Initialize page
        this.updateActivePage();
        // Initialize background slideshow
        this.initBackgroundSlideshow();
    }
    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageIndex = parseInt(link.dataset.page || '0');
                this.goToPage(pageIndex);
            });
        });
        // Buttons
        document.querySelectorAll('.btn').forEach(btn => {
            if (btn.dataset.page) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageIndex = parseInt(btn.dataset.page || '0');
                    this.goToPage(pageIndex);
                });
            }
        });
        // Mouse wheel - prioritize content scrolling
        window.addEventListener('wheel', (e) => {
            if (this.isAnimating)
                return;
            // Check if current page has scrollable content
            const currentPageElement = document.querySelector('.page.active .page-content');
            if (currentPageElement) {
                const isScrollable = currentPageElement.scrollHeight > currentPageElement.clientHeight;
                if (isScrollable) {
                    const atTop = currentPageElement.scrollTop === 0;
                    const atBottom = currentPageElement.scrollTop + currentPageElement.clientHeight >= currentPageElement.scrollHeight - 1;
                    // Prioritize content scrolling
                    if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
                        return; // Allow default scroll behavior
                    }
                    // Only switch pages if wheel movement is significant
                    if (Math.abs(e.deltaY) < 50) {
                        return;
                    }
                }
            }
            // Prevent default scroll behavior, execute page switch
            e.preventDefault();
            if (this.wheelTimeout) {
                clearTimeout(this.wheelTimeout);
            }
            this.wheelTimeout = window.setTimeout(() => {
                if (e.deltaY > 0) {
                    this.nextPage();
                }
                else {
                    this.prevPage();
                }
            }, 150);
        }, { passive: false });
        // Keyboard arrow keys
        window.addEventListener('keydown', (e) => {
            if (this.isAnimating)
                return;
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextPage();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevPage();
                    break;
            }
        });
        // Touch gestures (mobile devices)
        let startY = 0;
        let startX = 0;
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        document.addEventListener('touchend', (e) => {
            if (this.isAnimating)
                return;
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const diffY = startY - endY;
            const diffX = startX - endX;
            // Vertical swipe
            if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    this.nextPage();
                }
                else {
                    this.prevPage();
                }
            }
        });
    }
    /**
     * Navigate to a specific page
     */
    goToPage(pageIndex) {
        if (this.isAnimating || pageIndex === this.currentPage)
            return;
        this.isAnimating = true;
        this.currentPage = pageIndex;
        // Update pages
        this.pages.forEach((page, index) => {
            page.classList.remove('active', 'prev', 'next');
            if (index === this.currentPage) {
                page.classList.add('active');
            }
            else if (index < this.currentPage) {
                page.classList.add('prev');
            }
            else {
                page.classList.add('next');
            }
        });
        // Update navigation and indicators
        this.updateActivePage();
        // Reset animation state
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }
    /**
     * Navigate to next page
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.goToPage(this.currentPage + 1);
        }
    }
    /**
     * Navigate to previous page
     */
    prevPage() {
        if (this.currentPage > 0) {
            this.goToPage(this.currentPage - 1);
        }
    }
    /**
     * Update active page indicators
     */
    updateActivePage() {
        // Update navigation links
        this.navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === this.currentPage);
        });
    }
    /**
     * Initialize background slideshow
     */
    initBackgroundSlideshow() {
        if (this.backgroundSlides.length === 0)
            return;
        // Set slideshow interval only on home page
        setInterval(() => {
            // Only switch background on home page
            if (this.currentPage === 0) {
                this.nextBackgroundSlide();
            }
        }, 4000); // Switch every 4 seconds
    }
    /**
     * Switch to next background slide
     */
    nextBackgroundSlide() {
        if (this.backgroundSlides.length === 0)
            return;
        // Remove current active slide
        this.backgroundSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        // Switch to next slide
        this.currentSlide = (this.currentSlide + 1) % this.backgroundSlides.length;
        this.backgroundSlides[this.currentSlide].classList.add('active');
    }
}
//# sourceMappingURL=PageFlipper.js.map
