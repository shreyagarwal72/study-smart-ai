# Task2Top - AI Study Planner

**Live Website:** [https://task2top.vercel.app](https://task2top.vercel.app)

Task2Top is an AI-powered study planning application designed for students in India, specifically aligned with the CBSE NCERT curriculum. It helps students create personalized study schedules, track their progress, and achieve academic success.

## 🚀 Features

### AI-Powered Study Planning
- **Personalized Schedules**: AI generates optimized weekly study schedules based on your subjects, priorities, and available time
- **Smart Time Allocation**: Automatically allocates more time to weaker subjects and includes revision sessions
- **Pomodoro Integration**: Built-in 25/5 minute study sessions with break reminders
- **Weekly Calendar View**: Interactive calendar with session details, time tracking, and progress indicators

### CBSE NCERT Curriculum Support
- Full support for Classes 1-12 following latest NCERT syllabus
- Stream selection for Class 11-12 (Science PCM/PCB, Commerce, Arts/Humanities)
- Competitive exam preparation (JEE, NEET, UPSC, CAT, GATE)
- Subject-specific color coding for easy visual organization

### Dashboard & Analytics
- **Study Streak Tracking**: Maintain daily study streaks with gamification and flame animations
- **Weekly Progress Charts**: Visualize study hours by day and subject
- **Today's Schedule**: Quick view of daily study sessions with session controls
- **Interactive Weekly Calendar**: Click any day to see detailed session breakdown
- **Progress Indicators**: Track daily and weekly study time goals

### User Profile & Settings
- **Profile Management**: Update name, avatar, and personal information
- **Study Preferences**: Save class level and stream preferences for personalized plans
- **Notification Settings**: Configure streak reminders, study alerts, and achievement notifications
- **Persistent Preferences**: All settings saved to database for cross-device sync

### Notification System
- **Database-Persisted Alerts**: Notifications stored securely and synced across devices
- **Real-time Updates**: Instant notification delivery using Supabase Realtime
- **Categorized Alerts**: Streak reminders, study tips, achievements, and session reminders
- **Mark as Read/Delete**: Full control over notification management

### Additional Features
- **Dark/Light Theme**: Comfortable studying in any lighting condition
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Google OAuth**: Quick sign-in with Google account
- **Session Persistence**: Stay logged in across page reloads

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI**: Lovable AI Gateway (Gemini models for schedule generation)
- **State Management**: TanStack Query (React Query)
- **Date Handling**: date-fns
- **Charts**: Recharts

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features, testimonials, and CTA |
| `/planner` | Step-by-step study plan creation wizard |
| `/dashboard` | Personalized dashboard with schedule, stats, and analytics |
| `/settings` | Profile, study preferences, and notification settings |
| `/blog` | Study tips and educational content |
| `/blog/:slug` | Individual blog post page |
| `/about` | About the platform and team |
| `/contact` | Contact form for support |
| `/login` | User authentication |
| `/signup` | New user registration |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## 🗄️ Database Schema

### Tables
- **profiles**: User profile data (name, avatar, class, stream)
- **study_plans**: User-created study plans with AI-generated schedules
- **study_sessions**: Tracked study session history
- **streaks**: User study streak data
- **notifications**: Persisted user notifications and alerts

## 🚀 Deployment

### Production URLs
- **Primary (Vercel)**: [https://task2top.vercel.app](https://task2top.vercel.app)
- **Lovable Preview**: https://task2top.lovable.app

### Vercel Configuration

The `vercel.json` is configured for SPA routing:
```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/" }
  ]
}
```

### Environment Variables
Required environment variables are automatically managed by the Lovable Cloud integration.

## 🔐 Authentication

- **Email/Password**: Standard signup with email verification
- **Google OAuth**: One-click sign-in with Google (works on both lovable.app and Vercel deployments)
- **Session Persistence**: Automatic session refresh and persistence
- **Protected Routes**: Dashboard and settings require authentication

## 🎨 Design System

- Custom design tokens for consistent theming
- Subject-specific color mapping for visual organization
- Responsive breakpoints for all device sizes
- Dark mode support with smooth transitions

## 📄 License

MIT License - Built with ❤️ for students worldwide

---

**Created with [Lovable](https://lovable.dev)** - The AI-powered web app builder
