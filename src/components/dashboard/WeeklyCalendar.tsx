import { useState } from "react";
import { useActivePlan } from "@/hooks/useStudyData";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ScheduleSession {
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  type: string;
  color: string;
}

interface DaySchedule {
  day: string;
  sessions: ScheduleSession[];
}

interface ScheduleData {
  weeklySchedule?: DaySchedule[];
  dailyTips?: string[];
  focusAreas?: string[];
}

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: "bg-blue-500/20 border-blue-500/30 text-blue-700 dark:text-blue-300",
  Physics: "bg-purple-500/20 border-purple-500/30 text-purple-700 dark:text-purple-300",
  Chemistry: "bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-300",
  Biology: "bg-emerald-500/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  English: "bg-orange-500/20 border-orange-500/30 text-orange-700 dark:text-orange-300",
  Hindi: "bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-300",
  History: "bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300",
  Geography: "bg-teal-500/20 border-teal-500/30 text-teal-700 dark:text-teal-300",
  Science: "bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-300",
  "Computer Science": "bg-indigo-500/20 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
  Economics: "bg-cyan-500/20 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
  Buffer: "bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300",
  Break: "bg-slate-400/20 border-slate-400/30 text-slate-600 dark:text-slate-400",
  default: "bg-primary/20 border-primary/30 text-primary",
};

const getSubjectColor = (subject: string) => {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS.default;
};

export function WeeklyCalendar() {
  const { data: plan, isLoading } = useActivePlan();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  };

  const goToThisWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // Parse schedule from plan - handle both object and array formats
  const scheduleData: ScheduleData | null = plan?.schedule as ScheduleData | null;
  const weeklySchedule: DaySchedule[] = Array.isArray(scheduleData) 
    ? scheduleData 
    : (scheduleData?.weeklySchedule || []);
  
  const getSessionsForDay = (dayName: string): ScheduleSession[] => {
    if (!Array.isArray(weeklySchedule)) {
      return [];
    }
    const daySchedule = weeklySchedule.find(
      (d) => d.day?.toLowerCase() === dayName.toLowerCase()
    );
    return daySchedule?.sessions || [];
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!plan?.schedule) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Weekly Schedule
          </h3>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium mb-2">No study plan yet</p>
          <p className="text-sm">Create a study plan to see your weekly schedule</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Weekly Schedule
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToThisWeek} className="text-xs">
            This Week
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "text-center p-2 rounded-lg transition-colors",
              isToday(day) && "bg-primary/10"
            )}
          >
            <p className="text-xs text-muted-foreground uppercase">
              {format(day, "EEE")}
            </p>
            <p className={cn(
              "font-display font-semibold text-lg",
              isToday(day) && "text-primary"
            )}>
              {format(day, "d")}
            </p>
          </div>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-7 gap-2 min-h-[300px]">
        {weekDays.map((day) => {
          const dayName = format(day, "EEEE");
          const sessions = getSessionsForDay(dayName);
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "rounded-xl p-2 min-h-[280px] transition-colors",
                isToday(day) 
                  ? "bg-primary/5 border border-primary/20" 
                  : "bg-muted/30"
              )}
            >
              <div className="space-y-2">
                {sessions.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Rest day
                  </p>
                ) : (
                  sessions.filter(s => s.type !== "break").slice(0, 4).map((session, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-2 rounded-lg border text-xs",
                        getSubjectColor(session.subject)
                      )}
                    >
                      <p className="font-medium truncate">{session.subject}</p>
                      <p className="text-[10px] opacity-70 truncate">{session.topic}</p>
                      <div className="flex items-center gap-1 mt-1 opacity-60">
                        <Clock className="w-3 h-3" />
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                    </div>
                  ))
                )}
                {sessions.filter(s => s.type !== "break").length > 4 && (
                  <p className="text-[10px] text-muted-foreground text-center">
                    +{sessions.filter(s => s.type !== "break").length - 4} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        {Object.entries(SUBJECT_COLORS).slice(0, 6).map(([subject, color]) => (
          subject !== "default" && (
            <div key={subject} className="flex items-center gap-1">
              <div className={cn("w-2 h-2 rounded-full", color.split(" ")[0])} />
              <span className="text-xs text-muted-foreground">{subject}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
