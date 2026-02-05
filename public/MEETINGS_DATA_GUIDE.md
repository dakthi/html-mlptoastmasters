# Meeting Data Update Guide

## Quick Reference for Updating Meeting Information

### Files to Update When Information Changes

#### 1. **meetings.json** (Primary Data Source)
Location: `/public/meetings.json`

Use this file to maintain the single source of truth for all meeting data. The structure is organized as follows:

```json
{
  "club": {
    "regularMeetings": {
      "day": "Tuesday",           // Change meeting day here
      "time": "6:30 PM",          // Change meeting time here
      "duration": "~2 hours",     // Change meeting duration here
      "location": {
        "venue": "St Christopher's Inn",   // Change venue name
        "room": "Private Room",             // Change room details
        "address": "",                     // Add full address if needed
        "notes": "Permanent dedicated club home"  // Add location notes
      }
    }
  }
}
```

#### 2. **meetings.html** (Main Meeting Page)
Location: `/public/meetings.html`

**Section to update:** "Our Meeting Location"
```html
<p class="text-gray-700 text-base leading-relaxed mb-4">
    We meet every Tuesday at 6:30pm in the private room at St Christopher's Inn.
    <!-- Update day, time, venue, and room details here -->
</p>
```

#### 3. **meetings-info.html** (Alternative Meeting View)
Location: `/public/meetings-info.html`

**Sections to update:**

Schedule Information:
```html
<p>Every 1st & 3rd Saturday</p>
<p>9:00 AM - 11:00 AM</p>
<!-- Update with actual meeting schedule -->
```

## Meeting Data Fields

### Essential Information

| Field | Current Value | How to Update |
|-------|---------------|---------------|
| Meeting Day | Tuesday | Update in JSON + both HTML files |
| Meeting Time | 6:30 PM | Update in JSON + both HTML files |
| Meeting Duration | ~2 hours | Update in JSON + both HTML files |
| Venue | St Christopher's Inn | Update in JSON + both HTML files |
| Room | Private Room | Update in JSON + both HTML files |
| Address | (empty) | Add to JSON and both HTML files |
| Contact | (linked in buttons) | Update contact page |

### Meeting Components (Usually Fixed)

These are standard Toastmasters meeting elements that typically don't change:
- Prepared Speeches (~3 per meeting)
- Speech Evaluations
- Table Topics (impromptu speaking)
- Meeting Roles (Toastmaster, Timer, Ah-Counter, etc.)
- Sign-up system (EasySpeak)

**If you change these components:**
1. Update the meetingComponents array in meetings.json
2. Update corresponding sections in meetings.html
3. Update the "What happens" lists in meetings-info.html

### Best Practices (Customizable)

Current best practices listed in meetings.html:
```json
"bestPractices": {
  "speechFrequency": "Every 2-3 meetings",
  "tips": [
    "We encourage all members to give a speech every 2-3 meetings...",
    "Take on different meeting roles...",
    // ... more tips
  ]
}
```

## Update Procedures

### Scenario 1: Change Meeting Time or Day

**Example:** Move from Tuesday 6:30 PM to Thursday 7:00 PM

1. **Update meetings.json:**
   ```json
   "day": "Thursday",
   "time": "7:00 PM"
   ```

2. **Update meetings.html (Line ~68):**
   ```html
   We meet every Thursday at 7:00pm in the private room at St Christopher's Inn.
   ```

3. **Update meetings-info.html (Line ~176):**
   ```html
   <p>Every Thursday</p>
   <p>7:00 PM - 9:00 PM</p>
   ```

4. **Test both pages** to ensure consistency

### Scenario 2: Change Location

**Example:** Move from St Christopher's Inn to a new venue

1. **Update meetings.json:**
   ```json
   "location": {
     "venue": "New Venue Name",
     "room": "Meeting Room A",
     "address": "123 Main Street, City, State",
     "notes": "New permanent location"
   }
   ```

2. **Update meetings.html (Line ~68):**
   ```html
   We meet every Tuesday at 6:30pm in Meeting Room A at New Venue Name.
   We're delighted to have permanent use of this space...
   ```

3. **Update meetings-info.html** - No location details in this file, so just ensure buttons link to updated contact page

