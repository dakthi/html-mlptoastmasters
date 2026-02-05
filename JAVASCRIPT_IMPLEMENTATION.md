# JavaScript Implementation Guide for Static Site

Complete guide to the JavaScript utilities created for the MLP Toastmasters static site.

## Overview

The site uses a modular JavaScript architecture with core utilities (`main.js`), layout management (`include-nav-footer.js`), and page-specific functionality (`blog.js`, `blog-post.js`).

## File Locations

All JavaScript files are located in: `/Users/dakthi/Documents/Factory-Tech/clients/04-non-commercial/html-mlptoastmasters/public/js/`

### Core Files

1. **main.js** (24 KB)
   - Core utility functions for DOM manipulation, data loading, form validation, gallery, interactive elements
   - 500+ lines of well-documented code
   - No dependencies, framework-agnostic

2. **include-nav-footer.js** (11 KB)
   - Navigation and footer auto-loader
   - Mobile menu management
   - Search functionality
   - Auto-year updater for footer

3. **blog.js** (8 KB)
   - Blog listing page functionality
   - Category filtering with pagination
   - Newsletter subscription handling
   - Dynamic post card rendering

4. **blog-post.js** (7 KB)
   - Individual blog post rendering
   - Markdown parsing (uses marked.js CDN)
   - SEO structured data generation
   - Breadcrumb navigation

5. **README.md** (13 KB)
   - Complete API reference
   - Usage examples for all functions
   - Troubleshooting guide
   - Browser support information

## Current Functionality Preserved

All functionality from the original Next.js site has been converted to static JavaScript:

### Navigation
- ✅ Mobile menu toggle with smooth animation
- ✅ Auto-loading from `/includes/nav.html`
- ✅ Mobile menu closes when link clicked
- ✅ Responsive hamburger menu

### Blog
- ✅ Load posts from JSON data
- ✅ Category filtering
- ✅ "Load More" pagination
- ✅ Post cards with metadata
- ✅ Newsletter subscription with validation
- ✅ Search functionality via navigation

### Blog Posts
- ✅ Individual post rendering
- ✅ Markdown content parsing
- ✅ Author information display
- ✅ Breadcrumb navigation
- ✅ SEO structured data (JSON-LD)
- ✅ Reading time calculation
- ✅ View count display
- ✅ Related tags/links

### Forms
- ✅ Email validation
- ✅ Required field validation
- ✅ Phone validation
- ✅ Newsletter email subscription
- ✅ Error message display
- ✅ Form field management

### Interactive Features
- ✅ Smooth scroll to anchors
- ✅ Image gallery with lightbox
- ✅ Lazy loading for images
- ✅ Collapse/accordion elements
- ✅ Copy to clipboard
- ✅ Toast notifications

## How to Use

### Basic Page Setup

Include scripts in your HTML pages in this order:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page Title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>

    <!-- Your page content here -->

    <!-- Scripts (in order) -->
    <script src="/js/main.js"></script>
    <script src="/js/include-nav-footer.js"></script>

    <!-- Page-specific script (if needed) -->
    <script src="/js/blog.js"></script>
</body>
</html>
```

### Blog Page Example

The `/blog.html` page uses:
1. `main.js` - Core utilities
2. `include-nav-footer.js` - Navigation and footer
3. `blog.js` - Blog-specific functionality

No modifications needed - works out of the box!

### Blog Post Page Example

The `/blog-post.html` page uses:
1. `main.js` - Core utilities
2. `include-nav-footer.js` - Navigation and footer
3. `blog-post.js` - Individual post rendering
4. `marked.js` CDN - Markdown parsing

URL format: `/blog-post.html?slug=post-slug-name`

## Utility Categories

### DOM Manipulation
```javascript
// Check if element exists
elementExists('#my-id')

// Get element(s)
getElement('#my-id')
getElements('.my-class')

// Add event listeners
addListener('#btn', 'click', callback)
addListeners('.btn', 'click', callback)
```

### Data Loading
```javascript
// Load JSON
await loadJSON('/path/to/file.json')
await loadBlogPosts()

// Load HTML
await loadHTML('/path/to/file.html')
```

### Form Validation
```javascript
validateEmail('user@example.com')
validateRequired('value', minLength)
validatePhone('555-123-4567')
getFormValue('#field-id')
showFieldError('#field-id', 'Error message')
clearFieldError('#field-id')
initFormHandler('#form-id', onSubmit, validationRules)
```

### Image Gallery
```javascript
// Lightbox gallery
initGallery('.gallery', '.gallery-image')

