import { classLevels } from "@/lib/planner-data";
import { cn } from "@/lib/utils";
import { GraduationCap, School, BookOpen, Trophy, University } from "lucide-react";

interface ClassSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  primary: School,
  secondary: BookOpen,
  "higher-secondary": GraduationCap,
  competitive: Trophy,
  college: University,
};

const categoryLabels: Record<string, string> = {
  primary: "Primary (1-8)",
  secondary: "Secondary (9-10)",
  "higher-secondary": "Higher Secondary (11-12)",
  competitive: "Competitive Exams",
  college: "College",
};

export function ClassSelector({ value, onChange }: ClassSelectorProps) {
  const categories = ["primary", "secondary", "higher-secondary", "competitive", "college"];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const levels = classLevels.filter((c) => c.category === category);

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon className="w-4 h-4" />
              <span>{categoryLabels[category]}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {levels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => onChange(level.value)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                    value === level.value
                      ? "bg-primary text-primary-foreground border-primary shadow-glow"
                      : "bg-card hover:bg-muted border-border hover:border-primary/50"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
