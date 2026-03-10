// ========================================
// Falling Fruits Animation
// ========================================
const fruits = [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓',
    '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
    '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑',
    '🌽', '🥕', '🫒', '🧄', '🧅', '🥔', '🍠', '🥐'
];

function createFruit() {
    const container = document.getElementById('fruitsContainer');
    const fruit = document.createElement('div');
    fruit.className = 'fruit';
    fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];

    // Random position
    fruit.style.left = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 1.5 + 1.5; // 1.5rem to 3rem
    fruit.style.fontSize = size + 'rem';

    // Random duration
    const duration = Math.random() * 5 + 8; // 8s to 13s
    fruit.style.animationDuration = duration + 's';

    // Random rotation
    const rotation = Math.random() * 360;
    fruit.style.setProperty('--rotation', rotation + 'deg');

    container.appendChild(fruit);

    // Remove fruit after animation
    setTimeout(() => {
        fruit.remove();
    }, duration * 1000);
}

// Start creating fruits
function startFruits() {
    // Create initial fruits
    for (let i = 0; i < 5; i++) {
        setTimeout(createFruit, i * 200);
    }

    // Continuously create new fruits
    setInterval(createFruit, 800);
}

// Start fruits animation when page loads
window.addEventListener('load', startFruits);

// ========================================
// Click Star Burst Effect
// ========================================
const stars = ['⭐', '✨', '💫', '🌟', '⚡', '✴️', '🔯'];

function createStarBurst(x, y) {
    const container = document.getElementById('fruitsContainer');
    const starCount = 12; // 每次点击生成的星星数量

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];

        // Set position at click point
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        // Random angle and distance
        const angle = (i / starCount) * 360;
        const distance = Math.random() * 100 + 50; // 50px to 150px
        const rotation = Math.random() * 360;

        star.style.setProperty('--angle', angle + 'deg');
        star.style.setProperty('--distance', distance + 'px');
        star.style.setProperty('--rotation', rotation + 'deg');

        // Random size
        const size = Math.random() * 1 + 0.8; // 0.8rem to 1.8rem
        star.style.fontSize = size + 'rem';

        // Random animation duration
        const duration = Math.random() * 0.5 + 0.6; // 0.6s to 1.1s
        star.style.animationDuration = duration + 's';

        container.appendChild(star);

        // Remove star after animation
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
}

// Add click event listener to document
document.addEventListener('click', (e) => {
    // Don't trigger on navigation, buttons, or links
    if (e.target.closest('a, button, .nav-menu, .lang-toggle, .contact-card')) {
        return;
    }

    createStarBurst(e.clientX, e.clientY);
});

// ========================================
// Language Switching
// ========================================
let currentLang = 'zh';

function switchLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-zh][data-en]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Preserve child elements (like icons) if any
            if (element.children.length > 0) {
                const childHTML = element.innerHTML;
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.textContent = text;
                    }
                });
            } else {
                element.textContent = text;
            }
        }
    });

    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('.lang-text');
    langText.textContent = lang === 'zh' ? 'EN' : '中文';

    // Save preference to localStorage
    localStorage.setItem('preferredLang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// Language toggle button
document.getElementById('langToggle').addEventListener('click', () => {
    switchLanguage(currentLang === 'zh' ? 'en' : 'zh');
});

// Check for saved language preference
const savedLang = localStorage.getItem('preferredLang');
if (savedLang) {
    switchLanguage(savedLang);
} else {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
        switchLanguage('en');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ========================================
// Scroll Animations
// ========================================
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .timeline-item, .project-card, .stat-item, .education-item, .contact-link');

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

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
handleScrollAnimations();

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial check

// ========================================
// Typing Effect for Hero (Optional Enhancement)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// Parallax Effect for Hero Background
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;

    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ========================================
// Add loading animation
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 30);
}

// Observe stats for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');

            const text = entry.target.textContent;
            const match = text.match(/(\d+)([+M]?)/);
            if (match) {
                const target = parseInt(match[1]);
                const suffix = match[2] || '';
                entry.target.dataset.suffix = suffix;
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 你好！欢迎查看源代码', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c这个网站使用纯 HTML, CSS 和 JavaScript 构建', 'color: #6b7280; font-size: 14px;');
console.log('%cGitHub: https://github.com/yourusername', 'color: #6b7280; font-size: 12px;');
