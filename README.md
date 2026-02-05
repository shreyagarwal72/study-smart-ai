# Task2Top - AI Study Planner

Task2Top is an AI-powered study planning application designed for students in India, specifically aligned with the CBSE NCERT curriculum. It helps students create personalized study schedules, track their progress, and achieve academic success.

## 🚀 Features

### AI-Powered Study Planning
- **Personalized Schedules**: AI generates optimized weekly study schedules based on your subjects, priorities, and available time
- **Smart Time Allocation**: Automatically allocates more time to weaker subjects
- **Pomodoro Integration**: Built-in 25/5 minute study sessions with breaks

### CBSE NCERT Curriculum Support
- Full support for Classes 1-12
- Stream selection for Class 11-12 (Science PCM/PCB, Commerce, Arts)
- Competitive exam preparation (JEE, NEET, UPSC, CAT, GATE)

### Dashboard & Analytics
- **Study Streak Tracking**: Maintain daily study streaks with gamification
- **Weekly Progress Charts**: Visualize study hours by day and subject
- **Today's Schedule**: Quick view of daily study sessions
- **Pomodoro Timer**: Focus timer with break reminders

### Additional Features
- **Dark/Light Theme**: Comfortable studying in any lighting
- **Notification Alerts**: Study reminders and achievement notifications
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI**: Lovable AI Gateway (Gemini 3 Flash)
- **State Management**: TanStack Query

## 📱 Pages

- **Home** (`/`): Landing page with features and testimonials
- **Planner** (`/planner`): Step-by-step study plan creation wizard
- **Dashboard** (`/dashboard`): Personalized dashboard with schedule and stats
- **Blog** (`/blog`): Study tips and educational content
- **About** (`/about`): About the platform
- **Login/Signup**: Authentication with email and Google OAuth

## 🚀 Deployment

The app is deployed on:
- **Lovable**: https://task2top.lovable.app
- **Vercel**: Supports custom domain deployment with OAuth

### Vercel Configuration

The `vercel.json` is configured for SPA routing:
```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/" }
  ]
}
```

## 🔐 Authentication

- Email/Password signup with auto-confirmation
- Google OAuth (works on both lovable.app and custom domains)
- Session persistence across page reloads

## 📄 License

MIT License - Built with ❤️ for students worldwide
