import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, Brain, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Study Planning</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your Smart{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              AI Study Partner
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Generate personalized study schedules in seconds. Perfect for school, college, and competitive exam preparation. Study smarter, not harder.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/planner">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-glow-lg group"
              >
                Generate My Study Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg border-2"
              >
                Learn Study Tips
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">100K+</div>
              <div className="text-sm text-muted-foreground">Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">4.9★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="mt-16 lg:mt-20 relative animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="glass-card p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Mock app interface */}
            <div className="bg-muted/50 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <div className="flex-1 h-8 bg-background rounded-lg flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">task2top.app/planner</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Today's schedule card */}
                <div className="glass-card p-4 col-span-1 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-display font-semibold">Today's Schedule</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: "9:00 AM", subject: "Mathematics", color: "bg-primary" },
                      { time: "11:00 AM", subject: "Physics", color: "bg-success" },
                      { time: "2:00 PM", subject: "Chemistry", color: "bg-accent" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <div className={`w-1 h-10 rounded-full ${item.color}`} />
                        <div>
                          <div className="text-xs text-muted-foreground">{item.time}</div>
                          <div className="font-medium">{item.subject}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats card */}
                <div className="glass-card p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="font-display font-semibold">AI Insights</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-sm text-muted-foreground">Focus Time</div>
                    <div className="text-2xl font-display font-bold text-primary">4.5h</div>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <div className="text-sm text-muted-foreground">Streak</div>
                    <div className="text-2xl font-display font-bold text-success">12 days 🔥</div>
                  </div>
                  <div className="p-3 bg-background rounded-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Next Break</div>
                      <div className="font-medium">25 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 glass-card p-3 animate-float hidden lg:block">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <span className="text-sm font-medium">Task completed!</span>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 glass-card p-3 animate-float hidden lg:block" style={{ animationDelay: "-2s" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">AI optimizing...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
