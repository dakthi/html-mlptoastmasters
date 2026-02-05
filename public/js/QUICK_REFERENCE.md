# JavaScript Utilities - Quick Reference

Fast lookup for common tasks.

## Script Inclusion

```html
<script src="/js/main.js"></script>
<script src="/js/include-nav-footer.js"></script>
<script src="/js/blog.js"></script>
```

## Element Selection & DOM

```javascript
elementExists('.selector')         // boolean
getElement('#id')                 // Element | null
getElements('.class')             // NodeList
addListener('#btn', 'click', fn)  // Add single listener
addListeners('.btn', 'click', fn) // Add to multiple
```

## Data Loading

```javascript
loadJSON('/path/file.json')        // Promise<Object>
loadBlogPosts()                    // Promise<Array>
loadHTML('/path/file.html')        // Promise<string>
```

## Form Validation

```javascript
validateEmail('user@test.com')     // boolean
validateRequired('text', 2)        // boolean (min length)
validatePhone('555-1234567')       // boolean
getFormValue('#email')             // string (trimmed)
setFormValue('#email', 'val')      // void
showFieldError('#email', 'msg')    // void
clearFieldError('#email')          // void
```

## Gallery & Images

```javascript
initGallery('.gallery', '.gallery-image')
lazyLoadImages('img[data-src]')
```

## Interactive Elements

```javascript
smoothScroll('#section', 80)       // Scroll to element
initSmoothScroll()                 // All anchor links
toggleElement('#id')               // Toggle hidden class
showElement('#id')                 // Remove hidden class
hideElement('#id')                 // Add hidden class
initCollapse('[trigger]')          // Collapse/accordion
initCopyButton('#btn', '#text')    // Copy to clipboard
```

## Text & Date Utilities

```javascript
formatDate(date, 'MMM DD, YYYY')     // "Feb 05, 2025"
calculateReadingTime(text)           // minutes (number)
truncateText('long text', 50)        // "long text..."
slugify('Hello World')               // "hello-world"
getQueryParam('id')                  // "123"
getAllQueryParams()                  // {id: '123'}
```

## Notifications

```javascript
showNotification('Success!', 'success', 3000)
showNotification('Error!', 'error')
showNotification('Warning', 'warning')
showNotification('Info', 'info')
```

## Performance

```javascript
debounce(fn, 300)    // Wait for action to stop
throttle(fn, 1000)   // Limit call frequency
```

## Mobile Menu

```javascript
initMobileMenu()     // Manual init (auto-loads via include-nav-footer.js)
```

## Forms (Advanced)

```javascript
initFormHandler('#form-id',
  async (data) => { /* on valid submit */ },
  {
    email: {
      validate: validateEmail,
      error: 'Invalid email'
    }
  }
);
```

## Date Formats

```
YYYY   = 2025
MM     = 02 (padded)
MMM    = Feb
MMMM   = February
DD     = 05 (padded)
D      = 5
HH     = 14 (padded hours)
mm     = 30 (padded minutes)
ss     = 45 (padded seconds)
```

## CSS Classes Used

Mobile menu animations:
```css
.mobile-menu          /* Container for mobile menu */
.mobile-menu.active   /* When open */
```

Gallery lightbox:
```css
#lightbox             /* Lightbox container */
.field-error          /* Form error message */
#toast-container      /* Notification container */
```

## HTML Attributes for JS

Mobile menu:
```html
<button data-mobile-menu-btn>Menu</button>
<nav data-mobile-menu>Content</nav>
```

Collapse/Accordion:
```html
<button data-collapse-trigger data-collapse-target="id">Toggle</button>
<div id="id" data-collapse-content class="hidden">Content</div>
```

Lazy loading:
```html
<img data-src="image.jpg" src="placeholder.jpg" alt="">
```

Gallery:
```html
<div class="gallery">
  <img class="gallery-image" src="img1.jpg" alt="">
  <img class="gallery-image" src="img2.jpg" alt="">
</div>
```

## Blog Page Elements

Category filter buttons:
```html
<button class="category-filter active" data-category="All">All</button>
```

Blog grid:
```html
<div id="blog-posts-grid"></div>
```

Load more button:
```html
<div id="load-more-container" class="hidden">
  <button id="load-more-btn">Load More</button>
</div>
```

Newsletter:
```html
<input id="newsletter-email" type="email" placeholder="Email">
<button id="subscribe-btn">Subscribe</button>
```

## Blog Post Page Elements

Article content:
```html
<div id="article-content" class="prose"></div>
```

Author info:
```html
<div id="author-avatar">A</div>
<p id="author-name">Author Name</p>
<p id="author-bio">Bio text</p>
```

Metadata:
```html
<p id="publish-date">Date</p>
<p id="read-time">Minutes</p>
<p id="view-count">0</p>
```

Tags:
```html
<div id="article-tags"></div>
```

## Common Patterns

### Form Validation
```javascript
if (validateEmail(email) && validateRequired(name, 2)) {
  // Submit form
}
```

### Conditional Script Loading
```javascript
if (typeof showNotification === 'function') {
  showNotification('Ready!', 'success');
}
```

### Element Existence Check
```javascript
if (elementExists('#my-element')) {
  addListener('#my-element', 'click', handler);
}
```

### Data Loading with Error Handling
```javascript
try {
  const posts = await loadBlogPosts();
  renderPosts(posts);
} catch (error) {
  showNotification('Failed to load', 'error');
}
```

### URL Query String Navigation
```javascript
const category = getQueryParam('category');
if (category) {
  filterPostsByCategory(category);
}
```

## File Organization

```
public/
├── js/
│   ├── main.js                 # Core utilities
│   ├── include-nav-footer.js   # Layout manager
│   ├── blog.js                 # Blog page script
│   ├── blog-post.js            # Post page script
│   ├── README.md               # Full documentation
│   └── QUICK_REFERENCE.md      # This file
├── blog.html
├── blog-post.html
├── blog_posts.json             # Blog data
├── css/
│   └── styles.css
└── includes/
    ├── nav.html
    └── footer.html
```

## Tips

1. **Always check order**: main.js → include-nav-footer.js → page script
2. **Use debounce for**: Search inputs, filter operations
3. **Use throttle for**: Scroll events, resize handlers
4. **Validate emails before**: Newsletter signup, contact forms
5. **Use lazy load for**: Images below the fold
6. **Use smooth scroll for**: Long page navigation
7. **Check errors in**: Browser Console (DevTools)

## Related Files

- **Main reference**: `/public/js/README.md`
- **Implementation guide**: `/JAVASCRIPT_IMPLEMENTATION.md`
- **Blog data**: `/public/blog_posts.json`
- **Styles**: `/public/css/styles.css`

## Version Info

- Created: February 2025
- Last Updated: February 5, 2025
- Compatibility: ES6+ browsers
- Dependencies: None (external CDNs: Tailwind, marked.js)
