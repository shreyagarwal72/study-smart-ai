import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-glow p-8 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Start for free</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Study Routine?
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join 50,000+ students who are studying smarter with AI-powered schedules. Get started in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/planner">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg border-2 border-white/30 bg-transparent text-white hover:bg-white/10"
                >
                  Try Without Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
