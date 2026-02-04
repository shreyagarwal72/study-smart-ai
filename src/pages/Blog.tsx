import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-create-perfect-study-timetable",
    title: "How to Create the Perfect Study Timetable for Exams",
    excerpt: "Learn the science-backed strategies for creating a study schedule that maximizes retention and minimizes burnout. Perfect for students preparing for any exam.",
    author: "Task2Top Team",
    date: "February 1, 2026",
    readTime: "8 min read",
    category: "Study Tips",
    image: "📚",
  },
  {
    slug: "ai-vs-traditional-study-planning",
    title: "AI vs Traditional Study Planning: Which Works Better?",
    excerpt: "Discover how AI-powered study planning compares to traditional methods. We break down the pros and cons of each approach with real student data.",
    author: "Task2Top Team",
    date: "January 28, 2026",
    readTime: "6 min read",
    category: "AI & Learning",
    image: "🤖",
  },
  {
    slug: "10-science-backed-study-techniques",
    title: "10 Science-Backed Study Techniques for Better Retention",
    excerpt: "From spaced repetition to the Feynman technique, explore proven methods that will transform how you study and remember information.",
    author: "Task2Top Team",
    date: "January 24, 2026",
    readTime: "10 min read",
    category: "Study Techniques",
    image: "🧠",
  },
  {
    slug: "managing-study-time-competitive-exams",
    title: "Managing Study Time for Competitive Exams (JEE/NEET/UPSC)",
    excerpt: "A comprehensive guide for aspirants preparing for India's toughest competitive exams. Learn how to balance multiple subjects and maintain consistency.",
    author: "Task2Top Team",
    date: "January 20, 2026",
    readTime: "12 min read",
    category: "Competitive Exams",
    image: "🎯",
  },
  {
    slug: "pomodoro-technique-complete-guide",
    title: "The Pomodoro Technique: A Complete Guide for Students",
    excerpt: "Master the Pomodoro Technique to boost your focus and productivity. Includes tips for customizing the technique for different types of study sessions.",
    author: "Task2Top Team",
    date: "January 15, 2026",
    readTime: "7 min read",
    category: "Productivity",
    image: "🍅",
  },
];

const Blog = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Study Tips & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert advice on studying smarter, staying motivated, and achieving your academic goals.
            </p>
          </div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass-card-hover overflow-hidden group"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                <div className="p-6">
                  {/* Category */}
                  <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-4">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
