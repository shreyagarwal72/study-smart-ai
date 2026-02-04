import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "JEE Aspirant",
    avatar: "PS",
    content: "Task2Top completely transformed my JEE preparation. The AI-generated schedule helped me cover all subjects systematically. Scored AIR 450!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "NEET Student",
    avatar: "RV",
    content: "The smart revision feature is a game-changer. It automatically reminded me to revise topics at the right intervals. Highly recommended for medical aspirants.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "College Student",
    avatar: "AP",
    content: "Managing multiple courses was overwhelming until I found Task2Top. Now I can balance all my subjects and still have time for extracurriculars.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "UPSC Aspirant",
    avatar: "VS",
    content: "The Pomodoro timer and progress tracking keep me accountable. My study streak is at 45 days! This app understands what serious aspirants need.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Loved by <span className="text-primary">50,000+</span> Students
          </h2>
          <p className="text-lg text-muted-foreground">
            See what students are saying about their experience with Task2Top
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card-hover p-6 lg:p-8 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
