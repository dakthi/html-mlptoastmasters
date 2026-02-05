# MLP Toastmasters - Reusable Navigation & Footer System

This directory contains reusable HTML snippets and JavaScript for managing navigation and footer across all pages of the MLP Toastmasters website.

## Files

### HTML Snippets
- **nav.html** - Reusable navigation component with responsive mobile menu and search functionality
- **footer.html** - Reusable footer component with contact info, links, and social media
- **page-template.html** - Template showing best practices for integrating nav/footer

### Documentation
- **INTEGRATION_GUIDE.md** - Comprehensive guide for integrating components into pages
- **README.md** - This file

### JavaScript
- **../js/include-nav-footer.js** - JavaScript manager that loads and controls nav/footer

## Quick Start

To add navigation and footer to any page, add this single line to the `<head>`:

```html
<script src="/js/include-nav-footer.js" defer></script>
```

That's it! The navigation will be inserted at the top and the footer at the bottom automatically.

## Features

### Navigation Component
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Mobile Menu**: Hamburger menu with smooth animations
- **Search Functionality**: Search across blog posts and pages (2+ characters)
- **Accessibility**: ARIA labels and keyboard navigation support
- **Auto-Closing**: Mobile menu closes when links are clicked
- **Consistent Styling**: Uses Tailwind CSS for clean, modern appearance

### Footer Component
- **Multi-Column Layout**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Contact Section**: Meeting location and contact form link
- **Navigation Links**: Quick links to main pages
- **Meeting Schedule**: Current meeting times and location
- **Social Links**: Facebook integration
- **Auto-Updating Year**: Copyright year updates automatically
- **Responsive**: Fully mobile-friendly

## Implementation Examples

### Current Pages (Already Updated)
- `/blog.html` - Blog listing page
- `/blog-post.html` - Individual blog post page

### How to Update New Pages

1. Open your HTML file
2. Find the `<head>` section
3. Add after the Tailwind CSS CDN script:
```html
<!-- Navigation & Footer Manager -->
<script src="/js/include-nav-footer.js" defer></script>
```

## Technical Details

### How It Works

1. When the page loads, the `NavFooterManager` class initializes
2. It fetches `nav.html` and inserts it at the beginning of the body
3. It fetches `footer.html` and appends it to the end of the body
4. Event listeners are attached to mobile menu button and search inputs
5. Search functionality is set up for both desktop and mobile

### Search Integration

The search feature:
- Searches through `/blog_posts.json` for matching blog posts
- Debounces input (300ms) to reduce excessive searches
- Displays results in a dropdown with type badges
- Supports searching in title, excerpt, and category fields

### Mobile Menu

The mobile menu:
- Toggles with hamburger/X icon
- Updates `aria-expanded` attribute for accessibility
- Closes automatically when a link is clicked
- Uses CSS classes for styling (no inline styles)

## Customization

### Updating Navigation Links

Edit `/includes/nav.html`:
- Add/remove links in the `<nav>` element
- Update both desktop and mobile navigation sections
- Links automatically inherit hover effects

### Updating Footer Content

Edit `/includes/footer.html`:
- Update contact information
- Add/remove footer links
- Modify social media links
- Change meeting schedule information
- Update copyright text

### Color Customization

Current color scheme uses Tailwind's `blue-900` (#1e3a8a):
- Change `text-blue-900` for primary text color
- Change `hover:text-blue-900` for hover states
- Change `border-blue-900` for borders
- Change `bg-blue-900` for backgrounds

Example: To change to red, replace all `blue-900` with `red-900`

### CSS Classes Used

The components use these Tailwind CSS classes:
- `bg-*` - Background colors
- `text-*` - Text colors
- `border-*` - Border colors
- `hover:*` - Hover states
- `transition-*` - Smooth transitions
- `shadow-*` - Drop shadows
- `rounded-*` - Border radius
- `flex` - Flexbox layout
- `grid` - Grid layout
- `hidden` - Display none

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Mobile 90+

## Performance

- Navigation and footer are cached after first load
- No page reloads required when navigating
- Search is debounced (300ms) to reduce requests
- Minimal JavaScript footprint (~4KB)

## Accessibility

- ARIA labels for mobile menu toggle
- Semantic HTML structure
- Keyboard navigation support
- Proper link targets (`rel="noopener noreferrer"`)
- Screen reader friendly

## Security

- All external links use `target="_blank"` and `rel="noopener noreferrer"`
- Search input is properly escaped
- No inline event handlers
- Content Security Policy friendly

## Troubleshooting

### Navigation/Footer Not Showing

1. Check the script tag is in `<head>` (not in `<body>`)
2. Verify the path is `/js/include-nav-footer.js`
3. Check browser console (F12) for errors
4. Ensure Tailwind CSS CDN is loaded before the script

### Search Not Working

1. Verify `/blog_posts.json` exists
2. Check JSON structure matches expected format:
   ```json
   [
     {
       "id": 1,
       "title": "Post Title",
       "excerpt": "Post excerpt",
       "category": "Category"
     }
   ]
   ```
3. Check browser console for fetch errors
4. Ensure search input has at least 2 characters

### Mobile Menu Issues

1. Clear browser cache and reload
2. Check mobile menu button is visible on small screens
3. Verify JavaScript is enabled
4. Test in browser developer tools mobile mode

### Styling Issues

1. Verify Tailwind CSS CDN is loaded
2. Check for CSS conflicts with other stylesheets
3. Ensure no CSS is targeting and hiding the footer/nav
4. Clear browser cache

## API Reference

### NavFooterManager

```javascript
class NavFooterManager {
    constructor()           // Initialize and load components
    loadNavigation()       // Load nav.html
    loadFooter()           // Load footer.html
    setupMobileMenu()      // Set up mobile menu toggle
    setupSearch()          // Set up search functionality
    performSearch(query, container)  // Perform search
    updateFooterYear()     // Update copyright year
}
```

## Future Enhancements

Potential improvements:
1. Add sticky navigation option
2. Implement backend search API
3. Add dark mode toggle
4. Add language selector
5. Add newsletter signup
6. Cache components in localStorage
7. Add breadcrumb navigation
8. Add progress indicator for blog posts
9. Add to-top button
10. Add analytics integration

## Related Files

- `/blog.html` - Blog listing (updated to use nav/footer)
- `/blog-post.html` - Blog post template (updated to use nav/footer)
- `/page-template.html` - Best practices template (this directory)
- `/blog_posts.json` - Blog posts database (used by search)
- `/js/blog.js` - Blog-specific functionality
- `/js/blog-post.js` - Blog post-specific functionality

## Support

For issues or questions:
1. Check the `INTEGRATION_GUIDE.md` in this directory
2. Review the `page-template.html` for examples
3. Check browser console for error messages
4. Verify all files exist in correct locations

## Version History

- **v1.0** (2025-02-05) - Initial release
  - Responsive navigation with mobile menu
  - Footer with multi-column layout
  - Search functionality
  - Accessibility features
  - Documentation and templates

## License

Part of MLP Toastmasters website infrastructure.
