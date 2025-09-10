// 語言切換功能
let currentLanguage = 'zh';

document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
            updateLanguage();
            updateToggleButton();
        });
    }
    
    // 初始化語言
    updateLanguage();
    updateToggleButton();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        if (currentLanguage === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
}

function updateToggleButton() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'zh' ? 'EN' : '中文';
    }
}

// 導航列滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 漢堡選單切換
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 點擊導航連結時關閉漢堡選單
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 滾動動畫
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 觀察需要動畫的元素
document.querySelectorAll('.about, .portfolio, .contact').forEach(section => {
    observer.observe(section);
});

// 聯絡表單處理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 獲取表單數據
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // 簡單的表單驗證
        if (!name || !email || !subject || !message) {
            alert(currentLanguage === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields');
            return;
        }
        
        // 這裡可以添加實際的表單提交邏輯
        alert(currentLanguage === 'zh' ? '感謝您的訊息！我會盡快回覆。' : 'Thank you for your message! I will get back to you soon.');
        
        // 重置表單
        this.reset();
    });
}
