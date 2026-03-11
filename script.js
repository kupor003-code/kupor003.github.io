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
// Timeline Card Expand/Collapse
// ========================================
const timelineCards = document.querySelectorAll('.timeline-card');

timelineCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't expand if clicking on links or buttons inside the card
        if (e.target.closest('a, button')) {
            return;
        }

        // Toggle expanded state
        card.classList.toggle('expanded');

        // Close other cards when one is opened (optional - remove if you want multiple open)
        if (card.classList.contains('expanded')) {
            timelineCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
        }
    });
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

// ========================================
// Fishing Game
// ========================================

// Fish Database
const fishDatabase = [
    // Common (普通) - 40% chance
    { id: 1, name: '小丑鱼', icon: '🐠', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },
    { id: 2, name: '蓝唐王鱼', icon: '🐟', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },
    { id: 3, name: '金鱼', icon: '🐡', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },
    { id: 4, name: '热带鱼', icon: '🐠', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },
    { id: 5, name: '孔雀鱼', icon: '🐟', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },
    { id: 6, name: '斗鱼', icon: '🐡', rarity: 'common', rarityText: { zh: '普通', en: 'Common' } },

    // Uncommon (优秀) - 30% chance
    { id: 7, name: '河豚', icon: '🐡', rarity: 'uncommon', rarityText: { zh: '优秀', en: 'Uncommon' } },
    { id: 8, name: '神仙鱼', icon: '🐠', rarity: 'uncommon', rarityText: { zh: '优秀', en: 'Uncommon' } },
    { id: 9, name: '鹦嘴鱼', icon: '🐟', rarity: 'uncommon', rarityText: { zh: '优秀', en: 'Uncommon' } },
    { id: 10, name: '蝴蝶鱼', icon: '🐠', rarity: 'uncommon', rarityText: { zh: '优秀', en: 'Uncommon' } },
    { id: 11, name: '石斑鱼', icon: '🐟', rarity: 'uncommon', rarityText: { zh: '优秀', en: 'Uncommon' } },

    // Rare (稀有) - 20% chance
    { id: 12, name: '锦鲤', icon: '🎏', rarity: 'rare', rarityText: { zh: '稀有', en: 'Rare' } },
    { id: 13, name: '剑鱼', icon: '🐟', rarity: 'rare', rarityText: { zh: '稀有', en: 'Rare' } },
    { id: 14, name: '金枪鱼', icon: '🐟', rarity: 'rare', rarityText: { zh: '稀有', en: 'Rare' } },
    { id: 15, name: '飞鱼', icon: '🐟', rarity: 'rare', rarityText: { zh: '稀有', en: 'Rare' } },
    { id: 16, name: '电鳗', icon: '🐍', rarity: 'rare', rarityText: { zh: '稀有', en: 'Rare' } },

    // Epic (史诗) - 8% chance
    { id: 17, name: '鲨鱼', icon: '🦈', rarity: 'epic', rarityText: { zh: '史诗', en: 'Epic' } },
    { id: 18, name: '鲸鱼', icon: '🐳', rarity: 'epic', rarityText: { zh: '史诗', en: 'Epic' } },
    { id: 19, name: '魔鬼鱼', icon: '🐟', rarity: 'epic', rarityText: { zh: '史诗', en: 'Epic' } },
    { id: 20, name: '海豚', icon: '🐬', rarity: 'epic', rarityText: { zh: '史诗', en: 'Epic' } },

    // Legendary (传说) - 2% chance
    { id: 21, name: '金龙鱼', icon: '🐉', rarity: 'legendary', rarityText: { zh: '传说', en: 'Legendary' } },
    { id: 22, name: '美人鱼', icon: '🧜‍♀️', rarity: 'legendary', rarityText: { zh: '传说', en: 'Legendary' } },
    { id: 23, name: '海神波塞冬', icon: '🔱', rarity: 'legendary', rarityText: { zh: '传说', en: 'Legendary' } },
];

// Game State
const gameState = {
    totalCatches: 0,
    successfulCatches: 0,
    aquarium: JSON.parse(localStorage.getItem('fishingAquarium')) || {},
    isFishing: false,
    wheelRotation: 0,
    targetZoneStart: 0,
    targetZoneEnd: 0,
    currentPower: 0
};

