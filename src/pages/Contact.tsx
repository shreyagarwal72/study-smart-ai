import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact form */}
            <div className="glass-card p-8">
              <h2 className="font-display text-xl font-semibold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your question or feedback..." 
                    className="rounded-xl min-h-[150px]" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow group"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm mb-2">For general inquiries and support</p>
                    <a href="mailto:hello@task2top.com" className="text-primary hover:underline">
                      hello@task2top.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Live Chat</h3>
                    <p className="text-muted-foreground text-sm mb-2">Available Mon-Fri, 9AM-6PM IST</p>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Education Lane<br />
                      Bengaluru, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ link */}
              <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="font-display font-semibold mb-2">Looking for quick answers?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Check out our FAQ section for answers to common questions.
                </p>
                <Button variant="outline" className="rounded-lg" asChild>
                  <a href="/#faq">View FAQ</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
