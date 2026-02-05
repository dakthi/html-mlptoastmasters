# MLP Toastmasters Data Files - Manifest

## Overview

This directory contains 8 JSON data files that provide all dynamic content for the MLP Toastmasters website. All files are properly formatted JSON and ready for immediate use in JavaScript applications.

**Location:** `/Users/dakthi/Documents/Factory-Tech/clients/04-non-commercial/html-mlptoastmasters/public/data/`

**Total Size:** ~50 KB (highly optimized)

**Last Updated:** February 5, 2025

---

## File Inventory

### Core Data Files (8 JSON files)

| File | Size | Records | Purpose |
|------|------|---------|---------|
| `site_settings.json` | 2.9 KB | 20 settings | Site configuration, branding, contact info |
| `faqs.json` | 3.0 KB | 8 items | Frequently asked questions by category |
| `testimonials.json` | 1.9 KB | 5 items | Member success stories and reviews |
| `contact.json` | 1.8 KB | 8 entries | Contact methods (email, phone, social) |
| `programs.json` | 4.4 KB | 6 programs | Toastmasters pathways and workshops |
| `events.json` | 5.1 KB | 8 events | Upcoming meetings, contests, workshops |
| `announcements.json` | 3.2 KB | 8 items | News, updates, and important notices |
| `members.json` | 4.2 KB | 10 members | Club member profiles and leadership |

### Documentation Files

| File | Size | Purpose |
|------|------|---------|
| `README.md` | 11 KB | Comprehensive usage guide and API reference |
| `INTEGRATION_GUIDE.md` | 14 KB | Code examples and implementation patterns |
| `MANIFEST.md` | This file | File inventory and quick reference |

---

## Quick Reference

### Load Single File
```javascript
fetch('/data/site_settings.json')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Load Multiple Files
```javascript
Promise.all([
  fetch('/data/programs.json').then(r => r.json()),
  fetch('/data/events.json').then(r => r.json()),
  fetch('/data/testimonials.json').then(r => r.json())
]).then(([programs, events, testimonials]) => {
  // Use all data
});
```

### Filter Active Items
```javascript
const activeEvents = events.filter(e => e.active === true);
const sortedFAQs = faqs.sort((a, b) => a.order - b.order);
```

---

## Data Structure Summary

### site_settings.json
- Key-value pairs for site configuration
- Fields: `value`, `type`, `description`
- Types: text, number, boolean, string
- Ideal for: page titles, descriptions, URLs, contact info

**Sample Access:**
```javascript
const title = settings.site_title.value;
const email = settings.contact_email.value;
```

### faqs.json
- Array of FAQ items
- Fields: `id`, `question`, `answer`, `category`, `order`, `active`
- Categories: General, Membership, Programs
- Sortable by `order` field

**Sample Access:**
```javascript
const generalFAQs = faqs.filter(f => f.category === 'General');
const sortedFAQs = faqs.sort((a, b) => a.order - b.order);
```

### testimonials.json
- Array of member testimonials
- Fields: `id`, `text`, `author`, `role`, `image`, `active`, `order`
- Perfect for carousels or rotating displays

**Sample Access:**
```javascript
const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
```

### contact.json
- Array of contact methods
- Fields: `id`, `type`, `title`, `value`, `description`, `order`, `active`
- Types: email, phone, website, social

**Sample Access:**
```javascript
const emailContacts = contact.filter(c => c.type === 'email');
const emails = emailContacts.map(c => c.value);
```

### programs.json
- Array of club programs and learning paths
- Fields: `id`, `name`, `description`, `category`, `cost`, `duration`, `image`, `sessions`, `active`
- Categories: core-program, workshop, support, contest
- Core programs include detailed session arrays

**Sample Access:**
```javascript
const corePrograms = programs.filter(p => p.category === 'core-program');
const competentSpeaker = programs.find(p => p.name.includes('Competent'));
console.log(competentSpeaker.sessions.length); // 10
```

### events.json
- Array of upcoming club events
- Fields: `id`, `title`, `description`, `date`, `startTime`, `endTime`, `location`, `type`, `capacity`, `registered`, `image`, `active`, `recurring`
- Types: regular-meeting, workshop, contest, conference, social, networking, orientation, practice
- Includes agenda details for meetings

**Sample Access:**
```javascript
const upcomingMeetings = events.filter(e => e.type === 'regular-meeting' && e.active);
const thisMonth = events.filter(e => e.date.startsWith('2025-02'));
```

### announcements.json
- Array of club announcements
- Fields: `id`, `title`, `content`, `type`, `icon`, `date`, `active`, `priority`, `order`
- Types: welcome, update, event, general
- Priorities: high, medium, low

**Sample Access:**
```javascript
const activeAnnouncements = announcements
  .filter(a => a.active)
  .sort((a, b) => a.priority === 'high' ? -1 : 1);
