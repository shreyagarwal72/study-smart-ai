import { Calendar, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActivePlan } from "@/hooks/useStudyData";
import { useNavigate } from "react-router-dom";

interface ScheduleSession {
  startTime: string;
  endTime: string;
  subject: string;
  topic: string;
  type: "study" | "revision" | "break" | "buffer";
  color: string;
}

interface DaySchedule {
  day: string;
  sessions: ScheduleSession[];
}

export function TodaySchedule() {
  const { data: plan, isLoading } = useActivePlan();
  const navigate = useNavigate();

  const getTodayDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const today = getTodayDay();
  const schedule = plan?.schedule as { weeklySchedule?: DaySchedule[] } | null;
  const todaySchedule = schedule?.weeklySchedule?.find((d) => d.day === today);

  const getCurrentSession = () => {
    if (!todaySchedule?.sessions) return null;
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    
    return todaySchedule.sessions.findIndex((session) => {
      return session.startTime <= currentTime && currentTime < session.endTime;
    });
  };

  const currentSessionIndex = getCurrentSession();

  if (isLoading) {
    return (
      <div className="lg:col-span-2 glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Today's Schedule</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No active study plan found</p>
          <Button onClick={() => navigate("/planner")} className="rounded-xl">
            Create Study Plan
          </Button>
        </div>
      </div>
    );
  }

  if (!todaySchedule?.sessions?.length) {
    return (
      <div className="lg:col-span-2 glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Today's Schedule</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No sessions scheduled for {today}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Today's Schedule</h2>
        </div>
        <span className="text-sm text-muted-foreground">{today}</span>
      </div>

      <div className="space-y-3">
        {todaySchedule.sessions.map((session, i) => {
          const isPast = i < (currentSessionIndex ?? todaySchedule.sessions.length);
          const isCurrent = i === currentSessionIndex;

          return (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                isCurrent
                  ? "bg-primary/10 border border-primary/30 shadow-lg"
                  : isPast
                  ? "bg-muted/30 opacity-60"
                  : "bg-muted/50 hover:bg-muted/70"
              }`}
            >
              <div
                className={`w-1 h-12 rounded-full ${
                  isCurrent ? "bg-primary animate-pulse" : isPast ? "bg-success" : "bg-muted-foreground/30"
                }`}
              />
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">
                  {session.startTime} - {session.endTime}
                </div>
                <div className="font-medium">{session.subject}</div>
                {session.topic && (
                  <div className="text-xs text-muted-foreground">{session.topic}</div>
                )}
              </div>
              {isPast && <CheckCircle2 className="w-5 h-5 text-success" />}
              {isCurrent && (
                <Button size="sm" className="rounded-full bg-primary gap-1">
                  <Play className="w-3 h-3" />
                  Start
                </Button>
              )}
              {session.type === "break" && (
                <span className="text-xs bg-muted px-2 py-1 rounded">Break</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
