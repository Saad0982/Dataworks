// Data Works - Portfolio Scripts

document.addEventListener('DOMContentLoaded', function() {

// ===== PROJECT DATA =====
const portfolioData = [
    {
        id: 1,
        icon: '☕',
        title: 'Cafe Management System',
        description: 'Role-based cafe management system allowing admins to assign orders and workers to update order status in real time. Eliminated manual coordination bottlenecks.',
        tech: ['.NET', 'SQL Server', 'Real-Time Dashboard'],
        result: '✅ Real-time order tracking & worker assignment. Full CRUD operations with admin panel.',
        problem: 'Manual order assignment slowed down operations and lacked real-time coordination.'
    },
    {
        id: 2,
        icon: '🏋️',
        title: 'Fither – Fitness Platform',
        description: 'Women-focused fitness platform with built-in online session scheduling, Google Meet integration, and a centralized admin panel for managing users and recurring sessions.',
        tech: ['Angular', 'Node.js', 'MySQL'],
        result: '✅ Simplified session management. Better user engagement. Full admin control.',
        problem: 'Managing online fitness sessions and users manually was time-consuming and unorganized.'
    },
    {
        id: 3,
        icon: '🖨️',
        title: 'Artlink – Printing Web App',
        description: 'Business-focused web application for a printing company that showcases services, highlights portfolio work, and automatically generates quotations using updated service rates.',
        tech: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
        result: '✅ Eliminated pricing errors. Sped up client inquiries with automated quotation system.',
        problem: 'Client needed professional web presence and a faster way to generate accurate quotations without manual calculations.'
    },
    {
        id: 4,
        icon: '🌐',
        title: 'KSLM Event Platform',
        description: 'High-traffic event management system built for 150,000+ users with real-time stall management, booking systems, and live coordination tools.',
        tech: ['Full-Stack', 'Real-Time', 'MySQL', 'Node.js'],
        result: '✅ Handled 150K+ users. Real-time stall management for large-scale events.',
        problem: 'Large-scale event coordination required a robust platform capable of handling massive concurrent traffic.'
    }
];

// ===== SKILLS DATA =====
const skillsData = [
    { name: 'React', icon: '⚛️', level: 90, category: 'frontend' },
    { name: 'Angular', icon: '🔴', level: 85, category: 'frontend' },
    { name: 'Tailwind CSS', icon: '🎨', level: 88, category: 'frontend' },
    { name: 'WordPress', icon: '🔵', level: 95, category: 'cms' },
    { name: 'Node.js', icon: '🟢', level: 88, category: 'backend' },
    { name: '.NET', icon: '🟣', level: 80, category: 'backend' },
    { name: 'MySQL', icon: '🐬', level: 90, category: 'backend' },
    { name: 'SQL Server', icon: '🗄️', level: 85, category: 'backend' },
    { name: 'Power BI', icon: '📊', level: 90, category: 'data' },
    { name: 'Python', icon: '🐍', level: 78, category: 'data' },
    { name: 'Tableau', icon: '📈', level: 75, category: 'data' },
    { name: 'Excel (Adv)', icon: '📋', level: 92, category: 'data' },
    { name: 'Salesforce', icon: '☁️', level: 78, category: 'cms' },
    { name: 'SEO', icon: '🔍', level: 82, category: 'cms' },
    { name: 'AI / LLM', icon: '🤖', level: 80, category: 'frontend' }
];

// ===== CAROUSEL =====
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;

    const techBadges = data.tech.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-icon">${data.icon}</div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <div class="card-result">${data.result}</div>
        </div>
    `;

    item.addEventListener('click', () => goToSlide(index));
    return item;
}

function initCarousel() {
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;

        if (offset > totalItems / 2) offset -= totalItems;
        else if (offset < -totalItems / 2) offset += totalItems;

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        item.classList.remove('active');

        let spacing1 = 420, spacing2 = 650;
        if (isMobile) { spacing1 = 280; spacing2 = 430; }
        else if (isTablet) { spacing1 = 360; spacing2 = 560; }

        if (absOffset === 0) {
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
            item.classList.add('active');
        } else if (absOffset === 1) {
            const tx = sign * spacing1;
            const rot = isMobile ? 25 : 30;
            const sc = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateZ(-200px) rotateY(${-sign * rot}deg) scale(${sc})`;
            item.style.opacity = '0.75';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            const tx = sign * spacing2;
            const rot = isMobile ? 35 : 40;
            const sc = isMobile ? 0.72 : 0.68;
            item.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateZ(-350px) rotateY(${-sign * rot}deg) scale(${sc})`;
            item.style.opacity = '0.4';
            item.style.zIndex = '3';
        } else {
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % portfolioData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// ===== SKILLS GRID =====
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');

    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';

        const filtered = category === 'all'
            ? skillsData
            : skillsData.filter(s => s.category === category);

        filtered.forEach((skill, index) => {
            const hex = document.createElement('div');
            hex.className = 'skill-hexagon';
            hex.style.animationDelay = `${index * 0.08}s`;

            hex.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;

            skillsGrid.appendChild(hex);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    displaySkills();
}

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 20 + 's';
        p.style.animationDuration = (16 + Math.random() * 8) + 's';
        container.appendChild(p);
    }
}

// ===== ANIMATED COUNTER =====
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(counter);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(num => {
                if (!num.classList.contains('animated')) {
                    num.classList.add('animated');
                    animateCounter(num);
                }
            });
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// ===== CAROUSEL EVENT LISTENERS =====
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

let autoPlay = setInterval(nextSlide, 5000);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateCarousel, 250);
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// ===== SMOOTH NAV SCROLL & ACTIVE LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerH = header.offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - headerH,
                behavior: 'smooth'
            });
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

function updateActiveNav() {
    const pos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const h = section.offsetHeight;
        const id = section.getAttribute('id');

        if (pos >= top && pos < top + h) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const btn = contactForm.querySelector('.submit-btn');
    const original = btn.textContent;
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, var(--accent-green), #00b360)';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
    }, 3000);
});

// ===== INIT =====
initCarousel();
initSkillsGrid();
initParticles();

}); // end DOMContentLoaded
