// Main JavaScript for Clopton National LLC Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('about-card')) {
                    const cards = document.querySelectorAll('.about-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.2}s`;
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .video-section, .section-title');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic stats counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        updateCounter();
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    let number = parseInt(text.replace(/[^\d]/g, ''));
                    
                    // Handle different formats (K, M, etc.)
                    if (text.includes('K')) number *= 1000;
                    if (text.includes('M')) number *= 1000000;
                    
                    animateCounter(stat, number);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.about-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Video lazy loading and optimization
    const videoIframes = document.querySelectorAll('iframe');
    videoIframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Social media link tracking (optional analytics)
    const socialLinks = document.querySelectorAll('.social-links a, .cta-button');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('youtube') ? 'YouTube' :
                           this.href.includes('tiktok') ? 'TikTok' :
                           this.href.includes('facebook') ? 'Facebook' :
                           this.href.includes('instagram') ? 'Instagram' : 'External';
            
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });

    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    function debounceScroll(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounceScroll(function() {
        // Additional scroll-based animations can be added here
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Preload critical images
    function preloadImages() {
        const imageUrls = [
            'assets/truck-logo.svg',
            // Add other critical images here
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    preloadImages();

    // Error handling for external resources
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.log('Image failed to load:', e.target.src);
            // Could implement fallback image here
        }
    });

    // Initialize page animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Focus management for accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.add('active');
            }
        });
    });

    // Dynamic year update in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', currentYear);
        }
    });

    console.log('Clopton National LLC website loaded successfully!');
});

// Additional utility functions
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Export functions for potential use in other scripts
window.CloptionNational = {
    isMobile,
    isTablet,
    isDesktop
};