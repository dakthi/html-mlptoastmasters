# Quick Start Guide - MLP Toastmasters Data Files

## Fastest Way to Get Started

### 1. Load All Data at Once

```html
<script src="/js/data-loader.js"></script>
<script>
  // Single call to load everything
  Promise.all([
    fetch('/data/site_settings.json').then(r => r.json()),
    fetch('/data/programs.json').then(r => r.json()),
    fetch('/data/events.json').then(r => r.json()),
    fetch('/data/faqs.json').then(r => r.json()),
    fetch('/data/testimonials.json').then(r => r.json()),
    fetch('/data/contact.json').then(r => r.json()),
    fetch('/data/announcements.json').then(r => r.json()),
    fetch('/data/members.json').then(r => r.json())
  ]).then(([settings, programs, events, faqs, testimonials, contact, announcements, members]) => {
    // All data loaded - use it now!
    console.log('Data ready:', { settings, programs, events, faqs, testimonials, contact, announcements, members });
  });
</script>
```

### 2. Copy-Paste Ready Examples

#### Display Site Title
```html
<div id="title"></div>
<script>
  fetch('/data/site_settings.json')
    .then(r => r.json())
    .then(data => {
      document.getElementById('title').innerHTML = data.site_title.value;
    });
</script>
```

#### Display All Programs
```html
<div id="programs"></div>
<script>
  fetch('/data/programs.json')
    .then(r => r.json())
    .then(programs => {
      const html = programs.map(p => `
        <div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p>Cost: ${p.cost}</p>
        </div>
      `).join('');
      document.getElementById('programs').innerHTML = html;
    });
</script>
```

#### Display Upcoming Events
```html
<div id="events"></div>
<script>
  fetch('/data/events.json')
    .then(r => r.json())
    .then(events => {
      const active = events.filter(e => e.active);
      const html = active.map(e => `
        <div>
          <h3>${e.title}</h3>
          <p>${e.date} at ${e.startTime}</p>
          <p>${e.location}</p>
        </div>
      `).join('');
      document.getElementById('events').innerHTML = html;
    });
</script>
```

#### Display FAQs by Category
```html
<div id="faqs"></div>
<script>
  fetch('/data/faqs.json')
    .then(r => r.json())
    .then(faqs => {
      const grouped = {};
      faqs.forEach(f => {
        if (!grouped[f.category]) grouped[f.category] = [];
        grouped[f.category].push(f);
      });

      let html = '';
      Object.entries(grouped).forEach(([cat, items]) => {
        html += `<h2>${cat}</h2>`;
        items.forEach(f => {
          html += `
            <details>
              <summary>${f.question}</summary>
              <p>${f.answer}</p>
            </details>
          `;
        });
      });
      document.getElementById('faqs').innerHTML = html;
    });
</script>
```

#### Display Testimonials Carousel
```html
<div id="testimonial"></div>
<div><button onclick="prevTestimonial()">← Prev</button> <button onclick="nextTestimonial()">Next →</button></div>

<script>
  let testimonials = [];
  let currentIndex = 0;

  function displayTestimonial() {
    const t = testimonials[currentIndex];
    document.getElementById('testimonial').innerHTML = `
      <blockquote>"${t.text}"</blockquote>
      <p><strong>${t.author}</strong>, ${t.role}</p>
    `;
  }

  window.nextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    displayTestimonial();
  };

  window.prevTestimonial = () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    displayTestimonial();
  };

  fetch('/data/testimonials.json')
    .then(r => r.json())
    .then(data => {
      testimonials = data.sort((a, b) => a.order - b.order);
      displayTestimonial();
    });
</script>
```

#### Display Contact Info
```html
<div id="contact"></div>
<script>
  fetch('/data/contact.json')
    .then(r => r.json())
    .then(contacts => {
      const active = contacts.filter(c => c.active).sort((a, b) => a.order - b.order);
      const html = active.map(c => {
        const link = c.type === 'email' ? `mailto:${c.value}` : c.value;
        return `
          <div>
            <h4>${c.title}</h4>
            <a href="${link}">${c.value}</a>
            <p>${c.description}</p>
          </div>
        `;
      }).join('');
      document.getElementById('contact').innerHTML = html;
    });
</script>
```

