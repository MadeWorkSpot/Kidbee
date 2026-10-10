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
   3. Daycare Admission Registration Form Handler (PDF Download & WhatsApp Redirect)
   ========================================================================== */
const ADMISSION_RECEIVER_EMAIL = 'Kidbeedaycare@gmail.com';
const DAYCARE_WHATSAPP_NUMBER = '918136819858';

function initAdmissionForm() {
  const form = document.querySelector('#admissionRegistrationForm');
  const modal = document.querySelector('#successModal');
  const closeModalBtn = document.querySelector('#closeModalBtn');
  const parentNameSpan = document.querySelector('#modalParentName');
  const childNameSpan = document.querySelector('#modalChildName');
  const submitBtn = document.querySelector('#submitAdmissionBtn');
  const modalWhatsappBtn = document.querySelector('#modalWhatsappBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit Daycare Admission Form';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating Admission PDF...';
    }

    // Generate unique Application ID and submission timestamp
    const appId = 'KB-' + Math.floor(100000 + Math.random() * 900000);
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Gather Form Data
    const childName = document.querySelector('#childName')?.value.trim() || 'Child';
    const fatherName = document.querySelector('#fatherName')?.value.trim() || '';
    const motherName = document.querySelector('#motherName')?.value.trim() || '';
    const parentName = fatherName || motherName || 'Parent';
    const contactPhone = document.querySelector('#fatherPhone')?.value.trim() || document.querySelector('#motherPhone')?.value.trim() || '';
    const timingPlan = document.querySelector('input[name="Timing_Plan"]:checked')?.value || 'Daycare Program';

    const p1Name = document.querySelector('#pickup1Name')?.value.trim() || '';
    const p1Phone = document.querySelector('#pickup1Phone')?.value.trim() || '';
    const p2Name = document.querySelector('#pickup2Name')?.value.trim() || '';
    const p2Phone = document.querySelector('#pickup2Phone')?.value.trim() || '';
    const p3Name = document.querySelector('#pickup3Name')?.value.trim() || '';
    const p3Phone = document.querySelector('#pickup3Phone')?.value.trim() || '';

    const data = {
      appId,
      submissionDate,
      childName,
      childDob: document.querySelector('#childDob')?.value || 'N/A',
      childAge: document.querySelector('#childAge')?.value.trim() || 'N/A',
      childGender: document.querySelector('#childGender')?.value || 'N/A',
      childBlood: document.querySelector('#childBlood')?.value || 'Not specified',
      childAllergies: document.querySelector('#childAllergies')?.value.trim() || 'None',
      childMedical: document.querySelector('#childMedical')?.value.trim() || 'None',
      fatherName: fatherName || 'N/A',
      fatherPhone: document.querySelector('#fatherPhone')?.value.trim() || 'N/A',
      fatherOccupation: document.querySelector('#fatherOccupation')?.value.trim() || 'N/A',
      motherName: motherName || 'N/A',
      motherPhone: document.querySelector('#motherPhone')?.value.trim() || 'N/A',
      motherOccupation: document.querySelector('#motherOccupation')?.value.trim() || 'N/A',
      residentialAddress: document.querySelector('#residentialAddress')?.value.trim() || 'N/A',
      emergencyName: document.querySelector('#emergencyName')?.value.trim() || 'N/A',
      emergencyRelation: document.querySelector('#emergencyRelation')?.value.trim() || 'N/A',
      emergencyPhone: document.querySelector('#emergencyPhone')?.value.trim() || 'N/A',
      pickup1: p1Name ? `${p1Name} (${p1Phone})` : 'N/A',
      pickup2: p2Name ? `${p2Name} (${p2Phone})` : 'N/A',
      pickup3: p3Name ? `${p3Name} (${p3Phone})` : 'N/A',
      timingPlan,
      preferredTiming: document.querySelector('#preferredTiming')?.value.trim() || 'Standard Daycare Hours',
      underMedication: document.querySelector('input[name="Under_Medication"]:checked')?.value || 'No',
      medicationDetails: document.querySelector('#medicationDetails')?.value.trim() || '',
      foodRestrictions: document.querySelector('input[name="Food_Restrictions"]:checked')?.value || 'No',
      foodRestrictionDetails: document.querySelector('#foodRestrictionDetails')?.value.trim() || '',
      parentSignature: document.querySelector('#parentSignature')?.value.trim() || parentName,
      declarationDate: document.querySelector('#declarationDate')?.value || submissionDate
    };

    // 1. Generate & trigger PDF download on user's device
    try {
      await generateAdmissionPDF(data);
    } catch (pdfErr) {
      console.error('PDF creation error:', pdfErr);
    }

    // 2. Submit form copy in background to FormSubmit
    try {
      const formData = new FormData(form);
      formData.append('Application_ID', appId);
      const actionUrl = form.getAttribute('action') || `https://formsubmit.co/ajax/${encodeURIComponent(ADMISSION_RECEIVER_EMAIL)}`;
      const endpoint = actionUrl.includes('/ajax/') ? actionUrl : actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      }).catch(err => console.warn('FormSubmit background notification error:', err));
    } catch (fetchErr) {
      console.warn('FormSubmit network error:', fetchErr);
    }

    // 3. Prepare WhatsApp Message URL with prefilled text
    const whatsappMsg = `Hello KidBee Day Care! 👋\n\nI have submitted an Admission Form for *${childName}* (App No: ${appId}).\n\n• Parent Name: ${parentName}\n• Contact: ${contactPhone}\n• Plan: ${timingPlan}\n\nI am attaching our downloaded admission PDF to this chat. Kindly confirm receipt. Thank you!`;
    const whatsappUrl = `https://wa.me/${DAYCARE_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

    // 4. Update Success Modal content and button
    if (parentNameSpan) parentNameSpan.innerText = parentName;
    if (childNameSpan) childNameSpan.innerText = childName;
    if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;

    if (modal) {
      modal.classList.add('active');
    }

    // 5. Automatically open WhatsApp after brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2200);

    form.reset();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }
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

/**
 * Creates an official, beautifully styled printable admission application and downloads it as PDF
 */
async function generateAdmissionPDF(data) {
  const container = document.createElement('div');
  container.className = 'admission-pdf-document';
  container.style.cssText = `
    width: 748px;
    max-width: 100%;
    background: #ffffff;
    color: #0f172a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    padding: 18px 22px;
    box-sizing: border-box;
    line-height: 1.35;
  `;

  container.innerHTML = `
    <!-- PDF Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #293A69; padding-bottom: 12px; margin-bottom: 14px;">
      <div>
        <h1 style="color: #293A69; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">KIDBEE DAY CARE</h1>
        <p style="color: #F35C2B; font-weight: 700; font-size: 13px; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">
          Daycare Admission Registration Form
        </p>
        <p style="color: #64748B; font-size: 11px; margin: 2px 0 0 0;">
          VTA Tower, Mathappuzha Road, Melechelari &bull; Phone: +91 81368 19858 &bull; Email: Kidbeedaycare@gmail.com
        </p>
      </div>
      <div style="text-align: right;">
        <div style="background: #FFFBEB; border: 1.5px solid #FDE68A; color: #B45309; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 6px; display: inline-block;">
          APP ID: ${data.appId}
        </div>
        <p style="color: #64748B; font-size: 10.5px; margin: 4px 0 0 0;">
          Submitted: <strong>${data.submissionDate}</strong>
        </p>
      </div>
    </div>

    <!-- Section 1: Child Details -->
    <div style="margin-bottom: 12px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <div style="background: #293A69; color: #FFFFFF; font-weight: 700; font-size: 11.5px; padding: 5px 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        1. Child Details
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <tr>
          <td style="padding: 6px 10px; width: 22%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Child's Name:</td>
          <td style="padding: 6px 10px; width: 38%; font-weight: 700; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childName}</td>
          <td style="padding: 6px 10px; width: 18%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Date of Birth:</td>
          <td style="padding: 6px 10px; width: 22%; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childDob}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Age:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childAge}</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Gender:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childGender}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Blood Group:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childBlood}</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Allergies:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.childAllergies}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC;">Medical Condition:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A;">${data.childMedical}</td>
        </tr>
      </table>
    </div>

    <!-- Section 2: Parent / Guardian Details -->
    <div style="margin-bottom: 12px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <div style="background: #293A69; color: #FFFFFF; font-weight: 700; font-size: 11.5px; padding: 5px 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        2. Parent / Guardian Details
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <tr>
          <td style="padding: 6px 10px; width: 22%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Father's Name:</td>
          <td style="padding: 6px 10px; width: 38%; font-weight: 600; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.fatherName}</td>
          <td style="padding: 6px 10px; width: 18%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Father Phone:</td>
          <td style="padding: 6px 10px; width: 22%; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.fatherPhone}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Father Occupation:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.fatherOccupation}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Mother's Name:</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.motherName}</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Mother Phone:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.motherPhone}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Mother Occupation:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.motherOccupation}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Residential Address:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.residentialAddress}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC;">Emergency Contact:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A;">
            <strong>${data.emergencyName}</strong> (${data.emergencyRelation}) &bull; Phone: <strong>${data.emergencyPhone}</strong>
          </td>
        </tr>
      </table>
    </div>

    <!-- Section 3: Pickup Authorization & Day Care Plan -->
    <div style="margin-bottom: 12px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <div style="background: #293A69; color: #FFFFFF; font-weight: 700; font-size: 11.5px; padding: 5px 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        3. Pickup Authorization & Day Care Plan
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <tr>
          <td style="padding: 6px 10px; width: 22%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Authorized 1:</td>
          <td style="padding: 6px 10px; width: 38%; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.pickup1}</td>
          <td style="padding: 6px 10px; width: 18%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Selected Plan:</td>
          <td style="padding: 6px 10px; width: 22%; font-weight: 700; color: #F35C2B; border-bottom: 1px solid #E2E8F0;">${data.timingPlan}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Authorized 2:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.pickup2}</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Preferred Hours:</td>
          <td style="padding: 6px 10px; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.preferredTiming}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC;">Authorized 3:</td>
          <td colspan="3" style="padding: 6px 10px; color: #0F172A;">${data.pickup3}</td>
        </tr>
      </table>
    </div>

    <!-- Section 4: Health Declaration & Consent -->
    <div style="margin-bottom: 12px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
      <div style="background: #293A69; color: #FFFFFF; font-weight: 700; font-size: 11.5px; padding: 5px 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        4. Health Declaration & Parent Consent
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <tr>
          <td style="padding: 6px 10px; width: 22%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Under Medication:</td>
          <td style="padding: 6px 10px; width: 28%; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.underMedication} ${data.medicationDetails ? '(' + data.medicationDetails + ')' : ''}</td>
          <td style="padding: 6px 10px; width: 22%; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Food Restrictions:</td>
          <td style="padding: 6px 10px; width: 28%; color: #0F172A; border-bottom: 1px solid #E2E8F0;">${data.foodRestrictions} ${data.foodRestrictionDetails ? '(' + data.foodRestrictionDetails + ')' : ''}</td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Daycare Rules:</td>
          <td colspan="3" style="padding: 6px 10px; color: #166534; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
            &#10003; Declared all information is true. Agreed to KidBee Day Care rules and regulations.
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC;">Parent Signature:</td>
          <td style="padding: 6px 10px; font-weight: 700; color: #293A69;">${data.parentSignature}</td>
          <td style="padding: 6px 10px; font-weight: 600; color: #475569; background: #F8FAFC;">Declaration Date:</td>
          <td style="padding: 6px 10px; color: #0F172A;">${data.declarationDate}</td>
        </tr>
      </table>
    </div>

    <!-- PDF Verification & WhatsApp Dispatch Note -->
    <div style="border-top: 1.5px dashed #CBD5E1; padding-top: 8px; margin-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748B;">
      <div>
        <span>Status: <strong style="color: #166534;">SUBMITTED &amp; VERIFIED</strong></span> &bull; 
        <span>KidBee Day Care Early Learning Center</span>
      </div>
      <div>
        <span>Share this downloaded PDF on WhatsApp to <strong>+91 81368 19858</strong></span>
      </div>
    </div>
  `;

  try {
    const filename = `KidBee_Admission_${data.childName.replace(/[^a-zA-Z0-9]/g, '_')}_${data.appId}.pdf`;
    const opt = {
      margin: [6, 6, 6, 6],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      await window.html2pdf().set(opt).from(container).save();
    } else {
      console.warn('html2pdf bundle not ready on window');
    }
  } catch (err) {
    console.error('PDF generation error:', err);
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
