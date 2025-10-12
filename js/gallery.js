// Initialize media page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoLazyLoading();
    initializeSocialTracking();
});

// Gallery functionality removed as requested

// Video lazy loading for better performance
function initializeVideoLazyLoading() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src.includes('autoplay=1')) {
                    // Add autoplay parameter when video comes into view
                    const currentSrc = iframe.src;
                    if (!currentSrc.includes('autoplay')) {
                        iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=0';
                    }
                }
                videoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    videoWrappers.forEach(wrapper => {
        videoObserver.observe(wrapper);
    });
}

// Social media link tracking
function initializeSocialTracking() {
    const socialLinks = document.querySelectorAll('a[href*="youtube.com"], a[href*="tiktok.com"], a[href*="facebook.com"], a[href*="instagram.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.href.includes('youtube') ? 'YouTube' :
                           this.href.includes('tiktok') ? 'TikTok' :
                           this.href.includes('facebook') ? 'Facebook' :
                           this.href.includes('instagram') ? 'Instagram' : 'Unknown';
            
            // Track social media clicks (can be integrated with analytics)
            console.log(`Social media click: ${platform}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Playlist card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const playlistCards = document.querySelectorAll('.playlist-card');
    
    playlistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const playIcon = this.querySelector('.fas.fa-play-circle');
            if (playIcon) {
                playIcon.style.transform = 'scale(1.2)';
                playIcon.style.color = '#ff0000';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const playIcon = this.querySelector('.fas.fa-play-circle');
            if (playIcon) {
                playIcon.style.transform = 'scale(1)';
                playIcon.style.color = '';
            }
        });
    });
});

// Platform card animations
function initializePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    platformCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Initialize platform cards when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePlatformCards);

// Gallery item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.overlay');
            const icon = this.querySelector('.gallery-placeholder i');
            
            if (overlay) {
                overlay.style.opacity = '1';
            }
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.overlay');
            const icon = this.querySelector('.gallery-placeholder i');
            
            if (overlay) {
                overlay.style.opacity = '0';
            }
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});