```

### members.json
- Array of club member profiles
- Fields: `id`, `name`, `role`, `bio`, `email`, `joinDate`, `competentSpeaker`, `advancedLeader`, `image`, `status`, `mentor`
- Status: active, inactive, on-leave
- competentSpeaker/advancedLeader: true/false or number of speeches

**Sample Access:**
```javascript
const activeMembers = members.filter(m => m.status === 'active');
const officers = members.filter(m => m.role.includes('President') || m.role.includes('Vice'));
const mentors = members.filter(m => m.mentor === true);
```

---

## Common Tasks

### Task 1: Update Site Title
**File:** `site_settings.json`
**Field:** `site_title.value`
```json
"site_title": {
  "value": "MLP Toastmasters",
  "type": "text",
  "description": "Main site title"
}
```

### Task 2: Add a New FAQ
**File:** `faqs.json`
```json
{
  "id": 9,
  "question": "Your question here?",
  "answer": "Your answer here",
  "category": "General",
  "order": 9,
  "active": true
}
```

### Task 3: Add a New Event
**File:** `events.json`
```json
{
  "id": 9,
  "title": "Event Title",
  "description": "Event description",
  "date": "2025-03-15",
  "startTime": "18:30",
  "endTime": "20:00",
  "location": "London, UK",
  "type": "workshop",
  "capacity": 50,
  "registered": 25,
  "image": "/img/event.jpg",
  "active": true,
  "recurring": false
}
```

### Task 4: Update Contact Information
**File:** `contact.json`
```json
{
  "id": 1,
  "type": "email",
  "title": "General Enquiries",
  "value": "info@mlptoastmasters.org",
  "description": "For general questions",
  "order": 1,
  "active": true
}
```

### Task 5: Add a Testimonial
**File:** `testimonials.json`
```json
{
  "id": 6,
  "text": "Amazing experience...",
  "author": "Person Name",
  "role": "Their Role",
  "image": "/img/person.jpg",
  "active": true,
  "order": 6
}
```

---

## Validation Checklist

When updating JSON files, ensure:

- [ ] Valid JSON syntax (use jsonlint.com if unsure)
- [ ] All string values use double quotes `"value"`
- [ ] Numbers don't have quotes: `123` not `"123"`
- [ ] Booleans are lowercase: `true`, `false`, not `True` or `False`
- [ ] Arrays use square brackets: `[...]`
- [ ] Objects use curly braces: `{...}`
- [ ] No trailing commas after last item
- [ ] All required fields are present
- [ ] `id` fields are unique within the file
- [ ] Date format is consistent (YYYY-MM-DD)
- [ ] Time format is consistent (HH:MM, 24-hour)

---

## Performance Notes

- All files combined: ~50 KB
- Typical load time: <100ms on average connection
- Caching recommended to avoid repeated fetches
- Use `Promise.all()` to load multiple files simultaneously
- Consider lazy-loading for large lists

---

## Troubleshooting

### File Not Found
```
Error: Failed to load /data/faqs.json
```
Check that files are in the correct directory and file names match exactly (case-sensitive).

### Invalid JSON
```
SyntaxError: Unexpected token...
```
Validate JSON syntax. Common issues:
- Missing commas between items
- Unquoted keys
- Single quotes instead of double quotes
- Trailing commas

### Data Not Displaying
```javascript
// Verify the fetch is working
fetch('/data/faqs.json')
  .then(r => console.log('Status:', r.status))
  .then(r => r.json())
  .then(d => console.log('Data:', d))
  .catch(e => console.error('Error:', e));
```

### CORS Issues
If loading from different domain:
- Ensure server has proper CORS headers
- Or use a proxy/API endpoint
- Or copy data files to same domain

---

## Update Workflow

1. **Edit JSON file** in text editor
2. **Validate JSON** using jsonlint.com or VS Code
3. **Test in browser** using fetch and console
4. **Deploy** to web server
5. **Clear cache** (browser and CDN if applicable)
6. **Verify** page displays correctly

---

## Related Documentation

- **README.md** - Complete API reference and usage patterns
- **INTEGRATION_GUIDE.md** - Code examples for common tasks
- **Source project:** `/Users/dakthi/Documents/Factory-Tech/clients/04-non-commercial/mlp-toastmasters/`
- **Website project:** `/Users/dakthi/Documents/Factory-Tech/clients/04-non-commercial/html-mlptoastmasters/`

---

## Support

For questions or issues:
1. Check README.md for detailed documentation
2. Review INTEGRATION_GUIDE.md for code examples
3. Validate JSON syntax with jsonlint.com
4. Check browser console for error messages
5. Verify file paths and permissions

---

**Generated:** February 5, 2025
**Version:** 1.0
**Format:** JSON (all files)
**Encoding:** UTF-8