// DOM Elements
const powerWheel = document.getElementById('powerWheel');
const powerValue = document.getElementById('powerValue');
const wheelContainer = document.getElementById('wheelContainer');
const caughtFish = document.getElementById('caughtFish');
const swimmingFishes = document.getElementById('swimmingFishes');
const totalCatchesEl = document.getElementById('totalCatches');
const successRateEl = document.getElementById('successRate');
const rarestFishEl = document.getElementById('rarestFish');
const aquariumModal = document.getElementById('aquariumModal');
const viewAquariumBtn = document.getElementById('viewAquariumBtn');
const closeAquariumBtn = document.getElementById('closeAquariumBtn');
const aquariumContent = document.getElementById('aquariumContent');
const aquariumCount = document.getElementById('aquariumCount');
const aquariumTotal = document.getElementById('aquariumTotal');

// Floating Fishing Game Elements
const floatingFishing = document.getElementById('floatingFishing');
const fishingToggle = document.getElementById('fishingToggle');
const miniFishingGame = document.getElementById('miniFishingGame');
const fishingClose = document.getElementById('fishingClose');
const clickReminder = document.getElementById('clickReminder');

// Canvas setup
const ctx = powerWheel.getContext('2d');
const wheelRadius = powerWheel.width / 2;
const centerX = wheelRadius;
const centerY = wheelRadius;

// Initialize target zone (red zone - 40° range)
gameState.targetZoneStart = 350; // degrees
gameState.targetZoneEnd = 30; // degrees

// Draw the power wheel
function drawWheel() {
    ctx.clearRect(0, 0, powerWheel.width, powerWheel.height);

    // Background gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, wheelRadius);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f0f1e');

    // Draw wheel background
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelRadius - 5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw target zone (red zone)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, wheelRadius - 10,
        (gameState.targetZoneStart - 90) * Math.PI / 180,
        (gameState.targetZoneEnd + 270) * Math.PI / 180
    );
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw power zones
    const zones = [
        { start: gameState.targetZoneEnd, end: 90, color: 'rgba(34, 197, 94, 0.2)' },
        { start: 90, end: 180, color: 'rgba(59, 130, 246, 0.2)' },
        { start: 180, end: 270, color: 'rgba(168, 85, 247, 0.2)' },
        { start: 270, end: gameState.targetZoneStart, color: 'rgba(239, 68, 68, 0.2)' }
    ];

    zones.forEach(zone => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius - 10,
            (zone.start - 90) * Math.PI / 180,
            (zone.end - 90) * Math.PI / 180
        );
        ctx.closePath();
        ctx.fillStyle = zone.color;
        ctx.fill();
    });

    // Draw rotation indicator
    const rotationRad = (gameState.wheelRotation - 90) * Math.PI / 180;
    const indicatorX = centerX + (wheelRadius - 40) * Math.cos(rotationRad);
    const indicatorY = centerY + (wheelRadius - 40) * Math.sin(rotationRad);

    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw power circles
    for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (wheelRadius / 5) * i, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Update wheel animation
let wheelAnimationId;
function updateWheel() {
    // 先取消任何现有的动画，避免多个循环同时运行
    if (wheelAnimationId) {
        cancelAnimationFrame(wheelAnimationId);
    }

    gameState.wheelRotation = (gameState.wheelRotation + 1.5) % 360;
    gameState.currentPower = Math.floor(gameState.wheelRotation);
    powerValue.textContent = gameState.currentPower;
    drawWheel();

    // 检测是否在红色区域并显示/隐藏提醒
    if (clickReminder && !gameState.isFishing) {
        const inTargetZone = isInTargetZone();
        if (inTargetZone) {
            clickReminder.classList.add('show');
        } else {
            clickReminder.classList.remove('show');
        }
    }

    wheelAnimationId = requestAnimationFrame(updateWheel);
}

// Check if current power is in target zone
function isInTargetZone() {
    const power = gameState.currentPower;
    return power >= gameState.targetZoneStart || power <= gameState.targetZoneEnd;
}

// Calculate which fish to catch based on power
function calculateCatch() {
    const random = Math.random() * 100;
    let fish;

    // Determine rarity based on chance
    if (random < 40) {
        // Common (40%)
        const commonFish = fishDatabase.filter(f => f.rarity === 'common');
        fish = commonFish[Math.floor(Math.random() * commonFish.length)];
    } else if (random < 70) {
        // Uncommon (30%)
        const uncommonFish = fishDatabase.filter(f => f.rarity === 'uncommon');
        fish = uncommonFish[Math.floor(Math.random() * uncommonFish.length)];
    } else if (random < 90) {
        // Rare (20%)
        const rareFish = fishDatabase.filter(f => f.rarity === 'rare');
        fish = rareFish[Math.floor(Math.random() * rareFish.length)];
    } else if (random < 98) {
        // Epic (8%)
        const epicFish = fishDatabase.filter(f => f.rarity === 'epic');
        fish = epicFish[Math.floor(Math.random() * epicFish.length)];
    } else {
        // Legendary (2%)
        const legendaryFish = fishDatabase.filter(f => f.rarity === 'legendary');
        fish = legendaryFish[Math.floor(Math.random() * legendaryFish.length)];
    }

    return fish;
}

