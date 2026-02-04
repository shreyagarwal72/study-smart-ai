import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Subject {
  name: string;
  color: string;
}

interface SubjectWithPriority extends Subject {
  priority: number; // 1-5 scale (1 = weak, 5 = strong)
}

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubjects: SubjectWithPriority[];
  onChange: (subjects: SubjectWithPriority[]) => void;
}

export function SubjectSelector({ subjects, selectedSubjects, onChange }: SubjectSelectorProps) {
  const isSelected = (subjectName: string) => {
    return selectedSubjects.some((s) => s.name === subjectName);
  };

  const getSubjectPriority = (subjectName: string) => {
    return selectedSubjects.find((s) => s.name === subjectName)?.priority || 3;
  };

  const toggleSubject = (subject: Subject) => {
    if (isSelected(subject.name)) {
      onChange(selectedSubjects.filter((s) => s.name !== subject.name));
    } else {
      onChange([...selectedSubjects, { ...subject, priority: 3 }]);
    }
  };

  const updatePriority = (subjectName: string, priority: number) => {
    onChange(
      selectedSubjects.map((s) =>
        s.name === subjectName ? { ...s, priority } : s
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Subject selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {subjects.map((subject) => {
          const selected = isSelected(subject.name);
          return (
            <button
              key={subject.name}
              type="button"
              onClick={() => toggleSubject(subject)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                selected
                  ? "border-transparent"
                  : "bg-card hover:bg-muted border-border hover:border-primary/50"
              )}
              style={{
                backgroundColor: selected ? `${subject.color}20` : undefined,
                borderColor: selected ? subject.color : undefined,
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: subject.color }}
              />
              <span className="truncate">{subject.name}</span>
              {selected && (
                <Check className="w-4 h-4 ml-auto flex-shrink-0 text-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Priority adjustment for selected subjects */}
      {selectedSubjects.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <p className="text-sm text-muted-foreground">
            Rate your proficiency (Weak ← → Strong):
          </p>
          {selectedSubjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-sm font-medium">{subject.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-4 h-4 cursor-pointer transition-colors",
                        star <= subject.priority
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      )}
                      onClick={() => updatePriority(subject.name, star)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
