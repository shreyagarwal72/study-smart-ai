import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const TIMER_SETTINGS = {
  focus: { duration: 25 * 60, label: "Focus", icon: Brain },
  shortBreak: { duration: 5 * 60, label: "Short Break", icon: Coffee },
  longBreak: { duration: 15 * 60, label: "Long Break", icon: Coffee },
};

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSettings = TIMER_SETTINGS[mode];
  const progress = ((currentSettings.duration - timeLeft) / currentSettings.duration) * 100;

  useEffect(() => {
    // Create audio element for notification
    audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQAHj8PZ1LR6GQZCm+jxv3UxBFes7/aobBUBWK/t86hrFQJYruz0qWsUAlmu7fSqahQBV63t9KsqAFqx8viubhgCXLL1+rBwGwJetPb8snIeA2C29/2markup");
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      if (mode === "focus") {
        setSessionsCompleted((prev) => prev + 1);
        // Auto-switch to break
        const nextMode = (sessionsCompleted + 1) % 4 === 0 ? "longBreak" : "shortBreak";
        setMode(nextMode);
        setTimeLeft(TIMER_SETTINGS[nextMode].duration);
      } else {
        // Break completed, back to focus
        setMode("focus");
        setTimeLeft(TIMER_SETTINGS.focus.duration);
      }
      // Play notification sound
      try {
        audioRef.current?.play();
      } catch (e) {
        // Audio play failed, ignore
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode, sessionsCompleted]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_SETTINGS[mode].duration);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_SETTINGS[newMode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const IconComponent = currentSettings.icon;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold">Pomodoro Timer</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="text-success font-medium">{sessionsCompleted}</span>
          <span>sessions</span>
        </div>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 mb-6">
        {(Object.keys(TIMER_SETTINGS) as TimerMode[]).map((timerMode) => (
          <Button
            key={timerMode}
            variant={mode === timerMode ? "default" : "ghost"}
            size="sm"
            onClick={() => switchMode(timerMode)}
            className={cn(
              "flex-1 rounded-lg text-xs",
              mode === timerMode && "bg-gradient-to-r from-primary to-primary-glow"
            )}
          >
            {TIMER_SETTINGS[timerMode].label}
          </Button>
        ))}
      </div>

      {/* Timer display */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Progress ring */}
        <svg className="w-48 h-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke={mode === "focus" ? "hsl(var(--primary))" : "hsl(var(--success))"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <IconComponent className={cn(
            "w-8 h-8 mb-2",
            mode === "focus" ? "text-primary" : "text-success"
          )} />
          <span className="font-display text-4xl font-bold tabular-nums">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm text-muted-foreground mt-1">
            {currentSettings.label}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          className="rounded-full w-12 h-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button
          onClick={toggleTimer}
          className={cn(
            "rounded-full w-16 h-16",
            mode === "focus" 
              ? "bg-gradient-to-r from-primary to-primary-glow" 
              : "bg-gradient-to-r from-success to-emerald-400"
          )}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        <div className="w-12" /> {/* Spacer for symmetry */}
      </div>

      {/* Tips */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        {mode === "focus" 
          ? "Stay focused! Minimize distractions." 
          : "Take a break! Stretch, hydrate, rest your eyes."}
      </p>
    </div>
  );
}
