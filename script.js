// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Add smooth tilt/parallax effect with performance optimizations
document.querySelectorAll('.tilt').forEach(card => {
    let isTouching = false;
    let animationFrame;

    const handleMove = debounce((e) => {
        if (isTouching) return;
        
        try {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;
            
            const moveX = (x - width / 2) / 10;
            const moveY = (y - height / 2) / 10;

            // Use requestAnimationFrame for smooth animation
            animationFrame = requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
            });
        } catch (error) {
            console.error('Error in tilt effect:', error);
        }
    }, 16); // 60fps

    const handleLeave = () => {
        isTouching = false;
        cancelAnimationFrame(animationFrame);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    // Mouse events
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);

    // Touch events
    card.addEventListener('touchstart', () => { isTouching = true; });
    card.addEventListener('touchmove', handleMove);
    card.addEventListener('touchend', handleLeave);

    // Cleanup on unmount
    return () => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
        card.removeEventListener('touchstart', () => { isTouching = true; });
        card.removeEventListener('touchmove', handleMove);
        card.removeEventListener('touchend', handleLeave);
        cancelAnimationFrame(animationFrame);
    };
});

// Add smooth scroll behavior with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        try {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.warn('Target element not found:', this.getAttribute('href'));
            }
        } catch (error) {
            console.error('Error in smooth scroll:', error);
        }
    });
});

// Lightbox functionality with error handling
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');

function openLightbox(img) {
    try {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox || !lightboxImg) {
            throw new Error('Lightbox elements not found');
        }
        
        currentImageIndex = Array.from(galleryImages).indexOf(img);
        if (currentImageIndex === -1) {
            throw new Error('Image not found in gallery');
        }
        
        lightboxImg.src = img.src;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error opening lightbox:', error);
    }
}

function closeLightbox() {
    try {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            throw new Error('Lightbox element not found');
        }
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    } catch (error) {
        console.error('Error closing lightbox:', error);
    }
}

function navigateLightbox(direction) {
    try {
        event.stopPropagation(); // Prevent lightbox from closing
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightboxImg) {
            throw new Error('Lightbox image element not found');
        }
        lightboxImg.src = galleryImages[currentImageIndex].src;
    } catch (error) {
        console.error('Error navigating lightbox:', error);
    }
}

// Gallery scroll functionality with event delegation
const galleryContainer = document.querySelector('.gallery-container');
if (galleryContainer) {
    galleryContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.scroll-button');
        if (!button) return;
        
        const direction = button.classList.contains('scroll-left') ? 'left' : 'right';
        const gallery = document.querySelector('.gallery-grid');
        if (!gallery) return;
        
        const scrollAmount = 320; // Width of item + gap
        gallery.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
    try {
        switch(event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    } catch (error) {
        console.error('Error in keyboard navigation:', error);
    }
});

// Theme toggle with persistence
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.setAttribute('aria-pressed', 'true');
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggle.setAttribute('aria-pressed', isLightMode);
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}

// Add loading state to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
        this.classList.add('error');
        console.error('Failed to load image:', this.src);
    });
});
