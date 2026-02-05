# MLP Toastmasters JavaScript Utilities

Complete documentation for the JavaScript utilities that power the static site.

## File Structure

```
js/
├── main.js                 # Core utilities and helper functions
├── include-nav-footer.js   # Navigation and footer management
├── blog.js                 # Blog page functionality
├── blog-post.js            # Individual blog post page
└── README.md              # This file
```

## Quick Start

### Basic Page Setup

Include scripts in this order:

```html
<!-- Core utilities -->
<script src="/js/main.js"></script>

<!-- Navigation and footer (auto-loads and initializes) -->
<script src="/js/include-nav-footer.js"></script>

<!-- Page-specific script -->
<script src="/js/blog.js"></script>
```

## main.js - Core Utilities

The `main.js` file contains reusable utility functions organized into categories.

### DOM Utilities

#### Element Selection
```javascript
// Check if element exists
elementExists('#my-element')  // Returns boolean

// Get single element
getElement('#my-element')     // Returns HTMLElement or null

// Get multiple elements
getElements('.my-class')      // Returns NodeList
```

#### Event Listeners
```javascript
// Add listener to single element
addListener('#button', 'click', () => {
  console.log('Button clicked');
});

// Add listener to multiple elements
addListeners('.btn', 'click', () => {
  console.log('Button clicked');
});
```

#### Performance Optimization
```javascript
// Debounce function - wait for user to stop typing
const debouncedSearch = debounce(function(query) {
  performSearch(query);
}, 300); // Wait 300ms after typing stops

// Throttle function - limit function calls
const throttledScroll = throttle(function() {
  updateScrollIndicator();
}, 1000); // Call max once per second

window.addEventListener('scroll', throttledScroll);
```

### Data Loading

#### Load JSON Files
```javascript
// Load blog posts
const posts = await loadJSON('/blog_posts.json');

// Or use convenience function
const posts = await loadBlogPosts();

// Load HTML content (for nav/footer if needed)
const navHtml = await loadHTML('/includes/nav.html');
```

### Navigation & Layout

#### Mobile Menu
```javascript
// Initialize mobile menu (auto-called by include-nav-footer.js)
initMobileMenu();
```

HTML structure needed:
```html
<button data-mobile-menu-btn>Menu</button>
<nav data-mobile-menu>
  <!-- Mobile menu content -->
</nav>
```

#### Load Navigation & Footer
```javascript
// Load both (convenience function)
await initLayout({
  navContainer: 'nav-container',     // Element ID for nav
  navPath: '/includes/nav.html',     // Path to nav file
  footerContainer: 'footer-container',
  footerPath: '/includes/footer.html'
});

// Or load individually
await loadNavigation('nav-container', '/includes/nav.html');
await loadFooter('footer-container', '/includes/footer.html');
```

### Form Validation

#### Email Validation
```javascript
if (validateEmail('user@example.com')) {
  console.log('Valid email');
}
```

#### Required Field Validation
```javascript
// Check if not empty
if (validateRequired('username')) {
  console.log('Username provided');
}

// Check if longer than minimum
if (validateRequired('password', 8)) {
  console.log('Password is 8+ characters');
}
```

#### Phone Validation
```javascript
if (validatePhone('555-123-4567')) {
  console.log('Valid phone');
}
```

#### Form Field Operations
```javascript
// Get value with trimming
const value = getFormValue('#email-input');

// Set value
setFormValue('#email-input', 'new@example.com');

// Show error on field
showFieldError('#email-input', 'Invalid email address');

// Clear error
clearFieldError('#email-input');
```

#### Advanced Form Handling
```javascript
// Validate entire form with rules
const validationRules = {
  email: {
    validate: (val) => validateEmail(val),
    error: 'Invalid email'
  },
  name: {
    validate: (val) => validateRequired(val, 2),
    error: 'Name must be at least 2 characters'
  }
};

if (validateForm(validationRules)) {
  console.log('Form is valid');
}

// Initialize form handler with validation
initFormHandler('#my-form',
  async (formData) => {
    // formData contains validated field values
    console.log('Form submitted:', formData);
  },
  {
    email: {
      validate: validateEmail,
      error: 'Please enter a valid email'
    },
    message: {
      validate: (val) => validateRequired(val, 10),
      error: 'Message must be at least 10 characters'
    }
  }
);
```

