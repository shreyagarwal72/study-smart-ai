import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useStudyData";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { WeeklyCalendar } from "@/components/dashboard/WeeklyCalendar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-bold mb-4">
              Sign in to view your dashboard
            </h1>
            <p className="text-muted-foreground mb-6">
              Track your study progress, view your schedule, and maintain your streak.
            </p>
            <Button onClick={() => navigate("/login")} className="rounded-xl">
              Sign In
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Student";

  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="text-muted-foreground">Here's your study progress overview</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StreakCard />
            <StatsCards />
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Today's schedule */}
            <TodaySchedule />

            {/* Pomodoro Timer & Quick actions */}
            <div className="space-y-6">
              <PomodoroTimer />
              <QuoteCard />
            </div>

            {/* Weekly progress */}
            <WeeklyChart />
          </div>

          {/* Weekly Calendar - Full width */}
          <WeeklyCalendar />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
