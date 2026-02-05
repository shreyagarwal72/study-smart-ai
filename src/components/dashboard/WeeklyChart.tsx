import { BarChart3 } from "lucide-react";
import { useWeeklyStats } from "@/hooks/useStudyData";

export function WeeklyChart() {
  const { stats, totalHours } = useWeeklyStats();
  const maxHours = Math.max(...stats.map((s) => s.hours), 6);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold">Weekly Progress</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {totalHours.toFixed(1)}h total
        </span>
      </div>
      
      <div className="space-y-3">
        {stats.map((item, i) => {
          const today = new Date().toISOString().split("T")[0];
          const isToday = item.date === today;
          
          return (
            <div key={i} className="flex items-center gap-3">
              <span className={`text-xs w-8 ${isToday ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                {item.day}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isToday 
                      ? "bg-gradient-to-r from-primary to-primary-glow" 
                      : "bg-primary/60"
                  }`}
                  style={{ width: `${maxHours > 0 ? (item.hours / maxHours) * 100 : 0}%` }}
                />
              </div>
              <span className={`text-xs w-10 text-right ${isToday ? "font-semibold" : "text-muted-foreground"}`}>
                {item.hours}h
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
