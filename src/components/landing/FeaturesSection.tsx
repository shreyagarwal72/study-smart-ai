import { 
  Brain, 
  Calendar, 
  Clock, 
  BarChart3, 
  RefreshCw, 
  Download,
  Sparkles,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Scheduling",
    description: "Our AI analyzes your subjects, available time, and learning patterns to create the perfect study schedule.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: RefreshCw,
    title: "Smart Revision Slots",
    description: "Automatically places revision sessions using spaced repetition for maximum retention.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Clock,
    title: "Pomodoro Timer",
    description: "Built-in Pomodoro timer with customizable work and break intervals to maximize focus.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your study hours, completion rates, and maintain your learning streak.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Target,
    title: "Exam Countdown",
    description: "Never miss a deadline with smart exam countdowns and buffer day calculations.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: Download,
    title: "Export & Sync",
    description: "Export your schedule as PDF and sync across all your devices seamlessly.",
    color: "bg-chart-5/10 text-chart-5",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Study Smarter</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Task2Top combines AI intelligence with proven study techniques to help you achieve your academic goals.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card-hover p-6 lg:p-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
