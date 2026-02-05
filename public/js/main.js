/**
 * MLP Toastmasters - Main JavaScript Utilities
 * Handles core functionality for static site including:
 * - Navigation and mobile menu (via NavFooterManager)
 * - JSON data loading
 * - Form validation
 * - Image gallery
 * - Interactive elements
 *
 * USAGE: Include this script before page-specific scripts
 * <script src="/js/main.js"></script>
 * <script src="/js/include-nav-footer.js"></script> <!-- Handles nav/footer -->
 * <script src="/js/blog.js"></script> <!-- Page-specific script -->
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Utility to check if element exists
 * @param {string} selector - CSS selector
 * @returns {boolean} - True if element exists
 */
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

/**
 * Utility to safely get element
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} - Element or null
 */
function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * Utility to get multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList} - Collection of elements
 */
function getElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Add event listener with error handling
 * @param {string} selector - CSS selector
 * @param {string} event - Event type (e.g., 'click')
 * @param {Function} callback - Callback function
 */
function addListener(selector, event, callback) {
  const element = getElement(selector);
  if (element) {
    element.addEventListener(event, callback);
  }
}

/**
 * Add event listeners to multiple elements
 * @param {string} selector - CSS selector
 * @param {string} event - Event type
 * @param {Function} callback - Callback function
 */
function addListeners(selector, event, callback) {
  getElements(selector).forEach(el => {
    el.addEventListener(event, callback);
  });
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================================================
// DATA LOADING UTILITIES
// ============================================================================

/**
 * Load JSON data from a file
 * @param {string} url - Path to JSON file
 * @returns {Promise<Object|Array>} - Parsed JSON data
 * @throws {Error} - If fetch fails
 */
async function loadJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON from ${url}:`, error);
    throw error;
  }
}

/**
 * Load blog posts data
 * @returns {Promise<Array>} - Array of blog post objects
 */
async function loadBlogPosts() {
  return loadJSON('/blog_posts.json');
}

/**
 * Load content from HTML file (for nav/footer)
 * @param {string} url - Path to HTML file
 * @returns {Promise<string>} - HTML content as string
 */
async function loadHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading HTML from ${url}:`, error);
    throw error;
  }
}

