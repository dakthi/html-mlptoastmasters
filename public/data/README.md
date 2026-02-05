# MLP Toastmasters Data Files

This directory contains JSON data files that power the dynamic content on the MLP Toastmasters website. These files are designed for easy consumption by JavaScript and can be loaded into your web pages to display dynamic content.

## Available Data Files

### 1. **site_settings.json**
Contains site-wide configuration and metadata.

**Usage in JavaScript:**
```javascript
fetch('/data/site_settings.json')
  .then(response => response.json())
  .then(data => {
    document.title = data.site_title.value;
    document.querySelector('meta[name="description"]').setAttribute('content', data.site_description.value);
  });
```

**Key fields:**
- `site_title` - Main website title
- `site_description` - Meta description
- `hero_title`, `hero_subtitle`, `hero_description` - Hero section content
- `contact_email`, `contact_phone`, `address` - Contact information
- `social_*` - Social media URLs

---

### 2. **faqs.json**
Frequently asked questions with answers organized by category.

**Usage in JavaScript:**
```javascript
fetch('/data/faqs.json')
  .then(response => response.json())
  .then(faqs => {
    faqs.forEach(faq => {
      const faqElement = document.createElement('div');
      faqElement.classList.add('faq-item');
      faqElement.innerHTML = `
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
        <span class="category">${faq.category}</span>
      `;
      document.querySelector('.faqs-container').appendChild(faqElement);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `question` - FAQ question
- `answer` - FAQ answer
- `category` - Topic category (General, Membership, Programs)
- `order` - Display order
- `active` - Whether to show or hide

---

### 3. **testimonials.json**
Member testimonials and success stories.

**Usage in JavaScript:**
```javascript
fetch('/data/testimonials.json')
  .then(response => response.json())
  .then(testimonials => {
    const container = document.querySelector('.testimonials-container');
    testimonials.forEach(testimonial => {
      const div = document.createElement('div');
      div.classList.add('testimonial');
      div.innerHTML = `
        <p class="quote">"${testimonial.text}"</p>
        <p class="author">— ${testimonial.author}, ${testimonial.role}</p>
        <img src="${testimonial.image}" alt="${testimonial.author}">
      `;
      container.appendChild(div);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `text` - Testimonial text
- `author` - Person's name
- `role` - Their role/position
- `image` - Profile image URL
- `active` - Whether to display
- `order` - Display order

---

### 4. **contact.json**
Various contact methods and information.

**Usage in JavaScript:**
```javascript
fetch('/data/contact.json')
  .then(response => response.json())
  .then(contacts => {
    contacts.forEach(contact => {
      const link = document.createElement('a');
      link.href = contact.type === 'email' ? `mailto:${contact.value}` : contact.value;
      link.textContent = contact.title;
      link.title = contact.description;
      document.querySelector('.contact-list').appendChild(link);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `type` - Contact type (email, phone, website, social)
- `title` - Display name
- `value` - Email address, phone number, or URL
- `description` - What this contact is for
- `order` - Display order
- `active` - Whether to show

---

### 5. **programs.json**
Toastmasters programs and learning pathways.

**Usage in JavaScript:**
```javascript
fetch('/data/programs.json')
  .then(response => response.json())
  .then(programs => {
    programs.forEach(program => {
      const card = document.createElement('div');
      card.classList.add('program-card');
      card.innerHTML = `
        <img src="${program.image}" alt="${program.name}">
        <h3>${program.name}</h3>
        <p>${program.description}</p>
        <p class="duration">${program.duration}</p>
      `;
      document.querySelector('.programs-grid').appendChild(card);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `name` - Program name
- `description` - Full description
- `category` - Program type (core-program, workshop, support, contest)
- `cost` - Cost information
- `ageGroup` - Who can participate
- `image` - Program image/icon
- `active` - Whether program is available
- `sessions` - Array of speech/project names (for Competent Speaker/Advanced Leader)

---

### 6. **events.json**
Club meetings, workshops, contests, and special events.

**Usage in JavaScript:**
```javascript
fetch('/data/events.json')
  .then(response => response.json())
  .then(events => {
    const upcomingEvents = events.filter(e => e.active);
    upcomingEvents.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event-card');
      eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.startTime} - ${event.endTime}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Registered:</strong> ${event.registered}/${event.capacity}</p>
      `;
      document.querySelector('.events-list').appendChild(eventDiv);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `title` - Event name
- `description` - Event details
- `date` - Event date(s)
- `startTime` / `endTime` - Time in HH:MM format
- `location` - Where the event takes place
- `type` - Event category (regular-meeting, workshop, contest, conference, etc.)
- `capacity` - Maximum attendees
- `registered` - Current registrations
- `image` - Event image
- `agenda` - Array of scheduled items (for meetings)
- `active` - Whether event is current/visible
- `recurring` - Whether it repeats

---

### 7. **announcements.json**
Club announcements, news, and important updates.

**Usage in JavaScript:**
```javascript
fetch('/data/announcements.json')
  .then(response => response.json())
  .then(announcements => {
    const activeAnnouncements = announcements.filter(a => a.active);
    activeAnnouncements.sort((a, b) => a.order - b.order);
    activeAnnouncements.forEach(announcement => {
      const div = document.createElement('div');
      div.classList.add(`announcement`, `announcement-${announcement.type}`);
      div.innerHTML = `
        <h3>${announcement.title}</h3>
        <p>${announcement.content}</p>
        <p class="date">${new Date(announcement.date).toLocaleDateString()}</p>
      `;
      document.querySelector('.announcements-container').appendChild(div);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `title` - Announcement headline
- `content` - Full text
- `type` - Type (welcome, update, event, general)
- `icon` - Icon name for styling
- `date` - Publication date (YYYY-MM-DD)
- `active` - Whether to display
- `priority` - high, medium, low
- `order` - Display order

---

### 8. **members.json**
Club member profiles (public information only).

**Usage in JavaScript:**
```javascript
fetch('/data/members.json')
  .then(response => response.json())
  .then(members => {
    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');
      memberCard.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        <p class="bio">${member.bio}</p>
      `;
      document.querySelector('.members-grid').appendChild(memberCard);
    });
  });
```

**Key fields:**
- `id` - Unique identifier
- `name` - Member name
- `role` - Position in club or pathway status
- `bio` - Short biography
- `joinDate` - When they joined (YYYY-MM-DD)
- `competentSpeaker` - true/false or number of speeches completed
- `advancedLeader` - true/false or projects status
- `image` - Profile image
- `status` - active, inactive, on-leave
- `mentor` - Whether they mentor new members

---

## Integration Examples

### Simple HTML List
```html
<div id="faqs-container"></div>

<script>
  fetch('/data/faqs.json')
    .then(response => response.json())
    .then(data => {
      const html = data.map(faq => `
        <div class="faq-item">
          <h3>${faq.question}</h3>
          <p>${faq.answer}</p>
        </div>
      `).join('');
      document.getElementById('faqs-container').innerHTML = html;
    });
</script>
```

### With Search/Filter
```html
<input type="text" id="search" placeholder="Search FAQs...">
<div id="faqs-container"></div>

<script>
  let allFaqs = [];

  fetch('/data/faqs.json')
    .then(response => response.json())
    .then(data => {
      allFaqs = data;
      renderFaqs(allFaqs);
    });

  document.getElementById('search').addEventListener('input', (e) => {
    const filtered = allFaqs.filter(faq =>
      faq.question.toLowerCase().includes(e.target.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderFaqs(filtered);
  });

  function renderFaqs(faqs) {
    const html = faqs.map(faq => `
      <div class="faq-item">
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
      </div>
    `).join('');
    document.getElementById('faqs-container').innerHTML = html;
  }
</script>
```

### With Sorting
```javascript
fetch('/data/events.json')
  .then(response => response.json())
  .then(events => {
    // Sort by date
    const sorted = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Filter active only
    const active = sorted.filter(e => e.active);

    // Display
    renderEvents(active);
  });
```

## Data Structure Notes

1. **IDs** - All items have unique numeric IDs for database compatibility
2. **Active/Status Fields** - Use `active` to control visibility without deleting data
3. **Order Fields** - Use numeric `order` fields for custom sorting
4. **Dates** - Use YYYY-MM-DD format for dates, HH:MM (24-hour) for times
5. **URLs** - Images and links use relative paths (/img/...) or full URLs
6. **Multi-line Content** - Use escaped newlines (`\n`) for multi-paragraph text

## Updating Data

To update any of these files:

1. Edit the JSON file directly
2. Ensure valid JSON formatting (use a JSON validator if unsure)
3. Maintain the same structure and field types
4. Test in your browser's developer console:
   ```javascript
   fetch('/data/filename.json').then(r => r.json()).then(d => console.log(d));
   ```

## Performance Tips

- Cache the fetched data in JavaScript to avoid repeated network requests
- Use Promise.all() to load multiple files simultaneously:
  ```javascript
  Promise.all([
    fetch('/data/programs.json').then(r => r.json()),
    fetch('/data/events.json').then(r => r.json()),
    fetch('/data/announcements.json').then(r => r.json())
  ]).then(([programs, events, announcements]) => {
    // Use all data here
  });
  ```

---

**Last Updated:** February 5, 2025