// Cast fishing line
function castLine() {
    if (gameState.isFishing) return;

    gameState.isFishing = true;

    // Stop wheel animation
    if (wheelAnimationId) {
        cancelAnimationFrame(wheelAnimationId);
        wheelAnimationId = null;
    }

    // Hide click reminder during fishing
    if (clickReminder) {
        clickReminder.classList.remove('show');
    }

    // Check if in target zone
    const success = isInTargetZone();

    if (success) {
        // Successful catch - show fisherman animation
        const fisherman = document.querySelector('.mini-fisherman');
        if (fisherman) {
            fisherman.style.transform = 'scale(1.2) rotate(15deg)';
        }

        setTimeout(() => {
            const fish = calculateCatch();
            showCaughtFish(fish);
            addToAquarium(fish);
            updateStats();

            // Create celebration effect
            createCelebration(success);
        }, 600);
    } else {
        // Failed catch - show miss animation
        const fisherman = document.querySelector('.mini-fisherman');
        if (fisherman) {
            fisherman.style.transform = 'scale(1.2) rotate(-15deg)';
        }

        setTimeout(() => {
            showMissMessage();
            updateStats();
            createCelebration(success);
        }, 600);
    }

    // Reset after animation
    setTimeout(() => {
        const fisherman = document.querySelector('.mini-fisherman');
        if (fisherman) {
            fisherman.style.transform = '';
        }
        caughtFish.classList.remove('show');
        gameState.isFishing = false;

        // 重新启动轮盘旋转
        updateWheel();
    }, 2500);
}

// Show caught fish
function showCaughtFish(fish) {
    caughtFish.textContent = fish.icon;
    caughtFish.classList.add('show');

    // Create celebration effect
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createStarBurst(
                caughtFish.offsetLeft + caughtFish.offsetWidth / 2,
                caughtFish.offsetTop + caughtFish.offsetHeight / 2
            );
        }, i * 100);
    }

    gameState.successfulCatches++;
}

// Show miss message
function showMissMessage() {
    caughtFish.textContent = '💨';
    caughtFish.classList.add('show');
}