#### Display Announcements
```html
<div id="announcements"></div>
<script>
  fetch('/data/announcements.json')
    .then(r => r.json())
    .then(announcements => {
      const active = announcements.filter(a => a.active).sort((a, b) => a.order - b.order);
      const html = active.map(a => `
        <div class="announcement ${a.priority}">
          <h3>${a.title}</h3>
          <p>${a.content}</p>
          <small>${a.date}</small>
        </div>
      `).join('');
      document.getElementById('announcements').innerHTML = html;
    });
</script>
```

#### Display Club Members
```html
<div id="members"></div>
<script>
  fetch('/data/members.json')
    .then(r => r.json())
    .then(members => {
      const active = members.filter(m => m.status === 'active');
      const html = active.map(m => `
        <div>
          <img src="${m.image}" alt="${m.name}" style="width:100px; border-radius:50%;">
          <h4>${m.name}</h4>
          <p>${m.role}</p>
          <p>${m.bio}</p>
        </div>
      `).join('');
      document.getElementById('members').innerHTML = html;
    });
</script>
```

## Essential Information

### Data File Locations
```
/data/site_settings.json     - Site config & branding
/data/programs.json          - Toastmasters programs
/data/events.json            - Meetings & events
/data/faqs.json              - Frequently asked questions
/data/testimonials.json      - Member reviews
/data/contact.json           - Contact information
/data/announcements.json     - News & updates
/data/members.json           - Club members
```

### Key Field Names

**site_settings.json:**
- `site_title`, `site_description`, `contact_email`, `contact_phone`

**programs.json:**
- `name`, `description`, `category`, `cost`, `duration`, `sessions`

**events.json:**
- `title`, `date`, `startTime`, `endTime`, `location`, `type`

**faqs.json:**
- `question`, `answer`, `category`, `order`, `active`

**testimonials.json:**
- `text`, `author`, `role`, `image`, `active`, `order`

**contact.json:**
- `type`, `title`, `value`, `description`, `order`, `active`

**announcements.json:**
- `title`, `content`, `type`, `date`, `priority`, `active`, `order`

**members.json:**
- `name`, `role`, `bio`, `image`, `competentSpeaker`, `advancedLeader`

## Common Patterns

### Filter Active Items
```javascript
const activeItems = items.filter(item => item.active === true);
```

### Sort by Order
```javascript
const sorted = items.sort((a, b) => a.order - b.order);
```

### Filter by Category
```javascript
const programsType = programs.filter(p => p.category === 'workshop');
```

### Get Random Item
```javascript
const random = items[Math.floor(Math.random() * items.length)];
```

### Count Items
```javascript
const count = items.length;
const filtered = items.filter(i => i.active).length;
```

## Debugging

### Check Data Loaded
```javascript
fetch('/data/faqs.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Verify JSON Syntax
Open browser DevTools → Console and paste:
```javascript
fetch('/data/faqs.json').then(r => r.json()).then(d => console.log('Valid JSON:', d));
```

### Check if File Exists
```javascript
fetch('/data/programs.json').then(r => {
  if (r.ok) console.log('File found');
  else console.log('File not found:', r.status);
});
```

## Files Overview

| File | What It Contains | Best For |
|------|-----------------|----------|
| **site_settings.json** | Site title, description, contact, social | Header, footer, meta tags |
| **programs.json** | Programs list with 10 Competent Speaker sessions | Programs page, course listings |
| **events.json** | 8 events (meetings, contests, workshops) | Events calendar, upcoming meetings |
| **faqs.json** | 8 FAQs organized by category | FAQ page, support section |
| **testimonials.json** | 5 member testimonials | Carousel, homepage highlight |
| **contact.json** | 8 contact methods (email, phone, social) | Contact page, footer |
| **announcements.json** | 8 news items and updates | News feed, homepage banner |
| **members.json** | 10 club member profiles | Team page, leadership showcase |

## Next Steps

1. **Read README.md** for complete API documentation
2. **Check INTEGRATION_GUIDE.md** for advanced examples
3. **Review MANIFEST.md** for detailed field reference
4. **Start building** - use examples above as templates!

---

For detailed documentation, see the other markdown files in this directory.
