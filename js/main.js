/* ==========================================================================
   KidBee Day Care - Interactive Application & Child-Friendly Animations Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLightboxModal();
  initAdmissionForm();
  initScrollEffects();
  initChildFriendlyInteractions();
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
   2. Lightbox Modal Logic for Minimal Gallery
   ========================================================================== */
function initLightboxModal() {
  const lightbox = document.querySelector('#lightboxModal');
  const lightboxImg = document.querySelector('#lightboxImage');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.minimal-gallery-item, .gallery-item');

  if (!lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const captionElem = item.querySelector('.gallery-caption-title');
      const title = captionElem ? captionElem.innerText : (img ? img.alt : 'KidBee Gallery');

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
   3. Daycare Admission Registration Form Handler
   ========================================================================== */
function initAdmissionForm() {
  const form = document.querySelector('#admissionRegistrationForm');
  const modal = document.querySelector('#successModal');
  const closeModalBtn = document.querySelector('#closeModalBtn');
  const parentNameSpan = document.querySelector('#modalParentName');
  const childNameSpan = document.querySelector('#modalChildName');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fatherName = document.querySelector('#fatherName')?.value;
    const motherName = document.querySelector('#motherName')?.value;
    const parentName = fatherName || motherName || 'Parent';
    const childName = document.querySelector('#childName')?.value || 'your child';

    if (parentNameSpan) parentNameSpan.innerText = parentName;
    if (childNameSpan) childNameSpan.innerText = childName;

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
   4. Scroll Effects & Back to Top Widget
   ========================================================================== */
function initScrollEffects() {
  const backTopBtn = document.querySelector('#backTopBtn');
  const headerNav = document.querySelector('#headerNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      if (backTopBtn) backTopBtn.classList.add('show');
      if (headerNav) headerNav.style.boxShadow = '0 6px 24px rgba(45, 61, 104, 0.12)';
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

/* ==========================================================================
   5. Child-Friendly Micro-Interactions
   ========================================================================== */
function initChildFriendlyInteractions() {
  // ABC Toy Blocks Bounce on Click
  const abcBlocks = document.querySelectorAll('.abc-block');
  abcBlocks.forEach(block => {
    block.addEventListener('click', () => {
      block.style.transform = 'scale(1.3) rotate(15deg)';
      setTimeout(() => {
        block.style.transform = '';
      }, 300);
    });
  });

  // Yellow Paint Badge Click Wiggle
  const yellowBadge = document.querySelector('.yellow-paint-badge');
  if (yellowBadge) {
    yellowBadge.addEventListener('click', () => {
      yellowBadge.style.transform = 'rotate(-10deg) scale(1.15)';
      setTimeout(() => {
        yellowBadge.style.transform = 'rotate(-2.5deg)';
      }, 350);
    });
  }
}
