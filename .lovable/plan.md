
# Task2Top - AI-Powered Study Schedule Generator

## 🎯 Project Vision
A comprehensive study planning platform that uses real AI to generate personalized study schedules for students at all levels - from school to competitive exam preparation. Built with a premium glassmorphic/Material Expressive design aesthetic.

---

## 🎨 Design System

### Visual Style
- **iOS 26 Glass + Material Expressive fusion**
  - Frosted glass panels with subtle blur effects
  - Vibrant gradient accents with depth
  - Smooth, fluid animations and micro-interactions
  - Expressive color transitions on interactions

### Color Palette
- **Primary:** Indigo (#6366F1) with blue undertones
- **Accent:** Success Green (#22C55E) for progress indicators
- **Glass layers:** Semi-transparent whites with backdrop blur
- **Dark mode:** Deep slate backgrounds with luminous accents

### Typography & Components
- Clean, modern sans-serif font system
- Generous whitespace and breathing room
- Rounded, pill-shaped buttons with hover glow effects
- Floating cards with glass morphism shadows

---

## 📱 Pages & Features

### 1. Landing Page
**Hero Section**
- Bold headline with animated gradient text
- "Generate My Study Plan" CTA button with glow effect
- Animated illustration of calendar/brain concept

**Feature Highlights**
- 6 key features with expressive icons
- AI-powered scheduling, smart revisions, Pomodoro timer, analytics, etc.

**How It Works**
- 3-step visual flow with connecting lines
- Step 1: Enter your details → Step 2: AI generates schedule → Step 3: Start studying

**Testimonials**
- Glassmorphic testimonial cards with student avatars
- 4-5 realistic mock testimonials from different student types

**FAQ Section**
- Accordion-style with smooth expand animations
- Schema-ready for SEO (JSON-LD FAQ schema)

**Footer**
- Navigation links, social icons
- SEO-optimized internal linking

---

### 2. Authentication System
- **Sign Up/Login** with Email + Password
- **Google OAuth** integration for quick onboarding
- Beautiful glassmorphic auth forms
- Protected routes for app features

---

### 3. Study Planner App (Core Feature)

**Smart Input Form**
- Class/Exam type selector (School grades, College, JEE, NEET, UPSC, etc.)
- Multi-select subjects with color coding
- Daily available hours slider
- Exam date picker with countdown preview
- Weak/Strong subject rating (drag-and-drop or star rating)

**AI-Generated Schedule**
- Real AI analysis using Lovable AI (Gemini model)
- Daily timetable view with time blocks
- Weekly breakdown calendar
- Revision slots intelligently placed (spaced repetition logic)
- Buffer days before exam automatically calculated

**Interactive Schedule**
- Drag-and-drop to edit time blocks
- Click to mark sessions complete
- Reschedule with AI suggestions
- Add/remove subjects or topics

**Export & Save**
- Export as beautifully formatted PDF
- Auto-save to cloud database
- Sync across devices

---

### 4. Dashboard

**Progress Overview**
- Study streak counter with flame animation
- Completed vs pending tasks (circular progress)
- Time analytics charts (weekly study hours)
- Current week progress bar

**Motivation Section**
- Daily inspirational quote (refreshes daily)
- Achievement badges unlocked

**Quick Actions**
- Resume today's schedule
- View upcoming exams
- Edit current plan

---

### 5. Study Tools (Integrated Features)

**Pomodoro Timer**
- 25/5 minute cycles with customization
- Visual countdown with glassmorphic design
- Break reminders with notification sounds
- Session tracking

**Exam Countdown**
- Days/hours until each exam
- Floating widget accessible from any page

---

### 6. Blog (SEO-Focused)

**5 Pre-Generated Articles:**
1. "How to Create the Perfect Study Timetable for Exams"
2. "AI vs Traditional Study Planning: Which Works Better?"
3. "10 Science-Backed Study Techniques for Better Retention"
4. "Managing Study Time for Competitive Exams (JEE/NEET/UPSC)"
5. "The Pomodoro Technique: A Complete Guide for Students"

**Blog Features:**
- Clean, readable typography
- Estimated reading time
- Related articles sidebar
- Social sharing buttons
- JSON-LD Article schema for SEO

---

### 7. About & Contact Pages

**About Page**
- Mission and vision
- Team section (placeholder for real team)
- Why we built Task2Top story

**Contact Page**
- Glassmorphic contact form
- Email, social links
- FAQ quick links

---

### 8. Legal Pages
- Privacy Policy (comprehensive, GDPR-aware)
- Terms of Service

---

## ⚙️ Technical Architecture

### Backend (Lovable Cloud)

**Database Tables:**
- `profiles` - User profile data linked to auth
- `study_plans` - User's generated study schedules
- `subjects` - Subject configurations per user
- `study_sessions` - Completed study sessions for analytics
- `streaks` - Daily login/study streak tracking

**Edge Functions:**
- `generate-schedule` - AI-powered schedule generation using Lovable AI
- `daily-quote` - Fetch motivational quotes

**Authentication:**
- Supabase Auth with Email + Google OAuth
- Protected routes for app sections

---

### Frontend Structure
```
src/
├── components/
│   ├── ui/              # Design system components
│   ├── landing/         # Landing page sections
│   ├── planner/         # Study planner components
│   ├── dashboard/       # Dashboard widgets
│   └── layout/          # Header, Footer, Navigation
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── Login.tsx        # Auth pages
│   ├── Signup.tsx
│   ├── Planner.tsx      # Main study planner
│   ├── Dashboard.tsx
│   ├── Blog.tsx         # Blog listing
│   ├── BlogPost.tsx     # Individual posts
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Privacy.tsx
│   └── Terms.tsx
├── hooks/               # Custom hooks
├── lib/                 # Utilities, AI integration
└── contexts/            # Auth, Theme contexts
```

---

## 🔍 SEO Implementation

- **Meta tags:** Dynamic title/description per page
- **Open Graph:** Full OG tag implementation
- **Twitter Cards:** Summary large image cards
- **Canonical URLs:** Prevent duplicate content
- **JSON-LD Schemas:**
  - WebApplication schema
  - FAQPage schema
  - Article schema for blog posts
  - Organization schema
- **sitemap.xml:** Auto-generated sitemap
- **robots.txt:** Search engine directives

---

## 🖼️ Brand Assets

**Favicon**
- Minimalist brain + calendar fusion icon
- SVG primary, PNG fallbacks
- Light and dark mode variants

**OG Image**
- 1200×630 branded image
- "Task2Top" + tagline + gradient background
- Used for social sharing

**Logo Variations**
- Full logo (icon + wordmark)
- Icon only
- Light/dark mode versions

---

## 🚀 Deployment Ready

- PWA manifest for installability
- Service worker for offline support
- Optimized for Lighthouse 90+ score
- Lazy loading for images
- Proper ARIA labels for accessibility
- Core Web Vitals optimized

---

## 📋 Implementation Phases

**Phase 1: Foundation**
- Design system setup (glassmorphic components)
- Routing and page structure
- Landing page complete

**Phase 2: Authentication & Backend**
- Lovable Cloud database setup
- Auth flow (Email + Google)
- User profiles

**Phase 3: Core Planner**
- Input form with all options
- AI schedule generation integration
- Schedule display and editing

**Phase 4: Dashboard & Tools**
- Dashboard with analytics
- Pomodoro timer
- Streak tracking

**Phase 5: Content & SEO**
- Blog with generated articles
- All SEO implementations
- Legal pages

**Phase 6: Polish**
- Brand assets
- PWA setup
- Performance optimization
- Final testing

---

This plan creates a **production-ready, startup-grade product** with real AI capabilities, beautiful modern design, and comprehensive features for student success.
