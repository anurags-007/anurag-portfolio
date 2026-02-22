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

function navigateLightbox(direction, event) {
  try {
    if (event) event.stopPropagation(); // Prevent lightbox from closing
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
document.addEventListener('keydown', function (event) {
  try {
    switch (event.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1, event);
        break;
      case 'ArrowRight':
        navigateLightbox(1, event);
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

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggle.setAttribute('aria-pressed', isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  });
}

// Add loading state to images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function () {
    this.classList.add('loaded');
  });

  img.addEventListener('error', function () {
    this.classList.add('error');
    console.error('Failed to load image:', this.src);
  });
});

// Responsive Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
  // Close menu when a link is clicked (mobile UX)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });
}

// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const mainHeader = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  if (!mainHeader) return;
  if (window.scrollY > lastScrollY && window.scrollY > 80) {
    // Scrolling down
    mainHeader.classList.add('hide-header');
  } else {
    // Scrolling up
    mainHeader.classList.remove('hide-header');
  }
  lastScrollY = window.scrollY;
});

// Scrollspy for navbar
const navLinks = document.querySelectorAll('.nav-list li a');
const sections = [
  document.getElementById('about'),
  document.getElementById('skills'),
  document.getElementById('projects'),
  document.getElementById('certifications'),
  document.getElementById('contact')
];

// Add smooth scroll to hero buttons
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

// Add animation to skill tags on scroll
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

// Observe skill tags for animation
document.addEventListener('DOMContentLoaded', () => {
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(tag);
  });
});

// Add hover effect to project cards
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 30px rgba(124, 77, 255, 0.3)';
  });

  project.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 2px 16px rgba(0,0,0,0.10)';
  });
});

// Add loading animation to images
// Add loading animation to images
// Loading animation removed to prevent conflict with lightbox
document.querySelectorAll('img').forEach(img => {
  const onImageLoad = () => {
    img.style.opacity = '1';
    img.classList.add('loaded');
  };

  if (img.complete) {
    onImageLoad();
  } else {
    img.style.opacity = '0';
    img.addEventListener('load', onImageLoad);
    img.addEventListener('error', function () {
      this.style.opacity = '0.5';
      this.alt = 'Image failed to load';
      console.error('Failed to load image:', this.src);
    });
  }
});

function onScrollSpy() {
  let scrollPos = window.scrollY + 120; // Offset for sticky header
  let currentSection = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section && section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (
      currentSection &&
      link.getAttribute('href').replace('#', '') === currentSection.id
    ) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScrollSpy);
window.addEventListener('DOMContentLoaded', onScrollSpy);

// Typing animation for hero title
function typeWriterEffect(element, texts, typingSpeed = 80, erasingSpeed = 40, delay = 1200) {
  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function type() {
    const currentText = texts[textIndex];
    if (!isErasing) {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex < currentText.length) {
        setTimeout(type, typingSpeed);
      } else {
        isErasing = true;
        setTimeout(type, delay);
      }
    } else {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex > 0) {
        setTimeout(type, erasingSpeed);
      } else {
        isErasing = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
      }
    }
  }
  type();
}

// System Boot Sequence
document.addEventListener('DOMContentLoaded', () => {
  const bootOverlay = document.getElementById('boot-overlay');
  if (bootOverlay) {
    // Wait for progress bar animation (0.5s) + a little buffer
    setTimeout(() => {
      bootOverlay.style.transition = 'opacity 0.3s ease';
      bootOverlay.style.opacity = '0';

      setTimeout(() => {
        bootOverlay.remove();
        // Trigger hero typing effect after boot
        const typedText = document.getElementById('typed-text');
        if (typedText && typedText.dataset.typed) {
          try {
            const texts = JSON.parse(typedText.dataset.typed);
            typeWriterEffect(typedText, texts);
          } catch (e) {
            typedText.textContent = 'Cybersecurity Enthusiast';
          }
        }
      }, 300);
    }, 600);
  } else {
    // Fallback if no overlay
    const typedText = document.getElementById('typed-text');
    if (typedText && typedText.dataset.typed) {
      try {
        const texts = JSON.parse(typedText.dataset.typed);
        typeWriterEffect(typedText, texts);
      } catch (e) {
        typedText.textContent = 'Cybersecurity Enthusiast';
      }
    }
  }
});



