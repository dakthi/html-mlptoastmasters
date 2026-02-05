# JSON Data Integration Guide - MLP Toastmasters

## Quick Start

Load and use the data in your HTML pages with simple fetch calls:

```html
<!DOCTYPE html>
<html>
<head>
    <title>MLP Toastmasters</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

<div id="hero"></div>
<div id="faqs"></div>
<div id="testimonials"></div>
<div id="events"></div>

<script src="/js/data-loader.js"></script>

</body>
</html>
```

## Data Loader Module

Create `/js/data-loader.js`:

```javascript
// Central data loader module
const DataLoader = {
  cache: {},

  async load(filename) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }
    const response = await fetch(`/data/${filename}`);
    const data = await response.json();
    this.cache[filename] = data;
    return data;
  },

  // Load multiple files at once
  async loadMultiple(...filenames) {
    const promises = filenames.map(name => this.load(name));
    return Promise.all(promises);
  }
};
```

## Common Usage Patterns

### 1. Load Site Settings

```javascript
async function initializeHeader() {
  const settings = await DataLoader.load('site_settings.json');

  // Set page title
  document.title = settings.site_title.value;

  // Set meta description
  document.querySelector('meta[name="description"]')
    .setAttribute('content', settings.site_description.value);

  // Update header
  document.querySelector('header h1').textContent = settings.site_title.value;

  // Set hero section
  const hero = document.querySelector('#hero');
  hero.innerHTML = `
    <h2>${settings.hero_title.value}</h2>
    <p class="subtitle">${settings.hero_subtitle.value}</p>
    <p class="description">${settings.hero_description.value}</p>
    <a href="${settings.hero_cta_button_link.value}" class="btn">
      ${settings.hero_cta_button_text.value}
    </a>
  `;
}

// Call on page load
document.addEventListener('DOMContentLoaded', initializeHeader);
```

### 2. Display FAQs

```javascript
async function displayFAQs() {
  const faqs = await DataLoader.load('faqs.json');
  const container = document.querySelector('#faqs');

  // Sort by order
  faqs.sort((a, b) => a.order - b.order);

  // Group by category
  const grouped = {};
  faqs.forEach(faq => {
    if (!grouped[faq.category]) grouped[faq.category] = [];
    grouped[faq.category].push(faq);
  });

  // Render HTML
  let html = '';
  Object.entries(grouped).forEach(([category, items]) => {
    html += `<h3>${category}</h3><div class="faq-group">`;
    items.forEach(faq => {
      html += `
        <details class="faq-item">
          <summary>${faq.question}</summary>
          <p>${faq.answer}</p>
        </details>
      `;
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', displayFAQs);
```

### 3. Display Testimonials (Carousel/Slider)

```javascript
async function displayTestimonials() {
  const testimonials = await DataLoader.load('testimonials.json');
  const container = document.querySelector('#testimonials');

  // Sort by order
  testimonials.sort((a, b) => a.order - b.order);

  let currentIndex = 0;

  function showTestimonial(index) {
    const t = testimonials[index];
    container.innerHTML = `
      <figure class="testimonial">
        <blockquote>"${t.text}"</blockquote>
        <figcaption>
          <img src="${t.image}" alt="${t.author}" class="avatar">
          <div>
            <strong>${t.author}</strong>
            <p class="role">${t.role}</p>
          </div>
        </figcaption>
      </figure>
      <div class="testimonial-nav">
        <button class="prev" onclick="previousTestimonial()">← Previous</button>
        <span>${index + 1} of ${testimonials.length}</span>
        <button class="next" onclick="nextTestimonial()">Next →</button>
      </div>
    `;
  }

  window.nextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  };

  window.previousTestimonial = () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  };

  showTestimonial(0);
}

document.addEventListener('DOMContentLoaded', displayTestimonials);
```

### 4. Display Upcoming Events

