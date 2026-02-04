import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI generate my study schedule?",
    answer: "Our AI analyzes multiple factors including your subjects, exam dates, available study hours, and your self-reported strong/weak topics. It uses proven learning science principles like spaced repetition and interleaving to create an optimized schedule that maximizes retention and covers all material before your exams.",
  },
  {
    question: "Is Task2Top free to use?",
    answer: "Yes! Task2Top offers a generous free tier that includes AI-generated schedules, the Pomodoro timer, and basic progress tracking. Premium features like advanced analytics, PDF export, and unlimited schedule regeneration are available with a subscription.",
  },
  {
    question: "Can I edit the AI-generated schedule?",
    answer: "Absolutely! While our AI creates an optimized starting point, you have full control to drag and drop sessions, add or remove subjects, adjust timing, and customize breaks. Your changes are saved and the AI learns from your preferences.",
  },
  {
    question: "What exams does Task2Top support?",
    answer: "Task2Top works for any exam or academic goal. We have specialized templates for JEE, NEET, UPSC, GATE, CAT, school boards (CBSE, ICSE, State Boards), college courses, and more. You can also create custom study plans for any subject.",
  },
  {
    question: "Does Task2Top work offline?",
    answer: "Yes! Task2Top is a Progressive Web App (PWA). Once installed, your current schedule and timer work offline. When you're back online, your progress syncs automatically across all devices.",
  },
  {
    question: "How is my data protected?",
    answer: "We take privacy seriously. Your study data is encrypted and stored securely. We never sell your data to third parties. You can export or delete your data at any time from your account settings.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-none px-6"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* JSON-LD Schema for FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }} />
      </div>
    </section>
  );
}