### Scenario 3: Add New Meeting Component

**Example:** Add a "Member Spotlight" section to each meeting

1. **Update meetings.json - Add to meetingComponents:**
   ```json
   {
     "id": "member-spotlight",
     "title": "Member Spotlight",
     "description": "Celebrate a member's achievement or journey with a brief presentation",
     "duration_per_meeting": "5 minutes"
   }
   ```

2. **Update meetings.html - Add new card:**
   ```html
   <div class="bg-white rounded-lg p-6 shadow-md">
     <h3>Member Spotlight</h3>
     <p class="text-gray-700">
       Celebrate a member's achievement or journey with a brief presentation.
     </p>
   </div>
   ```

### Scenario 4: Update Best Practices

**Example:** Change speech frequency from every 2-3 meetings to weekly

1. **Update meetings.json:**
   ```json
   "bestPractices": {
     "speechFrequency": "Weekly for maximum progress",
     "tips": [
       "We encourage all members to give a speech weekly...",
       // ... rest of tips
     ]
   }
   ```

2. **Update meetings.html (Line ~170):**
   ```html
   <li>We encourage all members to give a speech weekly for maximum progress...</li>
   ```

## JSON File Structure Reference

Complete structure for reference:

```json
{
  "club": {
    "name": "MLP Toastmasters",
    "regularMeetings": {
      "day": "Tuesday",
      "time": "6:30 PM",
      "duration": "~2 hours",
      "frequency": "Weekly",
      "location": {
        "venue": "St Christopher's Inn",
        "room": "Private Room",
        "address": "",
        "notes": "Permanent dedicated club home"
      },
      "notes": "Optional post-meeting socials available"
    }
  },
  "meetingStructure": [
    {
      "id": "opening",
      "order": 1,
      "title": "Opening & Welcome",
      "duration": "5-10 minutes",
      "officialDescription": "...",
      "ourInterpretation": "...",
      "keyPoints": ["...", "...", "..."]
    }
  ],
  "meetingComponents": [
    {
      "id": "prepared-speeches",
      "title": "Prepared Speeches",
      "description": "...",
      "average_count_per_meeting": 3,
      "signup_system": "EasySpeak"
    },
    // ... more components
  ],
  "signUp": {
    "system": "EasySpeak",
    "url": "https://toastmasterclub.org",
    "features": ["..."],
    "deadline": "Sunday before Tuesday meeting",
    "deadline_reason": "To help with planning"
  },
  "bestPractices": {
    "speechFrequency": "Every 2-3 meetings",
    "speechFrequencyReason": "Regular practice is the best way to progress through Pathways",
    "tips": ["...", "...", "..."],
    "competitiveAdvantage": "..."
  },
  "whatToExpect": {
    "description": "...",
    "activities": ["...", "...", "..."]
  }
}
```

## Consistency Checklist

After making any updates, verify these are consistent across all files:

- [ ] **meetings.json** - Primary data updated
- [ ] **meetings.html** - Meeting location section updated
- [ ] **meetings.html** - Meeting components list updated
- [ ] **meetings.html** - Best practices updated
- [ ] **meetings-info.html** - Schedule information updated
- [ ] **meetings-info.html** - "What happens" sections updated
- [ ] **meetings-info.html** - Buttons link to correct contact/calendar pages
- [ ] Both HTML files render correctly in browser
- [ ] Mobile responsiveness maintained
- [ ] Links to external systems (EasySpeak) still valid
- [ ] Contact page information is current

## Additional Resources

### Related Files
- `meetings.html` - Main meeting details page
- `meetings-info.html` - Alternative meeting types view
- `contact.html` - Contact and location information
- `join.html` - Member signup page

### External Links
- **EasySpeak:** https://toastmasterclub.org (for member signup)
- **Toastmasters International:** https://www.toastmasters.org (for standard meeting format info)

## Version History

| Date | Changed By | Changes |
|------|-----------|---------|
| 2026-02-05 | Claude | Initial conversion from React components |

---

**Last Updated:** February 5, 2026
**Maintained By:** [Your Team]
**Review Schedule:** Quarterly or when meeting details change