// Visitor Intelligence System
async function fetchVisitorIntel() {
  const hudParams = {
    ip: document.getElementById('hud-ip'),
    loc: document.getElementById('hud-loc'),
    isp: document.getElementById('hud-isp'),
    os: document.getElementById('hud-os'),
    container: document.getElementById('visitor-hud')
  };

  if (!hudParams.ip) return;

  // 1. Detailed System & Browser Info
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  let osName = 'Unknown OS';
  if (userAgent.indexOf('Win') !== -1) osName = 'Windows';
  else if (userAgent.indexOf('Mac') !== -1) osName = 'MacOS';
  else if (userAgent.indexOf('Linux') !== -1) osName = 'Linux';
  else if (userAgent.indexOf('Android') !== -1) osName = 'Android';
  else if (userAgent.indexOf('like Mac') !== -1) osName = 'iOS';

  const ram = navigator.deviceMemory ? `${navigator.deviceMemory}GB RAM` : '';
  const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : '';
  const sysDetails = [osName, ram, cores].filter(Boolean).join(' | ');

  hudParams.os.textContent = `SYS: ${sysDetails}`;

  // 2. Fetch IP and Basic Network Intel
  let userIp = '[UNKNOWN]';
  let ispName = '[UNKNOWN]';
  try {
    // Using a more reliable CORS-friendly fallback API for IP
    const ipResponse = await fetch('http://ip-api.com/json/');
    const ipData = await ipResponse.json();
    userIp = ipData.query;
    typeText(hudParams.ip, `IP:  ${userIp}`);

    ispName = ipData.org || ipData.isp || 'Unknown ISP';
    setTimeout(() => typeText(hudParams.isp, `ISP: ${ispName}`), 1000);

    // 3. High-Accuracy IP Geolocation (Silent, No Prompt)
    try {
      if (userIp !== '[UNKNOWN]') {
        const geoResponse = await fetch(`http://ip-api.com/json/${userIp}`);
        const data = await geoResponse.json();

        if (data.status === 'success') {
          setTimeout(() => {
            typeText(hudParams.loc, `LOC: ${data.city}, ${data.regionName} [CLICK TO ENHANCE]`);
            hudParams.loc.style.cursor = 'pointer';
            hudParams.loc.title = 'Click to run a high-accuracy GPS/Tower scan';
          }, 500);
          hudParams.container.style.borderColor = 'var(--text-secondary)'; // Cyan success
        } else {
          hudParams.loc.textContent = 'LOC: [LOCATION HIDDEN]';
        }
      } else {
        hudParams.loc.textContent = 'LOC: [GEO-TRACKING UNAVAILABLE]';
      }
    } catch (error) {
      console.error('Geo Intel failure:', error);
      hudParams.loc.textContent = 'LOC: [LOCATION LOST]';
    }

    // 4. Interactive High-Accuracy Scan (Requires Click & Consent)
    hudParams.loc.addEventListener('click', () => {
      if (!("geolocation" in navigator)) {
        hudParams.loc.textContent = 'LOC: [GPS UNAVAILABLE ON DEVICE]';
        return;
      }

      hudParams.loc.textContent = 'LOC: [ACQUIRING SATELLITE LOCK...]';
      hudParams.loc.style.cursor = 'default';

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          try {
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const geoData = await geoResponse.json();
            let accurateLoc = geoData.address.suburb || geoData.address.neighbourhood || geoData.address.city || geoData.address.town || geoData.address.county;
            let stateAndCountry = `${geoData.address.state || ''}, ${geoData.address.country || ''}`;

            typeText(hudParams.loc, `LOC: ${accurateLoc}, ${stateAndCountry} (Acc: ${Math.round(accuracy)}m)`);
            hudParams.container.style.borderColor = 'var(--accent-secondary)'; // Gold success
          } catch (e) {
            typeText(hudParams.loc, `LOC: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          }
        },
        (error) => {
          hudParams.loc.textContent = 'LOC: [ACCESS DENIED BY TARGET]';
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  } catch (error) {
    console.error('IP Intel failure:', error);
    hudParams.ip.textContent = 'IP:  [CONNECTION LOST/BLOCKED]';
  }
}
// Typing helper for HUD
function typeText(element, text, index = 0) {
  if (index === 0) element.textContent = '';
  if (index < text.length) {
    element.textContent += text.charAt(index);
    setTimeout(() => typeText(element, text, index + 1), 30);
  }
}

// Initialize systems
document.addEventListener('DOMContentLoaded', () => {
  fetchVisitorIntel();
});