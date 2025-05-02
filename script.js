// Enhanced smooth tilt/parallax effect with performance optimizations
document.querySelectorAll('.tilt').forEach(card => {
    let isTouching = false;
    let animationFrame;
    let tiltIntensity = 10; // Adjust tilt sensitivity

    const handleMove = (e) => {
        if (isTouching) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        
        const moveX = (x - width / 2) / tiltIntensity;
        const moveY = (y - height / 2) / tiltIntensity;

        // Add scale effect on hover
        const scale = 1.02;

        // Use requestAnimationFrame for smooth animation
        animationFrame = requestAnimationFrame(() => {
            card.style.transform = `
                perspective(1000px) 
                rotateX(${-moveY}deg) 
                rotateY(${moveX}deg) 
                scale(${scale})
            `;
            card.style.transition = 'transform 0.1s ease-out';
        });
    };

    const handleLeave = () => {
        isTouching = false;
        cancelAnimationFrame(animationFrame);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.transition = 'transform 0.5s ease-out';
    };

    // Mouse events with debounce
    const debouncedMove = debounce(handleMove, 10);
    card.addEventListener('mousemove', debouncedMove);
    card.addEventListener('mouseleave', handleLeave);

    // Touch events
    card.addEventListener('touchstart', () => { isTouching = true; });
    card.addEventListener('touchmove', debouncedMove);
    card.addEventListener('touchend', handleLeave);

    // Cleanup on unmount
    return () => {
        card.removeEventListener('mousemove', debouncedMove);
        card.removeEventListener('mouseleave', handleLeave);
        card.removeEventListener('touchstart', () => { isTouching = true; });
        card.removeEventListener('touchmove', debouncedMove);
        card.removeEventListener('touchend', handleLeave);
        cancelAnimationFrame(animationFrame);
    };
});

// Enhanced cursor toggle with performance optimizations
let cursorState = 0;
let cursorTimeout;
let isCursorActive = false;

const updateCursor = () => {
    if (!isCursorActive) return;
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <text x="0" y="15" font-size="15" fill="#00FF00">${cursorState}</text>
    </svg>`;
    
    document.body.style.cursor = `url('data:image/svg+xml,${encodeURIComponent(svg)}') 10 10, auto`;
};

// Debounced click handler with enhanced functionality
const handleClick = () => {
    clearTimeout(cursorTimeout);
    cursorState = cursorState === 0 ? 1 : 0;
    isCursorActive = true;
    updateCursor();
    
    // Reset cursor after 5 seconds of inactivity
    cursorTimeout = setTimeout(() => {
        isCursorActive = false;
        document.body.style.cursor = 'auto';
    }, 5000);
};

document.body.addEventListener('click', handleClick);

// Add smooth scroll behavior with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.card, .project, .skill-category');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', debounce(revealOnScroll, 10));

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 3000);
        } catch (error) {
            submitButton.textContent = 'Error! Try Again';
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 3000);
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cleanup function
const cleanup = () => {
    document.body.removeEventListener('click', handleClick);
    clearTimeout(cursorTimeout);
    document.body.style.cursor = 'auto';
    window.removeEventListener('scroll', revealOnScroll);
};

// Add cleanup on page unload
window.addEventListener('beforeunload', cleanup);
  
