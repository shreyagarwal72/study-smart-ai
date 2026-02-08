import { useState } from "react";
import { useActivePlan } from "@/hooks/useStudyData";
import { format, startOfWeek, addDays, isToday, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Target, Calendar, Play, CheckCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Science: "bg-rose-500/20 border-rose-500/30 text-rose-700 dark:text-rose-300",
  "Computer Science": "bg-indigo-500/20 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
  Economics: "bg-cyan-500/20 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
  Accountancy: "bg-lime-500/20 border-lime-500/30 text-lime-700 dark:text-lime-300",
  "Business Studies": "bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-300",
  "Political Science": "bg-violet-500/20 border-violet-500/30 text-violet-700 dark:text-violet-300",
  Psychology: "bg-pink-500/20 border-pink-500/30 text-pink-700 dark:text-pink-300",
  Sociology: "bg-sky-500/20 border-sky-500/30 text-sky-700 dark:text-sky-300",
  Buffer: "bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300",
  Break: "bg-slate-400/20 border-slate-400/30 text-slate-600 dark:text-slate-400",
  Revision: "bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-300",
  default: "bg-primary/20 border-primary/30 text-primary",
};

const SUBJECT_DOT_COLORS: Record<string, string> = {
  Mathematics: "bg-blue-500",
  Physics: "bg-purple-500",
  Chemistry: "bg-green-500",
  Biology: "bg-emerald-500",
  English: "bg-orange-500",
  Hindi: "bg-red-500",
  History: "bg-amber-500",
  Geography: "bg-teal-500",
  Science: "bg-rose-500",
  "Computer Science": "bg-indigo-500",
  Economics: "bg-cyan-500",
  default: "bg-primary",
};

const getSubjectColor = (subject: string) => {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS.default;
};

const getSubjectDotColor = (subject: string) => {
  return SUBJECT_DOT_COLORS[subject] || SUBJECT_DOT_COLORS.default;
};

// Calculate duration in minutes from time strings
const calculateDuration = (startTime: string, endTime: string): number => {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  return (endHour * 60 + endMin) - (startHour * 60 + startMin);
};

// Format duration for display
const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

