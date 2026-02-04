import { Layout } from "@/components/layout/Layout";
import { StudyPlannerForm } from "@/components/planner/StudyPlannerForm";
import { Sparkles } from "lucide-react";

const Planner = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Study Planner</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Create Your <span className="text-primary">Perfect Schedule</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your study goals and let AI generate a personalized timetable for you.
            </p>
          </div>

          {/* Planner form */}
          <StudyPlannerForm />
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
