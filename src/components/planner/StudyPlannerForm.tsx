import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  CalendarIcon, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Loader2,
  CheckCircle2
} from "lucide-react";
import { ClassSelector } from "./ClassSelector";
import { StreamSelector } from "./StreamSelector";
import { SubjectSelector } from "./SubjectSelector";
import { classLevels, getSubjectsForLevel } from "@/lib/planner-data";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SubjectWithPriority {
  name: string;
  color: string;
  priority: number;
}

export function StudyPlannerForm() {
  const [step, setStep] = useState(1);
  const [classLevel, setClassLevel] = useState("");
  const [stream, setStream] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectWithPriority[]>([]);
  const [dailyHours, setDailyHours] = useState(4);
  const [examDate, setExamDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const selectedClass = classLevels.find((c) => c.value === classLevel);
  const needsStream = selectedClass?.category === "higher-secondary";
  const availableSubjects = useMemo(
    () => getSubjectsForLevel(classLevel, stream),
    [classLevel, stream]
  );

  const daysUntilExam = examDate ? differenceInDays(examDate, new Date()) : null;

  const canProceed = () => {
    switch (step) {
      case 1:
        return classLevel !== "" && (!needsStream || stream !== "");
      case 2:
        return selectedSubjects.length > 0;
      case 3:
        return dailyHours >= 1;
      case 4:
        return examDate !== undefined && daysUntilExam !== null && daysUntilExam > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to create a study plan");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("study_plans").insert([{
        user_id: user.id,
        title: `${selectedClass?.label || ""} ${stream ? `(${stream})` : ""} Study Plan`,
        class_level: classLevel,
        stream: stream || null,
        subjects: JSON.parse(JSON.stringify(selectedSubjects)),
        exam_date: examDate?.toISOString().split("T")[0],
        daily_hours: dailyHours,
        is_active: true,
      }]);

      if (error) throw error;

      toast.success("Study plan created! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create study plan");
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    "Select Your Class/Exam",
    "Choose Your Subjects",
    "Daily Study Hours",
    "Exam Date",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 4 && (
              <div
                className={cn(
                  "hidden sm:block w-16 md:w-24 h-1 rounded-full mx-2",
                  step > s ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="glass-card p-6 lg:p-8">
        <h2 className="font-display text-xl lg:text-2xl font-semibold mb-6">
          {stepTitles[step - 1]}
        </h2>

        {/* Step 1: Class Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <ClassSelector value={classLevel} onChange={setClassLevel} />
            
            {needsStream && (
              <div className="pt-4 border-t border-border">
                <Label className="text-base mb-4 block">Select Your Stream</Label>
                <StreamSelector value={stream} onChange={setStream} />
              </div>
            )}
          </div>
        )}

        {/* Step 2: Subject Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Select the subjects you want to study and rate your proficiency.
            </p>
            <SubjectSelector
              subjects={availableSubjects}
              selectedSubjects={selectedSubjects}
              onChange={setSelectedSubjects}
            />
          </div>
        )}

        {/* Step 3: Daily Hours */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/10 mb-6">
                <Clock className="w-8 h-8 text-primary" />
                <span className="font-display text-4xl font-bold text-primary">
                  {dailyHours} hours
                </span>
              </div>
              <p className="text-muted-foreground">per day</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Slider
                value={[dailyHours]}
                onValueChange={([value]) => setDailyHours(value)}
                min={1}
                max={12}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 hour</span>
                <span>12 hours</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
              <p>💡 <strong>Tip:</strong> We recommend 4-6 hours of focused study with proper breaks. Quality over quantity!</p>
            </div>
          </div>
        )}

        {/* Step 4: Exam Date */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full max-w-sm justify-start text-left font-normal rounded-xl py-6",
                      !examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {examDate ? format(examDate, "PPP") : "Select exam date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="center">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={setExamDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {daysUntilExam !== null && daysUntilExam > 0 && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-success/10 text-success">
                    <span className="font-display text-2xl font-bold">{daysUntilExam}</span>
                    <span className="text-sm">days to prepare</span>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-xl p-6 space-y-3">
              <h3 className="font-semibold">Your Study Plan Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Class/Exam:</span>
                  <p className="font-medium">{selectedClass?.label} {stream && `(${stream})`}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Subjects:</span>
                  <p className="font-medium">{selectedSubjects.length} selected</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Daily Hours:</span>
                  <p className="font-medium">{dailyHours} hours</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Study Hours:</span>
                  <p className="font-medium">{daysUntilExam ? daysUntilExam * dailyHours : 0} hours</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="rounded-xl bg-gradient-to-r from-primary to-primary-glow group"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="rounded-xl bg-gradient-to-r from-primary to-primary-glow group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Plan
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