```javascript
async function displayUpcomingEvents() {
  const events = await DataLoader.load('events.json');
  const container = document.querySelector('#events');

  // Filter active events and sort by date
  const activeEvents = events
    .filter(e => e.active)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6); // Show next 6 events

  const html = activeEvents.map(event => `
    <article class="event-card">
      <img src="${event.image}" alt="${event.title}" class="event-image">
      <div class="event-content">
        <span class="event-type">${event.type.replace('-', ' ')}</span>
        <h3>${event.title}</h3>
        <p class="event-description">${event.description}</p>
        <div class="event-details">
          <p><strong>📅 Date:</strong> ${event.date}</p>
          <p><strong>🕐 Time:</strong> ${event.startTime} - ${event.endTime}</p>
          <p><strong>📍 Location:</strong> ${event.location}</p>
          <p><strong>👥 Registered:</strong> ${event.registered}/${event.capacity}</p>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = `<div class="events-grid">${html}</div>`;
}

document.addEventListener('DOMContentLoaded', displayUpcomingEvents);
```

### 5. Display Programs

```javascript
async function displayPrograms() {
  const programs = await DataLoader.load('programs.json');
  const container = document.querySelector('#programs');

  const corePrograms = programs.filter(p => p.category === 'core-program');
  const otherPrograms = programs.filter(p => p.category !== 'core-program');

  let html = '<h2>Core Programs</h2><div class="programs-grid">';
  corePrograms.forEach(program => {
    html += `
      <div class="program-card">
        <img src="${program.image}" alt="${program.name}" class="program-image">
        <h3>${program.name}</h3>
        <p class="description">${program.description}</p>
        <p class="duration"><strong>Duration:</strong> ${program.duration}</p>
        <p class="cost"><strong>Cost:</strong> ${program.cost}</p>
        ${program.sessions ? `<p class="sessions">${program.sessions.length} sessions</p>` : ''}
      </div>
    `;
  });
  html += '</div>';

  html += '<h2>Workshops & More</h2><div class="programs-grid">';
  otherPrograms.forEach(program => {
    html += `
      <div class="program-card">
        <img src="${program.image}" alt="${program.name}" class="program-image">
        <h3>${program.name}</h3>
        <p class="description">${program.description}</p>
        <p class="cost"><strong>Cost:</strong> ${program.cost}</p>
      </div>
    `;
  });
  html += '</div>';

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', displayPrograms);
```

### 6. Display Contact Information

```javascript
async function setupContactSection() {
  const contacts = await DataLoader.load('contact.json');
  const container = document.querySelector('#contact-methods');

  // Separate by type
  const emails = contacts.filter(c => c.type === 'email' && c.active);
  const phones = contacts.filter(c => c.type === 'phone' && c.active);
  const socials = contacts.filter(c => c.type === 'social' && c.active);

  let html = `
    <section class="email-contacts">
      <h3>Email Contacts</h3>
      <ul>
  `;

  emails.forEach(email => {
    html += `
      <li>
        <strong>${email.title}</strong>
        <a href="mailto:${email.value}">${email.value}</a>
        <p class="description">${email.description}</p>
      </li>
    `;
  });

  html += `
      </ul>
    </section>
    <section class="phone-contacts">
      <h3>Phone</h3>
      <ul>
  `;

  phones.forEach(phone => {
    html += `
      <li>
        <strong>${phone.title}</strong>
        <a href="tel:${phone.value}">${phone.value}</a>
        <p class="description">${phone.description}</p>
      </li>
    `;
  });

  html += `
      </ul>
    </section>
    <section class="social-links">
      <h3>Follow Us</h3>
      <ul>
  `;

  socials.forEach(social => {
    html += `
      <li>
        <a href="${social.value}" target="_blank" rel="noopener noreferrer">
          ${social.title}
        </a>
      </li>
    `;
  });

  html += '</ul></section>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', setupContactSection);
```

### 7. Display Announcements

```javascript
async function displayAnnouncements() {
  const announcements = await DataLoader.load('announcements.json');
  const container = document.querySelector('#announcements');

  const active = announcements
    .filter(a => a.active)
    .sort((a, b) => a.order - b.order);

  const html = active.map(announcement => `
    <div class="announcement announcement-${announcement.type} priority-${announcement.priority}">
      <div class="announcement-header">
        <h3>${announcement.title}</h3>
        <span class="date">${new Date(announcement.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
      </div>
      <p>${announcement.content}</p>
    </div>
  `).join('');

  container.innerHTML = html || '<p>No announcements at this time.</p>';
}

document.addEventListener('DOMContentLoaded', displayAnnouncements);
```

### 8. Display Member Directory

```javascript
async function displayMembers() {
  const members = await DataLoader.load('members.json');
  const container = document.querySelector('#members');

  // Filter by status
  const active = members.filter(m => m.status === 'active');

  // Separate by role/officer status
  const officers = active.filter(m => m.role.includes('President') || m.role.includes('Vice') || m.role.includes('Treasurer'));
  const mentors = active.filter(m => m.mentor);
  const regularMembers = active.filter(m => !officers.includes(m) && !mentors.includes(m));

  let html = '';

  if (officers.length > 0) {
    html += '<h2>Club Officers</h2><div class="members-grid">';
    officers.forEach(member => {
      html += renderMemberCard(member);
    });
    html += '</div>';
  }

  if (mentors.length > 0) {
    html += '<h2>Mentors</h2><div class="members-grid">';
    mentors.forEach(member => {
      html += renderMemberCard(member);
    });
    html += '</div>';
  }

  if (regularMembers.length > 0) {
    html += '<h2>Members</h2><div class="members-grid">';
    regularMembers.forEach(member => {
      html += renderMemberCard(member);
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

function renderMemberCard(member) {
  const speakerProgress = typeof member.competentSpeaker === 'number'
    ? `${member.competentSpeaker}/10 speeches`
    : member.competentSpeaker ? 'Competent Speaker' : 'In Progress';

  return `
    <div class="member-card">
      <img src="${member.image}" alt="${member.name}" class="member-image">
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <p class="progress">${speakerProgress}</p>
      <p class="bio">${member.bio}</p>
      <p class="joined">Joined: ${new Date(member.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', displayMembers);
```

## Complete Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MLP Toastmasters</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>

<header>
    <nav id="navbar"></nav>
</header>

<main>
    <section id="hero" class="hero"></section>
    <section id="announcements" class="announcements"></section>
    <section id="programs" class="programs"></section>
    <section id="events" class="events"></section>
    <section id="testimonials" class="testimonials"></section>
    <section id="faqs" class="faqs"></section>
    <section id="contact-methods" class="contact"></section>
    <section id="members" class="members"></section>
</main>

<footer id="footer"></footer>

<script>
  // Load and initialize all sections
  async function initializePage() {
    try {
      const settings = await DataLoader.load('site_settings.json');

      // Update document title
      document.title = settings.site_title.value;

      // Initialize all sections in parallel
      await Promise.all([
        initializeHeader(),
        displayAnnouncements(),
        displayPrograms(),
        displayUpcomingEvents(),
        displayTestimonials(),
        displayFAQs(),
        setupContactSection(),
        displayMembers()
      ]);

      console.log('Page initialized successfully');
    } catch (error) {
      console.error('Error initializing page:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', initializePage);
</script>

<script src="/js/data-loader.js"></script>

</body>
</html>
```

## Error Handling

```javascript
async function loadDataSafely(filename) {
  try {
    const data = await DataLoader.load(filename);
    return data || [];
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return []; // Return empty array for lists
  }
}

// Usage
const faqs = await loadDataSafely('faqs.json');
```

## Performance Optimization

```javascript
// Preload all data files
async function preloadAllData() {
  const files = [
    'site_settings.json',
    'programs.json',
    'events.json',
    'faqs.json',
    'testimonials.json',
    'contact.json',
    'announcements.json',
    'members.json'
  ];

  await DataLoader.loadMultiple(...files);
  console.log('All data preloaded');
}

// Call early in page lifecycle
window.addEventListener('load', preloadAllData);
```

## Tips

1. **Cache the data** - Use the DataLoader's built-in cache to avoid repeated fetches
2. **Filter early** - Filter and sort data before rendering for better performance
3. **Use templates** - Consider using template literals for consistency
4. **Error handling** - Always wrap fetch calls in try-catch
5. **Update frequently** - For dynamic data that changes, consider refresh intervals
6. **Mobile responsive** - Ensure CSS handles different screen sizes

---

For more information, see `README.md` in the same directory.
