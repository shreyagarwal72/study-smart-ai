import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Clock, Brain, ArrowRight, Sparkles } from "lucide-react";

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

          {/* Planner form placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 lg:p-12">
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold mb-4">
                  Smart Study Planner Coming Soon
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  We're putting the finishing touches on our AI-powered study planner. 
                  Sign up to be notified when it's ready!
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                  {[
                    { icon: Calendar, label: "Smart Scheduling" },
                    { icon: BookOpen, label: "Subject Analysis" },
                    { icon: Clock, label: "Time Optimization" },
                    { icon: Brain, label: "AI Insights" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/50">
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <Button className="rounded-xl bg-gradient-to-r from-primary to-primary-glow group">
                  Get Notified
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Planner;
