// Add smooth tilt/parallax effect with performance optimizations
document.querySelectorAll('.tilt').forEach(card => {
    let isTouching = false;
    let animationFrame;

    const handleMove = (e) => {
        if (isTouching) return;
        
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
    };

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

// Enhanced cursor toggle with performance optimizations
let cursorState = 0;
let cursorTimeout;

const updateCursor = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <text x="0" y="15" font-size="15" fill="#00FF00">${cursorState}</text>
    </svg>`;
    
    document.body.style.cursor = `url('data:image/svg+xml,${encodeURIComponent(svg)}') 10 10, auto`;
};

// Debounced click handler
const handleClick = () => {
    clearTimeout(cursorTimeout);
    cursorState = cursorState === 0 ? 1 : 0;
    updateCursor();
    
    // Reset cursor after 5 seconds of inactivity
    cursorTimeout = setTimeout(() => {
        document.body.style.cursor = 'auto';
    }, 5000);
};

document.body.addEventListener('click', handleClick);

// Cleanup function
const cleanup = () => {
    document.body.removeEventListener('click', handleClick);
    clearTimeout(cursorTimeout);
    document.body.style.cursor = 'auto';
};

// Add cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Add smooth scroll behavior
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
  
