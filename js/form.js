/**
 * EAGLE EYES - ENQUIRY FORM & MANPOWER FILTERING
 * Dynamic pre-fills from URL parameters, client validation, loading state & submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initEnquiryForm();
  initManpowerFilters();
});

/**
 * Manpower Requirement Enquiry Form
 */
function initEnquiryForm() {
  const form = document.getElementById('manpowerEnquiryForm');
  const successState = document.getElementById('formSuccessState');
  if (!form) return;

  // Check URL Query Parameters for Pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const countryParam = urlParams.get('country');
  const serviceParam = urlParams.get('service');

  if (categoryParam) {
    const categorySelect = document.getElementById('jobCategory');
    if (categorySelect) {
      for (let option of categorySelect.options) {
        if (option.value.toLowerCase().includes(categoryParam.toLowerCase()) || 
            categoryParam.toLowerCase().includes(option.value.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  if (countryParam) {
    const countrySelect = document.getElementById('countryPreference');
    if (countrySelect) {
      for (let option of countrySelect.options) {
        if (option.value.toLowerCase() === countryParam.toLowerCase()) {
          option.selected = true;
          break;
        }
      }
    }
  }

  if (serviceParam) {
    const notes = document.getElementById('additionalRequirements');
    if (notes && !notes.value) {
      notes.value = `Interested in service: ${serviceParam.toUpperCase()}`;
    }
  }

  // Handle Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const companyNameInput = document.getElementById('companyName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const positionInput = document.getElementById('positionRequired');
    const categorySelect = document.getElementById('jobCategory');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Reset error states
    form.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
    form.querySelectorAll('.form-input, .form-select').forEach(input => input.classList.remove('error'));

    // Validate Required Fields
    const validateField = (input, condition) => {
      if (!condition) {
        input.classList.add('error');
        const parent = input.closest('.form-group');
        if (parent) parent.classList.add('has-error');
        isValid = false;
      }
    };

    validateField(fullNameInput, fullNameInput.value.trim().length > 1);
    validateField(companyNameInput, companyNameInput.value.trim().length > 1);
    
    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, emailRegex.test(emailInput.value.trim()));

    // Phone Validation (at least 6 digits)
    const phoneRegex = /[\d\s+\-()]{6,}/;
    validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()));

    validateField(positionInput, positionInput.value.trim().length > 1);
    validateField(categorySelect, categorySelect.value !== "");

    if (!isValid) {
      // Focus first error field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      Processing...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show Success State
      form.style.display = 'none';
      if (successState) {
        successState.style.display = 'block';
        const summaryElem = document.getElementById('successSummary');
        if (summaryElem) {
          summaryElem.textContent = `Thank you, ${fullNameInput.value.trim()}. Your manpower requirement for "${positionInput.value.trim()}" at ${companyNameInput.value.trim()} has been received. Our team will contact you shortly.`;
        }
      }
    }, 600);
  });

  // Reset form handler
  const resetBtn = document.getElementById('btnSubmitAnother');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successState) {
        successState.style.display = 'none';
      }
    });
  }
}

/**
 * Manpower Page Category Filter Tabs
 */
function initManpowerFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.manpower-full-card');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter');

      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