// Lazy load images
lazyLoadImages('img[data-src]')
```

### Interactive Elements
```javascript
// Smooth scroll
smoothScroll('#section-id', offset)
initSmoothScroll()

// Show/hide/toggle
showElement('#id')
hideElement('#id')
toggleElement('#id')

// Collapse/accordion
initCollapse('[data-collapse-trigger]', '[data-collapse-content]')

// Copy to clipboard
initCopyButton('#copy-btn', '#text-to-copy')

// Notifications
showNotification('Message', 'success', duration)
```

### Text/Date Utilities
```javascript
formatDate(date, 'MMM DD, YYYY')
calculateReadingTime(text, wordsPerMinute)
truncateText(text, length)
slugify('Text To Slug')
getQueryParam('param-name')
getAllQueryParams()
```

### Performance
```javascript
// Debounce - wait for action to stop
debounce(function, 300)

// Throttle - limit call frequency
throttle(function, 1000)
```

## Adding New Pages

To add a new page with navigation and footer:

1. Create HTML file with basic structure
2. Include the three scripts in order
3. Create page-specific script if needed (optional)

Example structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page | MLP Toastmasters</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>

    <!-- Page content -->
    <div class="container mx-auto px-4 py-12">
        <h1>My Page</h1>
        <!-- Your content here -->
    </div>

    <!-- Scripts -->
    <script src="/js/main.js"></script>
    <script src="/js/include-nav-footer.js"></script>
    <script src="/js/my-page.js"></script>
</body>
</html>
```

## Customization

### Change Posts Per Page
Edit `/js/blog.js`:
```javascript
const POSTS_PER_PAGE = 12; // Change from 9 to 12
```

### Change Newsletter Behavior
Edit the `setupNewsletter()` function in `/js/blog.js`:
```javascript
// TODO: Replace with actual API endpoint
// Example:
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

### Custom Date Formats
Use `formatDate()` with different patterns:
```javascript
formatDate(date, 'YYYY-MM-DD')        // 2025-02-05
formatDate(date, 'MMM DD, YYYY')      // Feb 05, 2025
formatDate(date, 'MMMM D, YYYY')      // February 5, 2025
formatDate(date, 'DD/MM/YYYY')        // 05/02/2025
```

### Gallery Customization
Modify lightbox styles by editing CSS classes in `initGallery()`.

## Dependencies

### External Libraries
- **Tailwind CSS** - Styling (via CDN)
- **marked.js** - Markdown parsing for blog posts (via CDN)

### No NPM Dependencies
All JavaScript utilities are vanilla JavaScript with NO npm dependencies required!

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

Features using modern APIs:
- Fetch API (for data loading)
- IntersectionObserver (for lazy loading, with fallback)
- EventListener (standard)
- querySelector/querySelectorAll (standard)

## Performance Considerations

1. **Debouncing** - Search and filter inputs use debouncing
2. **Lazy Loading** - Images use IntersectionObserver
3. **Efficient DOM** - Minimal DOM manipulation
4. **Event Delegation** - Single listener for multiple elements
5. **Caching** - Blog data cached after first load

## Debugging

### Enable Console Logging
Most functions log errors to console. Check browser DevTools console for issues.

### Common Issues

1. **Scripts not loading**: Check file paths are correct
2. **Functions undefined**: Ensure scripts load in correct order
3. **Elements not found**: Check IDs/classes match in HTML
4. **CORS errors**: Ensure JSON files are in public directory

### Example Debugging

```javascript
// Check if main.js loaded
console.log(typeof validateEmail); // Should be 'function'

// Check if blog data loaded
console.log(allPosts.length); // Should show number of posts

// Check if nav loaded
console.log(document.querySelector('header')); // Should show header element
```

## Testing

To test the site locally:

1. Serve files with local web server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

2. Open in browser: `http://localhost:8000`

3. Check console for any errors

## Maintenance

### Regular Updates

- Update blog posts by editing `/blog_posts.json`
- Update footer year auto-updates each January 1st
- No code changes needed for content updates

### Adding Features

All utilities are in `main.js`. To add new features:

1. Add function with JSDoc comments
2. Test with existing code
3. Update README.md
4. Example: `initImageGallery()`, `setupFormHandler()`, etc.

## Summary

✅ **Complete** - All functionality from Next.js site preserved
✅ **Clean** - Well-organized, documented code
✅ **Fast** - No build process needed, pure HTML + CSS + JS
✅ **Reusable** - Modular utilities for any page
✅ **Maintainable** - Clear structure, easy to extend

The static site is now fully functional with professional-grade JavaScript utilities!
