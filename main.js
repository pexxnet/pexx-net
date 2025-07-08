// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Animated counters for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats counters
            if (entry.target.classList.contains('coverage-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat h3');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('45+')) {
                        animateCounter(stat, 45, 2000);
                        setTimeout(() => {
                            stat.textContent = '45+';
                        }, 2000);
                    } else if (text.includes('2M+')) {
                        animateCounter(stat, 2, 2000);
                        setTimeout(() => {
                            stat.textContent = '2M+';
                        }, 2000);
                    } else if (text.includes('99.9%')) {
                        animateCounter(stat, 99.9, 2000);
                        setTimeout(() => {
                            stat.textContent = '99.9%';
                        }, 2000);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .plan-card, .coverage-stats, .feature-card, .cyber-card').forEach(el => {
    observer.observe(el);
});

// Dynamic speed indicator animation in hero stats
const heroStats = document.querySelectorAll('.stat-number');
if (heroStats.length > 0) {
    const speeds = ['100', '500', '1000'];
    const uptimes = ['99.5%', '99.9%', '100%'];
    let currentIndex = 0;

    function updateHeroStats() {
        heroStats.forEach((stat, index) => {
            if (stat.textContent.includes('Gbps') || stat.textContent === '1 Gbps') {
                stat.textContent = speeds[currentIndex] + ' Mbps';
                if (currentIndex === 2) {
                    stat.textContent = '1 Gbps';
                }
            }
        });
        currentIndex = (currentIndex + 1) % speeds.length;
    }

    // Change stats every 4 seconds
    setInterval(updateHeroStats, 4000);
}

// Cyber glitch effect for hero title
function createGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = 'glitch-1 0.3s ease-in-out';
            }
        }, 100);
    });
}

// Floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-cyan);
            border-radius: 50%;
            box-shadow: 0 0 6px var(--primary-cyan);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${15 + Math.random() * 10}s infinite linear;
            animation-delay: ${Math.random() * 15}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Spider web animation
function animateSpiderWeb() {
    const webLines = document.querySelectorAll('.web-line');
    const webNodes = document.querySelectorAll('.web-node');
    
    webLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
    });
    
    webNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.3}s`;
    });
}

// Cyber button hover effects
document.querySelectorAll('.cyber-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        const glow = button.querySelector('.btn-glow');
        if (glow) {
            glow.style.left = '-100%';
            setTimeout(() => {
                glow.style.left = '100%';
            }, 50);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    const heroStats = document.querySelector('.hero-stats');
    const cyberGrid = document.querySelector('.cyber-grid');
    
    if (heroTitle && scrolled < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroStats && scrolled < window.innerHeight) {
        heroStats.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    if (cyberGrid && scrolled < window.innerHeight) {
        cyberGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effects to cyber cards
document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 50px rgba(0, 255, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroStats) {
        setTimeout(() => {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateY(0)';
        }, 300);
    }

    // Initialize effects
    createGlitchEffect();
    createFloatingParticles();
    animateSpiderWeb();
});

// Cyber loading effect for buttons
document.querySelectorAll('.cyber-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't add loading animation to phone links
        if (this.href && this.href.includes('tel:')) {
            return;
        }
        
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            
            // Create loading effect
            const loadingOverlay = document.createElement('div');
            loadingOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
                animation: shimmer 1s ease-in-out;
            `;
            
            this.appendChild(loadingOverlay);
            
            setTimeout(() => {
                this.classList.remove('loading');
                if (loadingOverlay.parentNode) {
                    loadingOverlay.remove();
                }
            }, 1000);
        }
    });
});

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .hero-content, .hero-stats {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .particle {
        pointer-events: none;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .cyber-btn {
        position: relative;
        overflow: hidden;
    }
    
    .cyber-btn.loading {
        pointer-events: none;
    }
`;
document.head.appendChild(style);