// Blog post page functionality
let currentPost = null;

// Get slug from URL parameters
function getSlugFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

// Load blog post data
async function loadBlogPost() {
    const slug = getSlugFromUrl();

    if (!slug) {
        showError('No blog post specified');
        return;
    }

    try {
        const response = await fetch('/blog_posts.json');
        const posts = await response.json();

        currentPost = posts.find(post => post.slug === slug);

        if (!currentPost) {
            showError('Blog post not found');
            return;
        }

        renderBlogPost();
    } catch (error) {
        console.error('Error loading blog post:', error);
        showError('Unable to load blog post. Please try again later.');
    }
}

// Render the blog post content
function renderBlogPost() {
    // Update page title and meta
    document.getElementById('page-title').textContent = `${currentPost.title} | MLP Toastmasters`;
    document.getElementById('page-description').setAttribute('content', currentPost.excerpt);
    document.getElementById('page-keywords').setAttribute('content', currentPost.tags.join(', '));

    // Breadcrumb
    document.getElementById('breadcrumb-category').textContent = currentPost.category;
    document.getElementById('breadcrumb-category').href = `/blog.html?category=${encodeURIComponent(currentPost.category)}`;
    document.getElementById('breadcrumb-title').textContent = currentPost.title;

    // Article header
    document.getElementById('article-category').textContent = currentPost.category;
    document.getElementById('article-title').textContent = currentPost.title;
    document.getElementById('article-excerpt').textContent = currentPost.excerpt;

    // Author info
    const authorInitial = currentPost.author.charAt(0).toUpperCase();
    document.getElementById('author-avatar').textContent = authorInitial;
    document.getElementById('author-name').textContent = currentPost.author;

    const authorBioElement = document.getElementById('author-bio');
    if (currentPost.authorBio) {
        authorBioElement.textContent = currentPost.authorBio;
    } else {
        authorBioElement.style.display = 'none';
    }

    // Published date
    const publishDate = new Date(currentPost.publishedAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('publish-date').textContent = publishDate;

    // Read time
    if (currentPost.readTime) {
        document.getElementById('read-time').textContent = `${currentPost.readTime} minutes`;
    } else {
        document.getElementById('read-time-container').style.display = 'none';
    }

    // View count
    document.getElementById('view-count').textContent = currentPost.viewCount.toLocaleString();

    // Article content - parse markdown
    const contentHtml = marked.parse(currentPost.content);
    document.getElementById('article-content').innerHTML = contentHtml;

    // Tags
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = currentPost.tags.map(tag => `
        <a
            href="/blog.html?tag=${encodeURIComponent(tag.toLowerCase())}"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-900 transition-colors"
        >
            #${tag}
        </a>
    `).join('');

    // Author bio section
    document.getElementById('author-avatar-large').textContent = authorInitial;
    document.getElementById('author-name-bio').textContent = currentPost.author;

    const authorBioText = document.getElementById('author-bio-text');
    if (currentPost.authorBio) {
        authorBioText.textContent = currentPost.authorBio;
    } else {
        authorBioText.textContent = 'A dedicated member of MLP Toastmasters, sharing insights and experiences from the journey of public speaking and leadership development.';
    }

    // Update structured data
    updateStructuredData();
}

// Update structured data for SEO
function updateStructuredData() {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: currentPost.title,
        description: currentPost.excerpt,
        datePublished: currentPost.publishedAt,
        author: {
            '@type': 'Person',
            name: currentPost.author
        },
        publisher: {
            '@type': 'Organization',
            name: 'MLP Toastmasters',
            logo: {
                '@type': 'ImageObject',
                url: 'https://mlptoastmasters.org/logo.png'
            }
        },
        url: `https://mlptoastmasters.org/blog-post.html?slug=${currentPost.slug}`,
        keywords: currentPost.tags.join(', ')
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mlptoastmasters.org/'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://mlptoastmasters.org/blog.html'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: currentPost.category,
                item: `https://mlptoastmasters.org/blog.html?category=${encodeURIComponent(currentPost.category)}`
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: currentPost.title,
                item: `https://mlptoastmasters.org/blog-post.html?slug=${currentPost.slug}`
            }
        ]
    };

    // Combine schemas
    const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [articleSchema, breadcrumbSchema]
    };

    document.getElementById('structured-data').textContent = JSON.stringify(structuredData);
}

// Show error message
function showError(message) {
    const container = document.querySelector('.container.mx-auto');
    if (container) {
        container.innerHTML = `
            <div class="max-w-4xl mx-auto text-center py-16">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
                <p class="text-xl text-gray-600 mb-8">${message}</p>
                <a href="/blog.html" class="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold">
                    Back to Blog
                </a>
            </div>
        `;
    }
}

// Handle category filter link clicks
function setupCategoryFilters() {
    // Check if there's a category or tag filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const tagParam = urlParams.get('tag');

    if (categoryParam || tagParam) {
        // This functionality would be handled by blog.html
        // Just making sure links work correctly
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
    setupCategoryFilters();
});
