/**
 * MLP Toastmasters - Navigation and Footer Inclusion
 * Dynamically includes nav.html and footer.html snippets
 * Handles mobile menu interactions and search functionality
 */

class NavFooterManager {
    constructor() {
        this.navContainer = null;
        this.footerContainer = null;
        this.mobileMenuBtn = null;
        this.mobileMenu = null;
        this.init();
    }

    /**
     * Initialize the navigation and footer inclusion
     */
    async init() {
        try {
            // Load navigation and footer
            await this.loadNavigation();
            await this.loadFooter();

            // Setup event listeners after DOM is ready
            this.setupMobileMenu();
            this.setupSearch();
            this.updateFooterYear();
        } catch (error) {
            console.error('Error initializing nav/footer:', error);
        }
    }

    /**
     * Load navigation HTML snippet
     */
    async loadNavigation() {
        try {
            // Check if nav already exists to avoid duplicates
            const existingNav = document.querySelector('header');
            if (existingNav && existingNav.querySelector('.container')) {
                this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                this.mobileMenu = document.querySelector('.mobile-menu');
                return;
            }

            const response = await fetch('/includes/nav.html');
            if (!response.ok) {
                throw new Error(`Failed to load navigation: ${response.status}`);
            }

            const navHTML = await response.text();

            // Insert navigation at the beginning of body
            const navContainer = document.createElement('div');
            navContainer.innerHTML = navHTML;
            document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);

            // Store references for later use
            this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            this.mobileMenu = document.querySelector('.mobile-menu');
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }

    /**
     * Load footer HTML snippet
     */
    async loadFooter() {
        try {
            // Check if footer already exists to avoid duplicates
            const existingFooter = document.querySelector('footer');
            if (existingFooter && existingFooter.querySelector('.container')) {
                return;
            }

            const response = await fetch('/includes/footer.html');
            if (!response.ok) {
                throw new Error(`Failed to load footer: ${response.status}`);
            }

            const footerHTML = await response.text();

            // Append footer at the end of body
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = footerHTML;
            document.body.appendChild(footerContainer.firstElementChild);
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    /**
     * Setup mobile menu toggle functionality
     */
    setupMobileMenu() {
        if (!this.mobileMenuBtn) return;

        this.mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = this.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            this.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

            // Toggle menu visibility
            if (this.mobileMenu) {
                this.mobileMenu.classList.toggle('hidden');
            }

            // Toggle icon visibility
            const menuIcon = this.mobileMenuBtn.querySelector('.menu-icon');
            const closeIcon = this.mobileMenuBtn.querySelector('.close-icon');
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = this.mobileMenu?.querySelectorAll('a');
        if (mobileLinks) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    this.mobileMenu.classList.add('hidden');

                    const menuIcon = this.mobileMenuBtn.querySelector('.menu-icon');
                    const closeIcon = this.mobileMenuBtn.querySelector('.close-icon');
                    if (menuIcon && closeIcon) {
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                });
            });
        }
    }

    /**
     * Setup search functionality (basic implementation)
     * Can be extended with actual search API integration
     */
    setupSearch() {
        // Desktop search
        const desktopSearchInput = document.querySelector('.search-input');
        const desktopSearchResults = document.querySelector('.search-results');

        if (desktopSearchInput) {
            let searchTimeout;
            desktopSearchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();

                if (query.length < 2) {
                    if (desktopSearchResults) {
                        desktopSearchResults.classList.add('hidden');
                    }
                    return;
                }

                // Debounce search
                searchTimeout = setTimeout(() => {
                    this.performSearch(query, desktopSearchResults);
                }, 300);
            });

            // Close search results when clicking outside
            document.addEventListener('mousedown', (e) => {
                if (!e.target.closest('.search-container') && desktopSearchResults) {
                    desktopSearchResults.classList.add('hidden');
                }
            });
        }

        // Mobile search
        const mobileSearchInput = document.querySelector('.mobile-search-input');
        const mobileSearchResults = document.querySelector('.mobile-search-results');

        if (mobileSearchInput) {
            let searchTimeout;
            mobileSearchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();

                if (query.length < 2) {
                    if (mobileSearchResults) {
                        mobileSearchResults.classList.add('hidden');
                    }
                    return;
                }

                // Debounce search
                searchTimeout = setTimeout(() => {
                    this.performSearch(query, mobileSearchResults);
                }, 300);
            });
        }
    }

    /**
     * Perform search (placeholder implementation)
     * This searches through blog posts and pages
     */
    async performSearch(query, resultsContainer) {
        if (!resultsContainer) return;

        try {
            resultsContainer.innerHTML = '<div class="p-4 text-center text-gray-500"><div class="text-sm">Searching...</div></div>';
            resultsContainer.classList.remove('hidden');

            // Try to fetch blog posts for searching
            let searchResults = [];

            try {
                const response = await fetch('/blog_posts.json');
                if (response.ok) {
                    const posts = await response.json();
                    const lowerQuery = query.toLowerCase();

                    searchResults = posts
                        .filter(post =>
                            post.title.toLowerCase().includes(lowerQuery) ||
                            post.excerpt.toLowerCase().includes(lowerQuery) ||
                            post.category.toLowerCase().includes(lowerQuery)
                        )
                        .slice(0, 5)
                        .map(post => ({
                            title: post.title,
                            description: post.excerpt,
                            type: 'article',
                            url: `/blog-post.html?id=${post.id}`
                        }));
                }
            } catch (e) {
                console.debug('Could not search blog posts:', e);
            }

            // Display results
            if (searchResults.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="p-4 text-center text-gray-500">
                        <p class="text-sm">No results found for "${query}"</p>
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = searchResults
                    .map(result => `
                        <a href="${result.url}" class="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-900">
                                        ${result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        ${result.title}
                                    </p>
                                    <p class="text-xs text-gray-500 truncate">
                                        ${result.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    `)
                    .join('');
            }
        } catch (error) {
            console.error('Search error:', error);
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div class="p-4 text-center text-red-500 text-sm">Error performing search</div>';
            }
        }
    }

    /**
     * Update footer year to current year
     */
    updateFooterYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

/**
 * Initialize nav/footer manager when DOM is loaded
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavFooterManager();
    });
} else {
    // DOM is already loaded
    new NavFooterManager();
}
