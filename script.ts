// TypeScript 介面定義
interface NavLink {
    element: HTMLAnchorElement;
    section: HTMLElement;
    id: string;
}

interface PortfolioItem {
    element: HTMLElement;
    image: HTMLImageElement;
    overlay: HTMLElement;
    category: string;
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface AnimationConfig {
    threshold: number;
    rootMargin: string;
}

// 主要應用程式類別
class PersonalWebsite {
    private navbar: HTMLElement;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private sections: NodeListOf<HTMLElement>;
    private hamburger: HTMLElement;
    private navMenu: HTMLElement;
    private contactForm: HTMLFormElement;
    private portfolioItems: NodeListOf<HTMLElement>;
    private scrollElements: NodeListOf<HTMLElement>;
    private heroTitle: HTMLElement;
    private heroSubtitle: HTMLElement;
    private heroDescription: HTMLElement;
    private heroButtons: HTMLElement;

    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollAnimations();
        this.setupPortfolioAnimations();
        this.setupParallaxEffects();
        this.setupMoriyamaEffects();
    }

    // 初始化 DOM 元素
    private initializeElements(): void {
        this.navbar = document.getElementById('navbar') as HTMLElement;
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.hamburger = document.getElementById('hamburger') as HTMLElement;
        this.navMenu = document.getElementById('nav-menu') as HTMLElement;
        this.contactForm = document.getElementById('contactForm') as HTMLFormElement;
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.scrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        this.heroTitle = document.querySelector('.hero-title') as HTMLElement;
        this.heroSubtitle = document.querySelector('.hero-subtitle') as HTMLElement;
        this.heroDescription = document.querySelector('.hero-description') as HTMLElement;
        this.heroButtons = document.querySelector('.hero-buttons') as HTMLElement;
    }

