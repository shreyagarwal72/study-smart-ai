import { streams } from "@/lib/planner-data";
import { cn } from "@/lib/utils";
import { FlaskConical, Calculator, Briefcase, Palette } from "lucide-react";

interface StreamSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const streamIcons: Record<string, React.ElementType> = {
  "science-pcm": Calculator,
  "science-pcb": FlaskConical,
  commerce: Briefcase,
  arts: Palette,
};

export function StreamSelector({ value, onChange }: StreamSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {streams.map((stream) => {
        const Icon = streamIcons[stream.value];
        return (
          <button
            key={stream.value}
            type="button"
            onClick={() => onChange(stream.value)}
            className={cn(
              "flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-200 border",
              value === stream.value
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-card hover:bg-muted border-border hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                value === stream.value ? "bg-primary-foreground/20" : "bg-muted"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{stream.label}</span>
          </button>
        );
      })}
    </div>
  );
}