interface DayDetailDialogProps {
  day: Date;
  sessions: ScheduleSession[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function DayDetailDialog({ day, sessions, isOpen, onOpenChange }: DayDetailDialogProps) {
  const studySessions = sessions.filter(s => s.type !== "break");
  const totalMinutes = studySessions.reduce((acc, s) => acc + calculateDuration(s.startTime, s.endTime), 0);
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {format(day, "EEEE, MMMM d")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Day summary */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{studySessions.length} sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{formatDuration(totalMinutes)} total</span>
            </div>
          </div>
          
          {/* Sessions list */}
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Rest day - No sessions scheduled</p>
                </div>
              ) : (
                sessions.map((session, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-xl border transition-all hover:shadow-md",
                      session.type === "break" 
                        ? "bg-muted/30 border-muted" 
                        : getSubjectColor(session.subject)
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{session.subject}</h4>
                          {session.type === "revision" && (
                            <Badge variant="outline" className="text-xs">Revision</Badge>
                          )}
                        </div>
                        <p className="text-sm opacity-80 mt-1">{session.topic}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {session.startTime} - {session.endTime}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(calculateDuration(session.startTime, session.endTime))}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function WeeklyCalendar() {
  const { data: plan, isLoading } = useActivePlan();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

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

  // Calculate weekly stats
  const weeklyStats = weekDays.reduce((acc, day) => {
    const dayName = format(day, "EEEE");
    const sessions = getSessionsForDay(dayName).filter(s => s.type !== "break");
    const dayMinutes = sessions.reduce((sum, s) => sum + calculateDuration(s.startTime, s.endTime), 0);
    return {
      totalMinutes: acc.totalMinutes + dayMinutes,
      totalSessions: acc.totalSessions + sessions.length,
      subjects: new Set([...acc.subjects, ...sessions.map(s => s.subject)]),
    };
  }, { totalMinutes: 0, totalSessions: 0, subjects: new Set<string>() });

  // Get unique subjects for legend
  const uniqueSubjects = Array.from(weeklyStats.subjects);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Weekly Schedule
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
          </p>
        </div>
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

      {/* Weekly Stats Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total Time</span>
          </div>
          <p className="font-display font-bold text-lg text-primary">
            {formatDuration(weeklyStats.totalMinutes)}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs text-muted-foreground">Sessions</span>
          </div>
          <p className="font-display font-bold text-lg text-green-600 dark:text-green-400">
            {weeklyStats.totalSessions}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-muted-foreground">Subjects</span>
          </div>
          <p className="font-display font-bold text-lg text-purple-600 dark:text-purple-400">
            {uniqueSubjects.length}
          </p>
        </div>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map((day) => {
          const dayName = format(day, "EEEE");
          const sessions = getSessionsForDay(dayName).filter(s => s.type !== "break");
          const dayMinutes = sessions.reduce((sum, s) => sum + calculateDuration(s.startTime, s.endTime), 0);
          
          return (
            <Tooltip key={day.toISOString()}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "text-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-muted/50",
                    isToday(day) && "bg-primary/10"
                  )}
                  onClick={() => setSelectedDay(day)}
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
                  {sessions.length > 0 && (
                    <div className="flex justify-center gap-0.5 mt-1">
                      {sessions.slice(0, 3).map((s, i) => (
                        <div key={i} className={cn("w-1.5 h-1.5 rounded-full", getSubjectDotColor(s.subject))} />
                      ))}
                      {sessions.length > 3 && (
                        <span className="text-[8px] text-muted-foreground">+{sessions.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{sessions.length} sessions • {formatDuration(dayMinutes)}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-7 gap-2 min-h-[300px]">
        {weekDays.map((day) => {
          const dayName = format(day, "EEEE");
          const sessions = getSessionsForDay(dayName);
          const studySessions = sessions.filter(s => s.type !== "break");
          const dayMinutes = studySessions.reduce((sum, s) => sum + calculateDuration(s.startTime, s.endTime), 0);
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "rounded-xl p-2 min-h-[280px] transition-all cursor-pointer hover:shadow-md",
                isToday(day) 
                  ? "bg-primary/5 border-2 border-primary/30" 
                  : "bg-muted/30 border border-transparent hover:border-muted-foreground/20"
              )}
              onClick={() => setSelectedDay(day)}
            >
              {/* Day progress indicator */}
              {studySessions.length > 0 && (
                <div className="mb-2">
                  <Progress 
                    value={Math.min((dayMinutes / 240) * 100, 100)} 
                    className="h-1"
                  />
                  <p className="text-[9px] text-muted-foreground text-center mt-1">
                    {formatDuration(dayMinutes)}
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                {studySessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                    <CheckCircle className="w-6 h-6 mb-1 opacity-30" />
                    <p className="text-xs">Rest day</p>
                  </div>
                ) : (
                  studySessions.slice(0, 4).map((session, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-2 rounded-lg border text-xs transition-all hover:shadow-sm",
                        getSubjectColor(session.subject)
                      )}
                    >
                      <p className="font-medium truncate">{session.subject}</p>
                      <p className="text-[10px] opacity-70 truncate">{session.topic}</p>
                      <div className="flex items-center gap-1 mt-1 opacity-60">
                        <Clock className="w-3 h-3" />
                        <span>{session.startTime}</span>
                      </div>
                    </div>
                  ))
                )}
                {studySessions.length > 4 && (
                  <Button variant="ghost" size="sm" className="w-full h-6 text-[10px]">
                    +{studySessions.length - 4} more
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subject Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">Subjects</span>
          {uniqueSubjects.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs"
              onClick={() => setShowAllSubjects(!showAllSubjects)}
            >
              <Filter className="w-3 h-3 mr-1" />
              {showAllSubjects ? "Show less" : `Show all (${uniqueSubjects.length})`}
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {(showAllSubjects ? uniqueSubjects : uniqueSubjects.slice(0, 6)).map((subject) => (
            <div key={subject} className="flex items-center gap-1.5">
              <div className={cn("w-2.5 h-2.5 rounded-full", getSubjectDotColor(subject))} />
              <span className="text-xs text-muted-foreground">{subject}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day Detail Dialog */}
      {selectedDay && (
        <DayDetailDialog
          day={selectedDay}
          sessions={getSessionsForDay(format(selectedDay, "EEEE"))}
          isOpen={selectedDay !== null}
          onOpenChange={(open) => !open && setSelectedDay(null)}
        />
      )}
    </div>
  );
}
