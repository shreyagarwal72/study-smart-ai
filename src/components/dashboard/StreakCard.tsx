import { Flame, TrendingUp } from "lucide-react";
import { useStreak } from "@/hooks/useStudyData";

export function StreakCard() {
  const { data: streak, isLoading } = useStreak();

  const currentStreak = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Animated flame background */}
      {currentStreak > 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 to-destructive/5 animate-pulse" />
      )}
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Flame 
              className={`w-8 h-8 ${
                currentStreak > 0 
                  ? "text-chart-3 animate-bounce" 
                  : "text-muted-foreground"
              }`} 
            />
            {currentStreak >= 7 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-3 rounded-full animate-ping" />
            )}
          </div>
          {currentStreak > 0 && (
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              On fire!
            </span>
          )}
        </div>
        
        {isLoading ? (
          <div className="h-8 bg-muted animate-pulse rounded" />
        ) : (
          <>
            <div className="text-3xl font-display font-bold flex items-baseline gap-1">
              {currentStreak}
              <span className="text-lg text-muted-foreground">days</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Study Streak 🔥
            </div>
            {longestStreak > currentStreak && (
              <div className="text-xs text-muted-foreground mt-2">
                Best: {longestStreak} days
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
