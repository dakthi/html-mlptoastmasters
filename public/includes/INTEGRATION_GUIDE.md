# Navigation and Footer Integration Guide

This guide explains how to use the reusable navigation and footer HTML snippets in your pages.

## Overview

The navigation and footer are now available as reusable HTML snippets:

- **Navigation**: `/includes/nav.html`
- **Footer**: `/includes/footer.html`
- **JavaScript Manager**: `/js/include-nav-footer.js`

These snippets are dynamically loaded and included in all pages using JavaScript, eliminating the need to maintain multiple copies.

## Features

### Navigation
- Responsive design with mobile hamburger menu
- Desktop and mobile search functionality
- Active link states
- Accessible menu toggle with ARIA attributes
- Auto-closes mobile menu when links are clicked

### Footer
- 4-column grid layout (responsive to 2 columns on tablet, 1 column on mobile)
- Contact information section
- Navigation links
- Meeting schedule details
- Social media links (Facebook)
- Copyright with auto-updating year
- Consistent branding with navigation

## How to Integrate

### Step 1: Add the Script Tag

Add this single line to the `<head>` of every HTML page:

```html
<script src="/js/include-nav-footer.js" defer></script>
```

Place it after your other scripts but before closing the `</head>` tag.

### Example HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | MLP Toastmasters</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Navigation & Footer Manager -->
    <script src="/js/include-nav-footer.js" defer></script>
</head>
<body>
    <!-- Navigation will be inserted here automatically -->

    <!-- Your page content -->
    <main>
        <!-- Your content here -->
    </main>

    <!-- Footer will be appended here automatically -->

    <!-- Your page-specific scripts -->
    <script src="/js/your-script.js"></script>
</body>
</html>
```

### Step 2: Update Existing Pages

For existing pages like `blog.html` and `blog-post.html`:

1. Remove any hardcoded navigation or footer HTML if present
2. Add `<script src="/js/include-nav-footer.js" defer></script>` to the `<head>`
3. The navigation and footer will be automatically inserted at page load

## Customization

### Modifying Navigation Links

Edit `/includes/nav.html` to add or remove navigation items:

```html
<a href="/your-page" class="text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors tracking-wide">
    YOUR LINK
</a>
```

Add the same link to both desktop and mobile navigation sections.

### Modifying Footer Content

Edit `/includes/footer.html` to update:
- Contact information
- Navigation links
- Meeting schedule
- Social media links
- Copyright text

### Styling Adjustments

The snippets use Tailwind CSS classes. To modify colors:

1. Change `text-blue-900` to your preferred color class
2. Change `hover:text-blue-900` to your preferred hover color
3. Update border colors as needed

Current color scheme:
- Primary: `blue-900` (#1e3a8a)
- Secondary text: `gray-600` (#4b5563)
- Borders: `gray-200` (#e5e7eb)

## Search Functionality

### How Search Works

1. User types in the search input (desktop or mobile)
2. After 2+ characters, search is triggered with 300ms debounce
3. The system searches through `blog_posts.json` for matches
4. Results are displayed in a dropdown

### Customizing Search

Edit the `performSearch()` method in `/js/include-nav-footer.js` to:
- Add API endpoints for searching
- Search additional content types
- Customize result formatting
- Add filtering or sorting

### Expected blog_posts.json Structure

```json
[
    {
        "id": 1,
        "title": "Article Title",
        "excerpt": "Article excerpt...",
        "category": "Category Name",
        "content": "Full content..."
    }
]
```

## Mobile Menu Behavior

The mobile menu:
- Opens when the hamburger icon is clicked
- Closes when a link is clicked
- Closes when clicking outside (desktop)
- Updates the hamburger icon to an X when open
- Uses ARIA attributes for accessibility

The toggle button's `aria-expanded` attribute updates automatically for screen readers.

## JavaScript API

### NavFooterManager Class

The `NavFooterManager` class handles all functionality:

```javascript
// Initialize (happens automatically)
const manager = new NavFooterManager();

// Methods available:
// manager.loadNavigation() - Loads nav snippet
// manager.loadFooter() - Loads footer snippet
// manager.setupMobileMenu() - Sets up menu toggle
// manager.setupSearch() - Sets up search functionality
// manager.performSearch(query, resultsContainer) - Performs search
// manager.updateFooterYear() - Updates year in copyright
```

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)

Uses modern JavaScript features (ES6+), but no external dependencies besides Tailwind CSS.

## Troubleshooting

### Navigation/Footer Not Appearing

1. Check that the script tag is present in `<head>`
2. Ensure `include-nav-footer.js` exists at `/js/include-nav-footer.js`
3. Check browser console for errors
4. Verify Tailwind CSS is loaded before the script

### Search Not Working

1. Verify `blog_posts.json` exists at `/blog_posts.json`
2. Check the JSON structure matches the expected format
3. Open browser console and check for fetch errors

### Mobile Menu Stuck

1. Clear browser cache
2. Check that the script loaded correctly (F12 > Network tab)
3. Try refreshing the page

### Styling Issues

1. Ensure Tailwind CSS CDN is loaded
2. Check for CSS conflicts with other stylesheets
3. Verify all Tailwind classes are present in HTML

## Performance Notes

- The script uses deferred loading with `defer` attribute
- Navigation and footer are cached after first load
- Search queries are debounced to reduce unnecessary searches
- No external dependencies except Tailwind CSS

## Security Notes

- Links are properly sanitized with target="_blank" and rel="noopener noreferrer" for external links
- Search input is escaped when displaying results
- ARIA attributes ensure accessibility compliance

## Future Enhancements

Potential improvements:
1. Add sticky navigation option
2. Implement actual backend search API
3. Add theme toggle (dark mode)
4. Add language selector
5. Add newsletter signup in footer
6. Cache navigation/footer in localStorage for offline viewing
7. Add breadcrumb navigation in main content

## Support

For issues or questions about the integration, refer to:
- `/includes/nav.html` - Navigation HTML
- `/includes/footer.html` - Footer HTML
- `/js/include-nav-footer.js` - JavaScript implementation
