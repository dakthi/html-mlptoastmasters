/**
 * MLP Toastmasters - Blog Page Script
 * Handles blog post listing, filtering, pagination, and newsletter
 *
 * DEPENDENCIES: Requires main.js to be loaded first
 * <script src="/js/main.js"></script>
 * <script src="/js/include-nav-footer.js"></script>
 * <script src="/js/blog.js"></script>
 */

// Blog listing page functionality
let allPosts = [];
let displayedPosts = [];
let currentCategory = 'All';
const postsPerPage = 9;
let currentPage = 1;

/**
 * Load blog posts from JSON file
 * Uses main.js loadJSON function if available, otherwise fetch directly
 */
async function loadBlogPosts() {
    try {
        // Use loadJSON from main.js if available
        if (typeof loadJSON === 'function') {
            allPosts = await loadJSON('/blog_posts.json');
        } else {
            const response = await fetch('/blog_posts.json');
            allPosts = await response.json();
        }

        // Sort by published date (newest first)
        allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        displayPosts();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        const gridEl = document.getElementById('blog-posts-grid');
        if (gridEl) {
            gridEl.innerHTML =
                '<p class="text-center text-gray-600 col-span-full">Unable to load blog posts. Please try again later.</p>';
        }
    }
}

// Display posts based on current filters
function displayPosts() {
    const filteredPosts = currentCategory === 'All'
        ? allPosts
        : allPosts.filter(post => post.category === currentCategory);

    const startIndex = 0;
    const endIndex = currentPage * postsPerPage;
    displayedPosts = filteredPosts.slice(startIndex, endIndex);

    renderPosts(displayedPosts);
    updateLoadMoreButton(filteredPosts.length);
}

// Render posts to the grid
function renderPosts(posts) {
    const grid = document.getElementById('blog-posts-grid');

    if (posts.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray-600 col-span-full">No blog posts found in this category.</p>';
        return;
    }

    grid.innerHTML = posts.map(post => createPostCard(post)).join('');
}

// Create a single post card
function createPostCard(post) {
    const publishDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <!-- Featured Image/Category Header -->
            <div class="h-48 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                ${post.category}
            </div>

            <!-- Content -->
            <div class="p-6">
                <!-- Category Badge -->
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full mb-3">
                    ${post.category}
                </span>

                <!-- Title -->
                <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    ${post.title}
                </h2>

                <!-- Excerpt -->
                <p class="text-gray-600 mb-4 line-clamp-3">
                    ${post.excerpt}
                </p>

                <!-- Meta Info -->
                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>${post.author}</span>
                    <span>${post.readTime} min read</span>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags.map(tag => `
                        <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            #${tag}
                        </span>
                    `).join('')}
                </div>

                <!-- Read More Link -->
                <a
                    href="/blog-post.html?slug=${post.slug}"
                    class="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                >
                    Read Article
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </article>
    `;
}

// Update load more button visibility and functionality
function updateLoadMoreButton(totalFilteredPosts) {
    const loadMoreContainer = document.getElementById('load-more-container');
    const displayedCount = displayedPosts.length;

    if (displayedCount < totalFilteredPosts) {
        loadMoreContainer.classList.remove('hidden');
    } else {
        loadMoreContainer.classList.add('hidden');
    }
}

// Handle category filter clicks
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filter');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current category and reset pagination
            currentCategory = button.dataset.category;
            currentPage = 1;

            // Display filtered posts
            displayPosts();
        });
    });
}

// Handle load more button
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        displayPosts();

        // Smooth scroll to first new post
        setTimeout(() => {
            const posts = document.querySelectorAll('#blog-posts-grid article');
            const firstNewPost = posts[(currentPage - 1) * postsPerPage];
            if (firstNewPost) {
                firstNewPost.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
}

// Handle newsletter subscription
function setupNewsletter() {
    const subscribeBtn = document.getElementById('subscribe-btn');
    const emailInput = document.getElementById('newsletter-email');

    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // TODO: Implement actual newsletter subscription
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        emailInput.value = '';
    });

    // Allow Enter key to submit
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
    setupCategoryFilters();
    setupLoadMore();
    setupNewsletter();
});
