import { Layout } from "@/components/layout/Layout";
import { Users, Target, Heart, Sparkles } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              About <span className="text-primary">Task2Top</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to help students worldwide study smarter, not harder.
            </p>
          </div>

          {/* Mission section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Our Mission</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                Democratizing Smart Study Planning
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every student deserves access to effective study strategies, regardless of their background or resources. Traditional study planning requires time and knowledge that many students don't have.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Task2Top uses AI to apply proven learning science principles—spaced repetition, interleaving, and active recall—automatically. What would take hours of planning now happens in seconds.
              </p>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-4xl font-display font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Students using Task2Top</div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Student-First",
                  description: "Every feature we build starts with a real student need. We listen, learn, and iterate based on your feedback."
                },
                {
                  icon: Target,
                  title: "Science-Backed",
                  description: "We don't guess what works. Our methods are grounded in cognitive science research and proven learning techniques."
                },
                {
                  icon: Heart,
                  title: "Accessible to All",
                  description: "Quality education tools shouldn't be a luxury. Our core features are free, forever."
                },
              ].map((value, i) => (
                <div key={i} className="glass-card p-8 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Task2Top was born from a simple observation: the most successful students aren't just the hardest workers—they're the smartest planners. They understand how their brains learn best and structure their study time accordingly.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              But learning these meta-skills takes time and often privileged access to mentors or expensive coaching. We asked ourselves: what if AI could level the playing field?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Task2Top helps students from schools in rural India to universities in the US. Our AI has generated over 100,000 personalized study plans, and we're just getting started.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
