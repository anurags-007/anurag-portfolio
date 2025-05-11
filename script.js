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

// Lightbox functionality
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');

function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  currentImageIndex = Array.from(galleryImages).indexOf(img);
  
  lightboxImg.src = img.src;
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
  event.stopPropagation(); // Prevent lightbox from closing
  currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Gallery scroll functionality
function scrollGallery(direction) {
  const gallery = document.querySelector('.gallery-grid');
  const scrollAmount = 320; // Width of item + gap
  
  if (direction === 'left') {
    gallery.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else {
    gallery.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}

// Close lightbox with Escape key and navigate with arrow keys
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (event.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('light-mode');
  themeToggle.setAttribute('aria-pressed', document.body.classList.contains('light-mode'));
});
