/* ==========================================================================
   Kidbee Student Nursery - Interactive Web Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initMobileMenu();
  initHeroSlider();
  initFacilityTabs();
  initGalleryFilter();
  initLightboxModal();
  initInquiryForm();
  initScrollEffects();
});

/* ==========================================================================
   1. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.querySelector('#mobileToggle');
  const navMenu = document.querySelector('#navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

/* ==========================================================================
   2. Hero Banner Slider
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5500);
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  const heroSection = document.querySelector('.hero-slider-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/* ==========================================================================
   3. Facility Virtual Tour Tabs
   ========================================================================== */
function initFacilityTabs() {
  const tabBtns = document.querySelectorAll('.facility-tab-btn');
  const panels = document.querySelectorAll('.facility-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Gallery Category Filter
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Lightbox Modal Logic
   ========================================================================== */
function initLightboxModal() {
  const lightbox = document.querySelector('#lightboxModal');
  const lightboxImg = document.querySelector('#lightboxImage');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-overlay h4')?.innerText || 'Kidbee Gallery';
      
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.innerText = title;
        lightbox.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. Inquiry / Admission Form Handler
   ========================================================================== */
function initInquiryForm() {
  const form = document.querySelector('#tourInquiryForm');
  const modal = document.querySelector('#successModal');
  const closeModalBtn = document.querySelector('#closeModalBtn');
  const parentNameSpan = document.querySelector('#modalParentName');
  const visitDateSpan = document.querySelector('#modalVisitDate');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.querySelector('#parentName')?.value || 'Parent';
    const visitDate = document.querySelector('#preferredDate')?.value || 'Scheduled Date';

    if (parentNameSpan) parentNameSpan.innerText = parentName;
    if (visitDateSpan) visitDateSpan.innerText = visitDate;

    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   7. Scroll Effects & Back to Top
   ========================================================================== */
function initScrollEffects() {
  const backTopBtn = document.querySelector('#backTopBtn');
  const headerNav = document.querySelector('#headerNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backTopBtn) backTopBtn.classList.add('show');
      if (headerNav) headerNav.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
    } else {
      if (backTopBtn) backTopBtn.classList.remove('show');
      if (headerNav) headerNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    }
  });

  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
