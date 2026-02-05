# MLP Toastmasters - Static Website

Static HTML version of the MLP Toastmasters club website, converted from Next.js.

## Tech Stack

- Pure HTML5
- CSS3 (compiled from Tailwind)
- Vanilla JavaScript
- Static JSON data files

## Development

Start a local server:

```bash
cd public
python3 -m http.server 8080
```

Visit: http://localhost:8080

## Deployment

The site automatically deploys to the VPS when pushing to the `main` branch.

- **Production URL**: TBD
- **VPS Target**: `/var/www/mlp-toastmasters`
- **Deployment**: GitHub Actions with SCP

## Structure

```
html-mlptoastmasters/
├── .github/workflows/
│   └── deploy.yml          # Auto-deployment workflow
├── public/                 # Deployed files
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   ├── blog.html          # Blog listing
│   ├── contact.html       # Contact page
│   ├── join.html          # Membership page
│   ├── meetings.html      # Meeting info
│   ├── leadership.html    # Club leadership
│   ├── resources.html     # Resources
│   ├── styles.css         # Compiled CSS
│   ├── js/               # JavaScript files
│   ├── images/           # Image assets
│   ├── data/             # JSON data files
│   └── includes/         # Reusable HTML snippets
└── README.md
```

## Features Preserved

- Exact same design and styling from Next.js version
- All public-facing pages converted to static HTML
- Dynamic data extracted to JSON files
- Responsive design with mobile menu
- Image galleries and interactions
- Contact forms
- Blog posts

## Images

All images have been converted to WebP format for optimal performance. Original R2 cloud storage URLs have been replaced with local image paths.