// ============================================================================
// NAVIGATION & LAYOUT
// ============================================================================

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuButton = getElement('[data-mobile-menu-btn]');
  const mobileMenu = getElement('[data-mobile-menu]');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      const isActive = mobileMenu.classList.contains('active');

      if (isActive) {
        mobileMenu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.add('active');
        menuButton.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when a link is clicked
    getElements('[data-mobile-menu] a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Load navigation component
 * @param {string} containerId - ID of container where nav will be inserted
 * @param {string} navPath - Path to navigation HTML
 */
async function loadNavigation(containerId, navPath = '/includes/nav.html') {
  try {
    const container = getElement(`#${containerId}`);
    if (!container) return;

    const navHTML = await loadHTML(navPath);
    container.innerHTML = navHTML;

    // Initialize mobile menu after nav is loaded
    initMobileMenu();
  } catch (error) {
    console.warn(`Could not load navigation from ${navPath}:`, error);
  }
}

/**
 * Load footer component
 * @param {string} containerId - ID of container where footer will be inserted
 * @param {string} footerPath - Path to footer HTML
 */
async function loadFooter(containerId, footerPath = '/includes/footer.html') {
  try {
    const container = getElement(`#${containerId}`);
    if (!container) return;

    const footerHTML = await loadHTML(footerPath);
    container.innerHTML = footerHTML;
  } catch (error) {
    console.warn(`Could not load footer from ${footerPath}:`, error);
  }
}

/**
 * Initialize navigation and footer (combined)
 * @param {Object} options - Configuration options
 */
async function initLayout(options = {}) {
  const {
    navContainer = 'nav-container',
    navPath = '/includes/nav.html',
    footerContainer = 'footer-container',
    footerPath = '/includes/footer.html'
  } = options;

  // Load nav and footer in parallel
  try {
    await Promise.all([
      loadNavigation(navContainer, navPath),
      loadFooter(footerContainer, footerPath)
    ]);
  } catch (error) {
    console.error('Error initializing layout:', error);
  }
}

// ============================================================================
// FORM VALIDATION
// ============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length (optional)
 * @returns {boolean} - True if valid
 */
function validateRequired(value, minLength = 0) {
  return typeof value === 'string' && value.trim().length > minLength;
}

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if appears to be valid
 */
function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Get form field value with trimming
 * @param {string} selector - CSS selector for input
 * @returns {string} - Trimmed value
 */
function getFormValue(selector) {
  const element = getElement(selector);
  return element ? element.value.trim() : '';
}

/**
 * Set form field value
 * @param {string} selector - CSS selector for input
 * @param {string} value - Value to set
 */
function setFormValue(selector, value) {
  const element = getElement(selector);
  if (element) {
    element.value = value;
  }
}

/**
 * Show validation error
 * @param {string} fieldSelector - CSS selector for input field
 * @param {string} errorMessage - Error message to display
 */
function showFieldError(fieldSelector, errorMessage) {
  const field = getElement(fieldSelector);
  if (!field) return;

  // Add error class
  field.classList.add('border-red-500', 'ring-red-500');

  // Create/update error message element
  let errorEl = field.parentElement.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error text-red-500 text-sm mt-1';
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = errorMessage;
}

/**
 * Clear validation error for a field
 * @param {string} fieldSelector - CSS selector for input field
 */
function clearFieldError(fieldSelector) {
  const field = getElement(fieldSelector);
  if (!field) return;

  // Remove error class
  field.classList.remove('border-red-500', 'ring-red-500');

  // Remove error message
  const errorEl = field.parentElement.querySelector('.field-error');
  if (errorEl) {
    errorEl.remove();
  }
}

/**
 * Validate form with custom rules
 * @param {Object} fields - Object with field selector and validator function pairs
 * @returns {boolean} - True if all fields valid
 */
function validateForm(fields) {
  let isValid = true;

  Object.entries(fields).forEach(([selector, validator]) => {
    if (!validator(getFormValue(selector))) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Initialize form submission handler
 * @param {string} formSelector - CSS selector for form
 * @param {Function} onSubmit - Callback function on valid submission
 * @param {Object} validationRules - Field validation rules
 */
function initFormHandler(formSelector, onSubmit, validationRules = {}) {
  const form = getElement(formSelector);
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Clear all previous errors
    getElements(`${formSelector} input, ${formSelector} textarea`).forEach(field => {
      clearFieldError(`#${field.id}`);
    });

    // Validate form
    let isValid = true;
    const formData = {};

    Object.entries(validationRules).forEach(([fieldId, rule]) => {
      const value = getFormValue(`#${fieldId}`);
      formData[fieldId] = value;

      if (!rule.validate(value)) {
        showFieldError(`#${fieldId}`, rule.error);
        isValid = false;
      }
    });

    if (isValid) {
      await onSubmit(formData);
    }
  });
}

// ============================================================================
// IMAGE GALLERY
// ============================================================================

/**
 * Initialize lightbox gallery
 * @param {string} containerSelector - CSS selector for gallery container
 * @param {string} imageSelector - CSS selector for gallery images
 */
function initGallery(containerSelector = '.gallery', imageSelector = '.gallery-image') {
  const gallery = getElement(containerSelector);
  if (!gallery) return;

  const images = getElements(`${containerSelector} ${imageSelector}`);
  let currentIndex = 0;

  // Create lightbox HTML
  const lightbox = document.createElement('div');
  lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 hidden items-center justify-center z-50';
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="relative w-full h-full flex items-center justify-center">
      <button class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300" id="lightbox-close">&times;</button>
      <img id="lightbox-image" src="" alt="" class="max-h-[90vh] max-w-[90vw] object-contain">
      <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300" id="lightbox-prev">&lt;</button>
      <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gray-300" id="lightbox-next">&gt;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = getElement('#lightbox-image');
  const lightboxBtn = getElement('#lightbox-close');
  const prevBtn = getElement('#lightbox-prev');
  const nextBtn = getElement('#lightbox-next');

  /**
   * Open lightbox with image
   * @param {number} index - Image index
   */
  function openLightbox(index) {
    currentIndex = index;
    const img = images[index];
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Gallery image';
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close lightbox
   */
  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }

  /**
   * Show next image
   */
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  /**
   * Show previous image
   */
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  // Add click handlers to gallery images
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(index));
  });

  // Close button
  lightboxBtn.addEventListener('click', closeLightbox);

  // Navigation buttons
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  });
}

/**
 * Lazy load images
 * @param {string} imageSelector - CSS selector for images to lazy load
 */
function lazyLoadImages(imageSelector = 'img[data-src]') {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    getElements(imageSelector).forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  getElements(imageSelector).forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================================================
// INTERACTIVE ELEMENTS
// ============================================================================

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector for target element
 * @param {number} offset - Scroll offset in pixels
 */
function smoothScroll(selector, offset = 0) {
  const element = getElement(selector);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
  addListeners('a[href^="#"]', 'click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    smoothScroll(href);
  });
}

/**
 * Toggle element visibility
 * @param {string} selector - CSS selector for element
 * @param {string} className - CSS class to toggle
 */
