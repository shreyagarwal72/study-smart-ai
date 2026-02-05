import { Quote, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Learning is not attained by chance, it must be sought for with ardor.", author: "Abigail Adams" },
  { text: "Knowledge is power. Information is liberating.", author: "Kofi Annan" },
];

export function QuoteCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Get a consistent quote for the day
    const today = new Date().toDateString();
    const hash = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setQuoteIndex(hash % quotes.length);
  }, []);

  const quote = quotes[quoteIndex];

  const shuffleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={shuffleQuote}
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
      
      <Quote className="w-8 h-8 text-primary/40 mb-4" />
      <p className="text-lg font-medium mb-4 leading-relaxed">
        "{quote.text}"
      </p>
      <p className="text-sm text-muted-foreground">— {quote.author}</p>
    </div>
  );
}