### Image Gallery

#### Lightbox Gallery
```javascript
// Initialize gallery
initGallery('.gallery', '.gallery-image');
```

HTML structure:
```html
<div class="gallery">
  <img src="image1.jpg" alt="Gallery 1" class="gallery-image">
  <img src="image2.jpg" alt="Gallery 2" class="gallery-image">
</div>
```

Features:
- Click image to open lightbox
- Arrow keys / buttons to navigate
- Escape key to close
- Click background to close

#### Lazy Load Images
```javascript
// Load images only when visible
lazyLoadImages('img[data-src]');
```

HTML structure:
```html
<img data-src="large-image.jpg" src="placeholder.jpg" alt="">
```

### Interactive Elements

#### Smooth Scrolling
```javascript
// Scroll to element
smoothScroll('#section-id');

// Scroll with offset (for fixed header)
smoothScroll('#section-id', 80);

// Auto-initialize for all anchor links
initSmoothScroll();
```

#### Show/Hide Elements
```javascript
// Toggle visibility
toggleElement('#my-element');

// Toggle custom class
toggleElement('#my-element', 'custom-hidden');

// Show element
showElement('#my-element');

// Hide element
hideElement('#my-element');
```

#### Collapse/Accordion
```javascript
initCollapse(
  '[data-collapse-trigger]',  // Button selector
  '[data-collapse-content]'   // Content selector
);
```

HTML structure:
```html
<button data-collapse-trigger data-collapse-target="content-1">
  Toggle Section
</button>
<div id="content-1" data-collapse-content class="hidden">
  Hidden content goes here
</div>
```

#### Copy to Clipboard
```javascript
initCopyButton('#copy-btn', '#text-to-copy');
```

### Utility Helpers

#### Date Formatting
```javascript
const date = new Date('2025-02-05');

// Format date
formatDate(date, 'MMM DD, YYYY')  // "Feb 05, 2025"
formatDate(date, 'MMMM D, YYYY')  // "February 5, 2025"
formatDate(date, 'YYYY-MM-DD')    // "2025-02-05"

// Available patterns: YYYY, MM, MMM, MMMM, DD, D, HH, mm, ss
```

#### Reading Time Calculation
```javascript
const article = document.getElementById('article').textContent;
const minutes = calculateReadingTime(article);
console.log(`${minutes} minute read`);

// Custom WPM (default 200)
const slowReading = calculateReadingTime(article, 150);
```

#### Text Truncation
```javascript
const longText = "This is a very long text...";
const short = truncateText(longText, 50);
// "This is a very long text that goes on and on..."
```

#### URL Slug Creation
```javascript
const slug = slugify('Hello World Example');
// "hello-world-example"
```

#### URL Query Parameters
```javascript
// Get single parameter
const postId = getQueryParam('id');

// Get all parameters
const allParams = getAllQueryParams();
// Returns: { id: '123', category: 'blog', page: '1' }
```

#### Notifications/Toasts
```javascript
// Success notification
showNotification('Article published!', 'success');

// Error notification
showNotification('Failed to save.', 'error');

// Warning
showNotification('Please verify email.', 'warning');

// Info (default)
showNotification('Update available.', 'info');

// Custom duration (default 3000ms)
showNotification('Quick message', 'info', 1500);
```

## include-nav-footer.js - Navigation Manager

Automatically loads and manages navigation and footer components.

### Features

- **Auto-loads** nav.html and footer.html from `/includes/` directory
- **Mobile menu** toggle with keyboard support
- **Search functionality** with debouncing
- **Auto-updates** footer year
- **Prevents duplicates** if called multiple times

### Configuration

No configuration needed - auto-initializes on page load.

### Custom Search Implementation

The default search looks through blog posts. To customize:

1. Edit the `performSearch()` method in `include-nav-footer.js`
2. Implement your API endpoint or search logic
3. Return results in the expected format

## blog.js - Blog Page

Manages blog listing page functionality.

### Features

