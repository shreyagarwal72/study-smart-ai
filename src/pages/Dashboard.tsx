import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Calendar,
  TrendingUp,
  Quote
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const streak = 12;
  const completedToday = 4;
  const totalToday = 6;
  const studyHoursThisWeek = 24.5;

  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-muted-foreground">Here's your study progress overview</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Streak */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-8 h-8 text-orange-500" />
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                  +2 from yesterday
                </span>
              </div>
              <div className="text-3xl font-display font-bold">{streak} days</div>
              <div className="text-sm text-muted-foreground">Study Streak 🔥</div>
            </div>

            {/* Today's progress */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
                <span className="text-xs font-medium text-muted-foreground">
                  {Math.round((completedToday / totalToday) * 100)}% complete
                </span>
              </div>
              <div className="text-3xl font-display font-bold">{completedToday}/{totalToday}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>

            {/* Study hours */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-3xl font-display font-bold">{studyHoursThisWeek}h</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-8 h-8 text-chart-3" />
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  New!
                </span>
              </div>
              <div className="text-3xl font-display font-bold">7</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's schedule */}
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold">Today's Schedule</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  View Full Schedule
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { time: "9:00 AM - 10:30 AM", subject: "Mathematics - Calculus", status: "completed", color: "bg-success" },
                  { time: "11:00 AM - 12:30 PM", subject: "Physics - Mechanics", status: "completed", color: "bg-success" },
                  { time: "2:00 PM - 3:30 PM", subject: "Chemistry - Organic", status: "current", color: "bg-primary" },
                  { time: "4:00 PM - 5:30 PM", subject: "Biology - Genetics", status: "upcoming", color: "bg-muted" },
                  { time: "6:00 PM - 7:00 PM", subject: "Revision - All Subjects", status: "upcoming", color: "bg-muted" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      item.status === "current" ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className={`w-1 h-12 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{item.time}</div>
                      <div className="font-medium">{item.subject}</div>
                    </div>
                    {item.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    )}
                    {item.status === "current" && (
                      <Button size="sm" className="rounded-full bg-primary">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation & Quick actions */}
            <div className="space-y-6">
              {/* Daily quote */}
              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-lg font-medium mb-4 leading-relaxed">
                  "The secret of getting ahead is getting started."
                </p>
                <p className="text-sm text-muted-foreground">— Mark Twain</p>
              </div>

              {/* Weekly stats */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold">Weekly Progress</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Mon", hours: 4, max: 6 },
                    { day: "Tue", hours: 5, max: 6 },
                    { day: "Wed", hours: 3, max: 6 },
                    { day: "Thu", hours: 6, max: 6 },
                    { day: "Fri", hours: 4.5, max: 6 },
                    { day: "Sat", hours: 2, max: 6 },
                    { day: "Sun", hours: 0, max: 6 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-8">{item.day}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                          style={{ width: `${(item.hours / item.max) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{item.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
