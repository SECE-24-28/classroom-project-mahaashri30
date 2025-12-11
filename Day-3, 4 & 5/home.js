// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Account Management
function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const loginBtn = document.getElementById('loginBtn');
    const accountMenu = document.getElementById('accountMenu');
    const welcomeBanner = document.getElementById('welcomeBanner');
    const userName = document.getElementById('userName');
    const welcomeUserName = document.getElementById('welcomeUserName');
    
    if (user && user.name) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (accountMenu) accountMenu.style.display = 'block';
        if (userName) userName.textContent = user.name;
        if (welcomeBanner) welcomeBanner.style.display = 'block';
        if (welcomeUserName) welcomeUserName.textContent = user.name;
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'flex';
        if (accountMenu) accountMenu.style.display = 'none';
        if (welcomeBanner) welcomeBanner.style.display = 'none';
    }
}

// Account Dropdown Toggle
const accountBtn = document.getElementById('accountBtn');
const accountDropdown = document.getElementById('accountDropdown');

if (accountBtn && accountDropdown) {
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accountDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        accountDropdown.classList.remove('active');
    });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.reload();
    });
}

// Initialize
checkUserSession();

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;

// Set background images
heroSlides.forEach(slide => {
    const bgImage = slide.dataset.bg;
    if (bgImage) {
        slide.style.backgroundImage = `url(${bgImage})`;
    }
});

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextHeroSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showHeroSlide(currentSlide);
}

setInterval(nextHeroSlide, 4000);

heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        showHeroSlide(currentSlide);
    });
});

// Sticky Header
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px var(--shadow)';
    } else {
        header.style.boxShadow = '0 2px 8px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll
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

// Cart functionality (using cart-utils.js)
function buyNow(productData) {
    const checkoutItem = { ...productData, quantity: 1 };
    localStorage.setItem('checkoutItems', JSON.stringify([checkoutItem]));
    window.location.href = 'checkout.html';
}

// Add to Cart for existing buttons using event delegation
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-cart-btn')) {
        e.preventDefault();
        const card = e.target.closest('.product-card') || e.target.closest('.featured-card');
        if (!card) return;
        
        const productData = {
            id: Date.now() + Math.random(),
            name: card.querySelector('h3').textContent,
            price: parseInt(card.querySelector('.price').textContent.replace(/[^0-9]/g, '')),
            originalPrice: parseInt(card.querySelector('.old-price')?.textContent.replace(/[^0-9]/g, '') || 0),
            image: card.querySelector('img').src,
            description: card.querySelector('.product-desc')?.textContent || card.querySelector('p')?.textContent || ''
        };
        
        addToCart(productData);
        
        // Visual feedback
        const originalText = e.target.textContent;
        e.target.textContent = '✓ Added!';
        e.target.style.background = '#10b981';
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.background = '';
        }, 1500);
    }
});

// Buy Now from card function
function buyNowFromCard(button) {
    const card = button.closest('.product-card') || button.closest('.featured-card');
    const productData = {
        id: Date.now() + Math.random(),
        name: card.querySelector('h3').textContent,
        price: parseInt(card.querySelector('.price').textContent.replace(/[^0-9]/g, '')),
        originalPrice: parseInt(card.querySelector('.old-price').textContent.replace(/[^0-9]/g, '')),
        image: card.querySelector('img').src,
        description: card.querySelector('.product-desc')?.textContent || card.querySelector('p').textContent
    };
    
    buyNow(productData);
}



// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .featured-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