- **Load posts** from JSON
- **Filter by category** with visual feedback
- **Pagination** with "Load More" button
- **Newsletter subscription** with validation
- **Responsive grid** layout

### Functions

```javascript
// Load all blog posts
loadBlogPosts();

// Filter by category
filterPostsByCategory('Education');

// Display current page
displayPosts();

// Load more posts
loadMorePosts();

// Newsletter handling
setupNewsletter();
```

### Configuration

```javascript
const POSTS_PER_PAGE = 9;  // Posts per page
const postsPerPage = 9;     // Legacy variable
```

## blog-post.js - Individual Post Page

Handles individual blog post rendering.

### Features

- **Markdown parsing** using marked.js
- **SEO structured data** generation
- **Breadcrumb navigation**
- **Author information** display
- **Related content** links
- **View tracking** display

### Uses

- **marked.js** CDN for markdown rendering
- **Structured data** for search engines

## Complete Example

### Blog Page HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Blog | MLP Toastmasters</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Category filters -->
  <div class="mb-8 flex flex-wrap gap-3">
    <button class="category-filter active" data-category="All">All</button>
    <button class="category-filter" data-category="Getting Started">Getting Started</button>
    <button class="category-filter" data-category="Education">Education</button>
  </div>

  <!-- Blog posts grid -->
  <div id="blog-posts-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Posts loaded dynamically -->
  </div>

  <!-- Load more button -->
  <div id="load-more-container" class="mt-12 text-center hidden">
    <button id="load-more-btn" class="px-8 py-3 bg-blue-900 text-white rounded">
      Load More
    </button>
  </div>

  <!-- Newsletter CTA -->
  <section class="py-12 bg-blue-50">
    <input id="newsletter-email" type="email" placeholder="Enter your email">
    <button id="subscribe-btn">Subscribe</button>
  </section>

  <!-- Scripts -->
  <script src="/js/main.js"></script>
  <script src="/js/include-nav-footer.js"></script>
  <script src="/js/blog.js"></script>
</body>
</html>
```

## API Reference

### All Main.js Functions

**Element Selection:** `elementExists`, `getElement`, `getElements`
**Event Listeners:** `addListener`, `addListeners`
**Performance:** `debounce`, `throttle`
**Data Loading:** `loadJSON`, `loadBlogPosts`, `loadHTML`
**Layout:** `initMobileMenu`, `loadNavigation`, `loadFooter`, `initLayout`
**Forms:** `validateEmail`, `validateRequired`, `validatePhone`, `getFormValue`, `setFormValue`, `showFieldError`, `clearFieldError`, `validateForm`, `initFormHandler`
**Gallery:** `initGallery`, `lazyLoadImages`
**Interactive:** `smoothScroll`, `initSmoothScroll`, `toggleElement`, `showElement`, `hideElement`, `initCollapse`, `initCopyButton`
**Helpers:** `formatDate`, `calculateReadingTime`, `truncateText`, `slugify`, `getQueryParam`, `getAllQueryParams`, `showNotification`
**Initialization:** `initApp`

## Troubleshooting

### Script Execution Order
Scripts must load in this order:
1. main.js (core utilities)
2. include-nav-footer.js (layout)
3. Page-specific script (blog.js, etc.)

### Elements Not Found
Ensure elements have correct IDs/classes matching selectors in JavaScript.

### Navigation Not Loading
Check that `/includes/nav.html` and `/includes/footer.html` exist.

### Form Validation Not Working
Ensure form elements have proper `id` attributes matching JavaScript selectors.

### Lazy Images Not Loading
Add `data-src` attribute instead of `src`:
```html
<img data-src="image.jpg" alt="">
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript support required
- IntersectionObserver for lazy loading (fallback included)

## Performance Tips

1. Use `debounce()` for search/filter inputs
2. Use `throttle()` for scroll events
3. Use lazy loading for images below the fold
4. Load JSON data once, cache in variables
5. Use delegated event listeners for dynamic content

## Contributing

When adding new utilities:
1. Add JSDoc comments with full documentation
2. Keep functions pure and reusable
3. Add backward compatibility checks
4. Test with existing scripts
5. Update this README

## License

Part of MLP Toastmasters website