// Create celebration effect based on success or failure
function createCelebration(success) {
    const miniGame = document.getElementById('miniFishingGame');
    if (!miniGame) return;

    const rect = miniGame.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (success) {
        // Success: Create colorful star burst
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createStarBurst(centerX, centerY);
            }, i * 100);
        }
    } else {
        // Failure: Create subtle gray effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    width: 4px;
                    height: 4px;
                    background: rgba(150, 150, 150, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    transition: all 0.8s ease-out;
                `;
                document.body.appendChild(star);

                const angle = (i / 5) * Math.PI * 2;
                const distance = 50 + Math.random() * 30;

                setTimeout(() => {
                    star.style.transform = `translate(
                        ${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance}px
                    )`;
                    star.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    star.remove();
                }, 800);
            }, i * 100);
        }
    }
}

// Add fish to aquarium
function addToAquarium(fish) {
    if (!gameState.aquarium[fish.id]) {
        gameState.aquarium[fish.id] = {
            ...fish,
            count: 0
        };
    }
    gameState.aquarium[fish.id].count++;
    gameState.totalCatches++;

    // Save to localStorage
    localStorage.setItem('fishingAquarium', JSON.stringify(gameState.aquarium));
}

// Update statistics display
function updateStats() {
    totalCatchesEl.textContent = gameState.totalCatches;

    const successRate = gameState.totalCatches > 0
        ? Math.round((gameState.successfulCatches / gameState.totalCatches) * 100)
        : 0;
    successRateEl.textContent = successRate + '%';

    // Find rarest fish
    const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    let rarest = null;

    for (const rarity of rarityOrder.reverse()) {
        const fishInRarity = Object.values(gameState.aquarium).find(f => f.rarity === rarity);
        if (fishInRarity) {
            rarest = fishInRarity;
            break;
        }
    }

    if (rarest) {
        rarestFishEl.textContent = rarest.icon;
    }
}

// Render aquarium
function renderAquarium() {
    const fishes = Object.values(gameState.aquarium);

    if (fishes.length === 0) {
        aquariumContent.innerHTML = `
            <div class="empty-aquarium">
                <i class="fas fa-water"></i>
                <p data-zh="水族馆是空的，快去钓鱼吧！" data-en="Aquarium is empty, go fishing!">水族馆是空的，快去钓鱼吧！</p>
            </div>
        `;
        aquariumCount.textContent = '0';
        aquariumTotal.textContent = '0';
        return;
    }

    // Sort by rarity
    const rarityOrder = { 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
    fishes.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);

    aquariumContent.innerHTML = fishes.map(fish => `
        <div class="fish-card">
            <span class="fish-icon">${fish.icon}</span>
            <div class="fish-name">${fish.name}</div>
            <div class="fish-rarity ${fish.rarity}">${fish.rarityText[currentLang]}</div>
            <div class="fish-count">
                <span data-zh="数量" data-en="Count">数量</span>: <span>${fish.count}</span>
            </div>
        </div>
    `).join('');

    aquariumCount.textContent = fishes.length;
    aquariumTotal.textContent = gameState.totalCatches;
}

// Create swimming fishes in background
function createSwimmingFishes() {
    const fishEmojis = ['🐠', '🐟', '🐡', '🐬', '🦈', '🐳'];

    for (let i = 0; i < 3; i++) {
        const fish = document.createElement('div');
        fish.className = 'swimming-fish';
        fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        fish.style.position = 'absolute';
        fish.style.left = '-30px';
        fish.style.bottom = (10 + Math.random() * 30) + 'px';
        fish.style.animation = `swim ${6 + Math.random() * 6}s linear infinite`;
        fish.style.animationDelay = (Math.random() * 3) + 's';
        fish.style.fontSize = (1 + Math.random() * 0.5) + 'rem';
        fish.style.opacity = '0.6';
        swimmingFishes.appendChild(fish);
    }
}

// Event Listeners
if (wheelContainer) {
    wheelContainer.addEventListener('click', castLine);
}

// Aquarium Modal Event Listeners
if (closeAquariumBtn) {
    closeAquariumBtn.addEventListener('click', () => {
        aquariumModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (aquariumModal) {
    aquariumModal.addEventListener('click', (e) => {
        if (e.target === aquariumModal) {
            aquariumModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Floating Fishing Game Event Listeners
if (fishingToggle && miniFishingGame) {
    fishingToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        miniFishingGame.classList.toggle('active');
        const icon = fishingToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-fish');
            icon.classList.toggle('fa-times');
        }
    });

    if (fishingClose) {
        fishingClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            miniFishingGame.classList.remove('active');
        });
    }
}

// Initialize game
function initGame() {
    drawWheel();
    updateWheel();
    createSwimmingFishes();
    updateStats();

    // Load saved aquarium
    renderAquarium();
}

// Start game when page loads
if (document.getElementById('powerWheel')) {
    initGame();
}

/* ========================================
   AI Chat Widget with GLM API & RAG
   ======================================== */

// Widget Elements
const floatingChatWidget = document.getElementById('floatingChatWidget');
const chatWidgetHeader = document.getElementById('chatWidgetHeader');
const minimizeChat = document.getElementById('minimizeChat');
const closeChat = document.getElementById('closeChat');
const widgetMessages = document.getElementById('widgetMessages');
const widgetChatInput = document.getElementById('widgetChatInput');
const widgetSendBtn = document.getElementById('widgetSendBtn');
const quickQuestions = document.querySelectorAll('.quick-question');

// Resume data for RAG (系统提示词)
const RESUME_CONTEXT = `
你是葛尔康的AI助手，基于智谱GLM API。你的任务是回答关于葛尔康的问题。

以下是葛尔康的详细简历信息：

【基本信息】
姓名：葛尔康
电话：17866710302
邮箱：kanger0629@163.com
专业：计算机科学与技术（2018.09-2022.06，本科）

【工作经历】
1. 云从科技（2024.07-至今）
   - 岗位：搜索产品经理
   - 负责：AI搜索产品规划与设计、搜索策略优化、多模态搜索能力建设

2. 字节跳动（2022.07-2024.06）
   - 岗位：搜索策略产品经理
   - 负责：电商搜索策略优化、搜索算法迭代、搜索体验提升
   - 成果：提升搜索转化率30%、优化搜索相关性40%

【项目经验】
1. AI多模态搜索平台（2024.01-至今）
   - 职责：产品设计、技术方案对接
   - 技术：多模态向量检索、LLM应用、RAG系统
   - 成果：支持图像+文本联合搜索，准确率提升50%

2. 电商搜索推荐系统（2023.03-2023.12）
   - 职责：搜索推荐一体化设计
   - 技术：协同过滤、深度学习排序
   - 成果：GMV提升25%

【技能专长】
- 产品能力：需求分析、产品规划、数据分析、用户研究
- 技术能力：Python、SQL、机器学习基础、A/B测试
- 领域知识：搜索引擎、推荐系统、大语言模型、AI产品
- 工具栈：ChatGPT、Claude、Kimi、各种AI工具

【个人特质】
- 对AI技术充满热情，持续关注行业动态
- 具备产品思维和技术理解力
- 善于跨团队协作，推动项目落地
- 学习能力强，快速适应新领域

请基于以上信息回答用户问题，回答要简洁专业，控制在100字以内。
`;

// GLM API配置
const GLM_API_KEY = '39e7431665754cc08fe332777f7968e7.ei00hbZ9bAYzSvEW';
const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// Widget状态
let chatHistory = [];
let isMinimized = false;

// 切换最小化状态
if (minimizeChat && floatingChatWidget) {
    minimizeChat.addEventListener('click', () => {
        isMinimized = !isMinimized;
        floatingChatWidget.classList.toggle('minimized', isMinimized);
        minimizeChat.innerHTML = isMinimized
            ? '<i class="fas fa-plus"></i>'
            : '<i class="fas fa-minus"></i>';
    });
}

// 关闭Widget（隐藏而非删除）
if (closeChat && floatingChatWidget) {
    closeChat.addEventListener('click', () => {
        floatingChatWidget.style.display = 'none';
        // 可以添加一个重新打开的按钮（可选）
        setTimeout(() => {
            floatingChatWidget.style.display = 'block';
            floatingChatWidget.style.animation = 'widgetFadeIn 0.3s ease';
        }, 3000); // 3秒后自动重新显示
    });
}

// 添加消息到Widget
function addWidgetMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `widget-message ${isUser ? 'user' : 'assistant'}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = formatWidgetMessage(content);

    messageDiv.appendChild(bubble);
    widgetMessages.appendChild(messageDiv);
    widgetMessages.scrollTop = widgetMessages.scrollHeight;

    // 添加到历史记录
    chatHistory.push({
        role: isUser ? 'user' : 'assistant',
        content: content
    });
}

// 格式化消息
function formatWidgetMessage(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// 显示输入中指示器
function showWidgetTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'widget-typing';
    typingDiv.id = 'widgetTyping';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    widgetMessages.appendChild(typingDiv);
    widgetMessages.scrollTop = widgetMessages.scrollHeight;
}

// 移除输入中指示器
function removeWidgetTyping() {
    const indicator = document.getElementById('widgetTyping');
    if (indicator) indicator.remove();
}

// 调用GLM API
async function callGLMAPI(userMessage) {
    try {
        const messages = [
            { role: 'system', content: RESUME_CONTEXT },
            ...chatHistory.slice(-5),
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(GLM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GLM_API_KEY}`
            },
            body: JSON.stringify({
                model: 'glm-4-flash',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('GLM API Error:', error);
        return `抱歉，遇到了问题：${error.message}`;
    }
}

// 发送消息
async function sendWidgetMessage(message) {
    if (!message.trim()) return;

    addWidgetMessage(message, true);
    widgetChatInput.value = '';
    widgetSendBtn.disabled = true;

    showWidgetTyping();
    const response = await callGLMAPI(message);
    removeWidgetTyping();

    addWidgetMessage(response, false);
    widgetSendBtn.disabled = false;
}

// 事件监听器
if (widgetSendBtn && widgetChatInput) {
    widgetSendBtn.addEventListener('click', () => {
        sendWidgetMessage(widgetChatInput.value);
    });

    widgetChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendWidgetMessage(widgetChatInput.value);
        }
    });

    quickQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const questionText = q.getAttribute('data-zh') || q.textContent;
            sendWidgetMessage(questionText);
        });
    });
}

// API配置提示
if (GLM_API_KEY === 'YOUR_GLM_API_KEY_HERE') {
    console.warn('%c⚠️ GLM API Key未配置', 'color: #ff6b6b; font-size: 14px; font-weight: bold;');
    console.warn('%c请在script.js中设置GLM_API_KEY变量', 'color: #ff6b6b; font-size: 12px;');
    console.warn('%c获取API Key: https://open.bigmodel.cn/', 'color: #ff6b6b; font-size: 12px;');
}