    // 設置事件監聽器
    private setupEventListeners(): void {
        // 滾動事件
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // 導航連結點擊事件
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // 漢堡選單點擊事件
        this.hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));

        // 聯絡表單提交事件
        this.contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));

        // 視窗大小改變事件
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // 平滑滾動設置
        this.setupSmoothScrolling();

        // 作品集項目懸停事件
        this.setupPortfolioHoverEffects();
    }

    // 處理滾動事件
    private handleScroll(): void {
        const scrollY = window.scrollY;
        
        // 導航列背景變化
        this.updateNavbarBackground(scrollY);
        
        // 更新當前導航項目
        this.updateActiveNavItem();
        
        // 滾動動畫
        this.animateOnScroll();
        
        // Hero 區塊視差效果
        this.updateHeroParallax(scrollY);
    }

    // 更新導航列背景
    private updateNavbarBackground(scrollY: number): void {
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    // 更新當前導航項目
    private updateActiveNavItem(): void {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // 移除所有活動狀態
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加當前活動狀態
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`) as HTMLAnchorElement;
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Hero 區塊視差效果
    private updateHeroParallax(scrollY: number): void {
        const hero = document.querySelector('.hero') as HTMLElement;
        if (hero && scrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
    }

    // 處理導航點擊
    private handleNavClick(event: Event): void {
        event.preventDefault();
        const target = event.target as HTMLAnchorElement;
        const targetId = target.getAttribute('href')?.substring(1);
        
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考慮導航列高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        // 關閉行動選單
        this.closeMobileMenu();
    }

    // 切換行動選單
    private toggleMobileMenu(): void {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    // 關閉行動選單
    private closeMobileMenu(): void {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    // 處理視窗大小改變
    private handleResize(): void {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // 設置平滑滾動
    private setupSmoothScrolling(): void {
        // 為所有內部連結添加平滑滾動
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href')!) as HTMLElement;
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 初始化動畫
    private initializeAnimations(): void {
        // 為元素添加動畫類別
        this.addAnimationClasses();
        
        // 初始化技能項目動畫
        this.initializeSkillAnimations();
    }

    // 添加動畫類別
    private addAnimationClasses(): void {
        // 為不同區塊添加動畫類別
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        const skillsSection = document.querySelector('.skills-section');
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');

        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutImage) aboutImage.classList.add('slide-in-right');
        if (skillsSection) skillsSection.classList.add('fade-in');
        if (contactInfo) contactInfo.classList.add('slide-in-left');
        if (contactForm) contactForm.classList.add('slide-in-right');

        // 為技能項目添加淡入動畫
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.classList.add('fade-in');
            (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
        });

        // 為作品集項目添加動畫
        this.portfolioItems.forEach((item, index) => {
            item.classList.add('fade-in');
            (item as HTMLElement).style.animationDelay = `${index * 0.2}s`;
        });
    }

    // 初始化技能動畫
    private initializeSkillAnimations(): void {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.animateSkillItem(item as HTMLElement);
            });
        });
    }

    // 技能項目動畫
    private animateSkillItem(item: HTMLElement): void {
        item.style.transform = 'translateY(-10px) scale(1.05)';
        item.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            item.style.transform = 'translateY(-5px) scale(1)';
        }, 300);
    }

    // 設置滾動動畫
    private setupScrollAnimations(): void {
        // 使用 Intersection Observer 來檢測元素是否進入視窗
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.scrollElements.forEach(element => {
            observer.observe(element);
        });
    }

    // 滾動動畫
    private animateOnScroll(): void {
        this.scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // 設置作品集動畫
    private setupPortfolioAnimations(): void {
        this.portfolioItems.forEach(item => {
            const image = item.querySelector('.portfolio-image img') as HTMLImageElement;
            const overlay = item.querySelector('.portfolio-overlay') as HTMLElement;
            
            if (image && overlay) {
                // 圖片載入動畫
                image.addEventListener('load', () => {
                    image.style.opacity = '0';
                    image.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 100);
                });

                // 懸停動畫
                item.addEventListener('mouseenter', () => {
                    this.animatePortfolioItem(item, image, overlay, true);
                });

                item.addEventListener('mouseleave', () => {
                    this.animatePortfolioItem(item, image, overlay, false);
                });
            }
        });
    }

    // 作品集項目動畫
    private animatePortfolioItem(item: HTMLElement, image: HTMLImageElement, overlay: HTMLElement, isHover: boolean): void {
        if (isHover) {
            // 懸停進入
            item.style.transform = 'translateY(-10px)';
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
            
            // 添加懸停音效（可選）
            this.playHoverSound();
        } else {
            // 懸停離開
            item.style.transform = 'translateY(0)';
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        }
    }

    // 懸停音效（可選功能）
    private playHoverSound(): void {
        // 這裡可以添加音效，但需要音效檔案
        // const audio = new Audio('hover-sound.mp3');
        // audio.volume = 0.1;
        // audio.play().catch(() => {}); // 忽略錯誤
    }

    // 設置作品集懸停效果
    private setupPortfolioHoverEffects(): void {
        this.portfolioItems.forEach(item => {
            // 添加點擊效果
            item.addEventListener('click', () => {
                this.handlePortfolioClick(item);
            });

            // 鍵盤導航支援
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handlePortfolioClick(item);
                }
            });

            // 設置可聚焦
            item.setAttribute('tabindex', '0');
        });
    }

    // 處理作品集點擊
    private handlePortfolioClick(item: HTMLElement): void {
        const title = item.querySelector('h3')?.textContent;
        const description = item.querySelector('p')?.textContent;
        
        // 創建模態框或導航到詳細頁面
        this.showPortfolioModal(title || '', description || '');
    }

    // 顯示作品集模態框
    private showPortfolioModal(title: string, description: string): void {
        // 創建模態框
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">查看專案</button>
                        <button class="btn btn-secondary">關閉</button>
                    </div>
                </div>
            </div>
        `;

        // 添加樣式
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = modal.querySelector('.modal-content') as HTMLElement;
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(modal);

        // 動畫顯示
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // 關閉模態框
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
    }

    // 處理表單提交
    private handleFormSubmit(event: Event): void {
        event.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const contactData: ContactFormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string
        };

        // 驗證表單
        if (this.validateForm(contactData)) {
            this.submitForm(contactData);
        }
    }

    // 驗證表單
    private validateForm(data: ContactFormData): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name.trim()) {
            this.showMessage('請輸入您的姓名', 'error');
            return false;
        }
        
        if (!data.email.trim() || !emailRegex.test(data.email)) {
            this.showMessage('請輸入有效的 Email 地址', 'error');
            return false;
        }
        
        if (!data.subject.trim()) {
            this.showMessage('請輸入主旨', 'error');
            return false;
        }
        
        if (!data.message.trim()) {
            this.showMessage('請輸入您的訊息', 'error');
            return false;
        }
        
        return true;
    }

    // 提交表單
    private submitForm(data: ContactFormData): void {
        // 模擬表單提交
        this.showMessage('訊息發送中...', 'info');
        
        setTimeout(() => {
            this.showMessage('訊息已成功發送！我會盡快回覆您。', 'success');
            this.contactForm.reset();
        }, 2000);
    }

    // 顯示訊息
    private showMessage(message: string, type: 'success' | 'error' | 'info'): void {
        // 移除現有訊息
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 創建新訊息
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // 添加樣式
        messageDiv.style.cssText = `
            padding: 15px 25px;
            margin: 1rem 0;
            border-radius: 10px;
            font-weight: 500;
            text-align: center;
            transition: all 0.3s ease;
            animation: slideInDown 0.3s ease;
        `;

        // 根據類型設置顏色
        switch (type) {
            case 'success':
                messageDiv.style.background = 'rgba(39, 174, 96, 0.2)';
                messageDiv.style.color = '#27ae60';
                messageDiv.style.border = '1px solid rgba(39, 174, 96, 0.3)';
                break;
            case 'error':
                messageDiv.style.background = 'rgba(231, 76, 60, 0.2)';
                messageDiv.style.color = '#e74c3c';
                messageDiv.style.border = '1px solid rgba(231, 76, 60, 0.3)';
                break;
            case 'info':
                messageDiv.style.background = 'rgba(52, 152, 219, 0.2)';
                messageDiv.style.color = '#3498db';
                messageDiv.style.border = '1px solid rgba(52, 152, 219, 0.3)';
                break;
        }

        // 插入到表單中
        this.contactForm.insertBefore(messageDiv, this.contactForm.firstChild);

        // 自動移除訊息
        if (type !== 'info') {
            setTimeout(() => {
                messageDiv.style.animation = 'slideOutUp 0.3s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }, 5000);
        }
    }

    // 添加按鈕懸停效果
    private addButtonHoverEffects(): void {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                (button as HTMLElement).style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                (button as HTMLElement).style.transform = 'translateY(0)';
            });
        });
    }

    // 添加圖片載入動畫
    private addImageLoadAnimation(): void {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
            });
        });
    }

    // 工具函數：節流
    private throttle<T extends (...args: any[]) => any>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean;
        return function (this: any, ...args: Parameters<T>) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 工具函數：防抖
    private debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: number;
        return function (this: any, ...args: Parameters<T>) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // 初始化所有功能
    public init(): void {
        console.log('個人網站已初始化');
        this.addButtonHoverEffects();
        this.addImageLoadAnimation();
        
        // 頁面載入完成後的動畫
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // 添加載入完成的動畫
            this.animateOnLoad();
        });
    }

    // 頁面載入動畫
    private animateOnLoad(): void {
        // Hero 區塊動畫
        if (this.heroTitle) {
            this.heroTitle.style.animation = 'fadeInUp 1s ease 0.5s forwards';
        }
        if (this.heroSubtitle) {
            this.heroSubtitle.style.animation = 'fadeInUp 1s ease 0.7s forwards';
        }
        if (this.heroDescription) {
            this.heroDescription.style.animation = 'fadeInUp 1s ease 0.9s forwards';
        }
        if (this.heroButtons) {
            this.heroButtons.style.animation = 'fadeInUp 1s ease 1.1s forwards';
        }
    }

    // 設置 Parallax 效果
    private setupParallaxEffects(): void {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e: MouseEvent) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;

            // Hero 背景視差效果
            const heroBackground = document.querySelector('.hero-background') as HTMLElement;
            if (heroBackground) {
                heroBackground.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }

            // 作品集項目視差
            this.portfolioItems.forEach((item, index) => {
                const offset = (index % 2 === 0 ? 1 : -1) * 10;
                item.style.transform = `translate(${mouseX * offset}px, ${mouseY * offset}px)`;
            });
        });
    }

    // 森山大道風格特效
    private setupMoriyamaEffects(): void {
        // 圖片淡入效果
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLElement;
                    img.style.animation = 'fadeInGrainy 1.5s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => {
            img.style.opacity = '0';
            imageObserver.observe(img);
        });

        // 隨機故障效果
        setInterval(() => {
            const randomElement = document.querySelector('.hero-title, .section-title') as HTMLElement;
            if (randomElement && Math.random() < 0.1) {
                randomElement.style.animation = 'glitchEffect 0.3s ease';
                setTimeout(() => {
                    randomElement.style.animation = '';
                }, 300);
            }
        }, 5000);

        // 添加噪點動畫
        const noiseElement = document.querySelector('body::before') as HTMLElement;
        if (noiseElement) {
            setInterval(() => {
                noiseElement.style.opacity = `${0.02 + Math.random() * 0.02}`;
            }, 100);
        }
    }
}

// 當 DOM 載入完成時初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
    const website = new PersonalWebsite();
    website.init();
});

// 添加 CSS 動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 導出類別供其他模組使用
export { PersonalWebsite };