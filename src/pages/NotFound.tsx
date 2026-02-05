import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-mesh">
        <div className="w-full max-w-lg text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-[180px] font-display font-bold leading-none gradient-text opacity-20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow-lg float-animation">
                <Search className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Glass card content */}
          <div className="glass-card p-8 mb-6">
            <h1 className="font-display text-3xl font-bold mb-3">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off. 
              Don't worry, let's get you back on track with your studies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="rounded-xl bg-gradient-to-r from-primary to-primary-glow py-6 group"
              >
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" />
                  Go Home
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="rounded-xl py-6"
                onClick={() => window.history.back()}
              >
                <Link to="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Go Back
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link to="/planner" className="text-muted-foreground hover:text-primary transition-colors">
              Create Study Plan
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