function toggleElement(selector, className = 'hidden') {
  const element = getElement(selector);
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * Show element
 * @param {string} selector - CSS selector
 * @param {string} className - Class to remove (default 'hidden')
 */
function showElement(selector, className = 'hidden') {
  const element = getElement(selector);
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Hide element
 * @param {string} selector - CSS selector
 * @param {string} className - Class to add (default 'hidden')
 */
function hideElement(selector, className = 'hidden') {
  const element = getElement(selector);
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Initialize collapse/accordion functionality
 * @param {string} triggerSelector - CSS selector for collapse triggers
 * @param {string} contentSelector - CSS selector for collapse content
 */
function initCollapse(triggerSelector = '[data-collapse-trigger]', contentSelector = '[data-collapse-content]') {
  addListeners(triggerSelector, 'click', function() {
    const targetId = this.getAttribute('data-collapse-target');
    const content = getElement(`#${targetId}`);

    if (!content) return;

    const isOpen = content.classList.contains('hidden');

    if (isOpen) {
      showElement(`#${targetId}`);
      this.setAttribute('aria-expanded', 'true');
    } else {
      hideElement(`#${targetId}`);
      this.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Add copy-to-clipboard functionality
 * @param {string} buttonSelector - CSS selector for copy button
 * @param {string} textSelector - CSS selector for text to copy
 */
function initCopyButton(buttonSelector, textSelector) {
  addListener(buttonSelector, 'click', function() {
    const textElement = getElement(textSelector);
    if (!textElement) return;

    const text = textElement.textContent;

    navigator.clipboard.writeText(text).then(() => {
      const originalText = this.textContent;
      this.textContent = 'Copied!';

      setTimeout(() => {
        this.textContent = originalText;
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text:', err);
    });
  });
}

// ============================================================================
// UTILITY HELPERS
// ============================================================================

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format pattern (e.g., 'MMM DD, YYYY')
 * @returns {string} - Formatted date
 */
function formatDate(date, format = 'MMM DD, YYYY') {
  const d = new Date(date);

  const dateObj = {
    'YYYY': d.getFullYear(),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'MMM': d.toLocaleString('default', { month: 'short' }),
    'MMMM': d.toLocaleString('default', { month: 'long' }),
    'DD': String(d.getDate()).padStart(2, '0'),
    'D': d.getDate(),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'ss': String(d.getSeconds()).padStart(2, '0')
  };

  let formatted = format;
  Object.entries(dateObj).forEach(([key, value]) => {
    formatted = formatted.replace(key, value);
  });

  return formatted;
}

/**
 * Calculate reading time
 * @param {string} text - Text to calculate reading time for
 * @param {number} wordsPerMinute - Words per minute (default 200)
 * @returns {number} - Reading time in minutes
 */
function calculateReadingTime(text, wordsPerMinute = 200) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
function truncateText(text, length) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Create URL slug from text
 * @param {string} text - Text to slugify
 * @returns {string} - URL-safe slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Get URL query parameter
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Get all URL query parameters
 * @returns {Object} - Object of all parameters
 */
function getAllQueryParams() {
  const params = {};
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Show notification/toast message
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info', 'warning'
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
  // Create toast container if it doesn't exist
  let container = getElement('#toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 space-y-2 z-50';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type] || 'bg-blue-500';

  toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`;
  toast.textContent = message;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.remove();
  }, duration);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all common functionality
 * @param {Object} options - Configuration options
 */
async function initApp(options = {}) {
  const {
    enableSmoothScroll = true,
    enableLazyLoad = true,
    enableGallery = true,
    gallerySelector = '.gallery',
    mobileMenu = true,
    lazyLoadSelector = 'img[data-src]'
  } = options;

  // Initialize mobile menu
  if (mobileMenu) {
    initMobileMenu();
  }

  // Enable smooth scroll
  if (enableSmoothScroll) {
    initSmoothScroll();
  }

  // Enable lazy loading
  if (enableLazyLoad) {
    lazyLoadImages(lazyLoadSelector);
  }

  // Initialize gallery if found
  if (enableGallery) {
    initGallery(gallerySelector);
  }
}

// ============================================================================
// EXPORT FOR MODULE USAGE
// ============================================================================

// If using as module (ESM)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Utilities
    elementExists,
    getElement,
    getElements,
    addListener,
    addListeners,
    debounce,
    throttle,

    // Data loading
    loadJSON,
    loadBlogPosts,
    loadHTML,

    // Layout
    initMobileMenu,
    loadNavigation,
    loadFooter,
    initLayout,

    // Forms
    validateEmail,
    validateRequired,
    validatePhone,
    getFormValue,
    setFormValue,
    showFieldError,
    clearFieldError,
    validateForm,
    initFormHandler,

    // Gallery
    initGallery,
    lazyLoadImages,

    // Interactive
    smoothScroll,
    initSmoothScroll,
    toggleElement,
    showElement,
    hideElement,
    initCollapse,
    initCopyButton,

    // Helpers
    formatDate,
    calculateReadingTime,
    truncateText,
    slugify,
    getQueryParam,
    getAllQueryParams,
    showNotification,

    // App init
    initApp
  };
}
