import { Sparkles, Users, TrendingUp, Target } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "Join thousands",
    label: "of students using Task2Top",
  },
  {
    icon: TrendingUp,
    value: "AI-Powered",
    label: "Smart scheduling technology",
  },
  {
    icon: Target,
    value: "Personalized",
    label: "Tailored to your goals",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Task2Top?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Study Smarter, <span className="text-primary">Not Harder</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform helps you create the perfect study schedule tailored to your unique needs
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card-hover p-8 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Ready to transform your study routine? Try Task2Top today!
          </p>
        </div>
      </div>
    </section>
  );
}
