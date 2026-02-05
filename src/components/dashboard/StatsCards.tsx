import { CheckCircle2, Clock, Trophy, TrendingUp } from "lucide-react";
import { useStudySessions, useActivePlan } from "@/hooks/useStudyData";

export function StatsCards() {
  const { data: sessions } = useStudySessions(7);
  const { data: activePlan } = useActivePlan();

  // Calculate today's sessions
  const today = new Date().toISOString().split("T")[0];
  const todaySessions = sessions?.filter((s) => 
    s.completed_at.split("T")[0] === today
  ) || [];

  const totalMinutesToday = todaySessions.reduce((sum, s) => sum + s.duration_minutes, 0);
  const hoursToday = Math.round((totalMinutesToday / 60) * 10) / 10;

  // Calculate total weekly hours
  const totalMinutesWeek = sessions?.reduce((sum, s) => sum + s.duration_minutes, 0) || 0;
  const hoursThisWeek = Math.round((totalMinutesWeek / 60) * 10) / 10;

  // Calculate completion percentage based on daily goal
  const dailyGoalHours = activePlan?.daily_hours || 4;
  const completionPercent = Math.min(100, Math.round((hoursToday / dailyGoalHours) * 100));

  // Count unique subjects studied this week
  const subjectsStudied = new Set(sessions?.map((s) => s.subject) || []).size;

  return (
    <>
      {/* Today's progress */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
          <span className="text-xs font-medium text-muted-foreground">
            {completionPercent}% of goal
          </span>
        </div>
        <div className="text-3xl font-display font-bold">
          {hoursToday}h
          <span className="text-lg text-muted-foreground">/{dailyGoalHours}h</span>
        </div>
        <div className="text-sm text-muted-foreground">Today's Study Time</div>
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-success transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Weekly hours */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8 text-primary" />
          <TrendingUp className="w-5 h-5 text-success" />
        </div>
        <div className="text-3xl font-display font-bold">{hoursThisWeek}h</div>
        <div className="text-sm text-muted-foreground">This Week</div>
      </div>

      {/* Subjects studied */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <Trophy className="w-8 h-8 text-chart-3" />
          {subjectsStudied > 0 && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="text-3xl font-display font-bold">{subjectsStudied}</div>
        <div className="text-sm text-muted-foreground">Subjects This Week</div>
      </div>
    </>
  );
}
