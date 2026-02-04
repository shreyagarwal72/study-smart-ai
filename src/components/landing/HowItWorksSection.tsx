import { FileText, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Enter Your Details",
    description: "Tell us about your subjects, exam dates, available study hours, and which topics need more attention.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Generates Your Schedule",
    description: "Our AI analyzes your inputs and creates a personalized study plan with smart revision slots and breaks.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Start Studying Smarter",
    description: "Follow your optimized schedule, track progress, and watch your productivity soar.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your perfect study schedule in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-0.5 bg-gradient-to-r from-primary via-accent to-success" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-display text-2xl font-bold mb-6 shadow-glow group-hover:scale-110 transition-transform relative z-10">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-xl bg-muted flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
