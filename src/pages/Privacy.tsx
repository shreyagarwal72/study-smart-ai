import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: February 1, 2026</p>

            <div className="prose dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Task2Top ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">2. Information We Collect</h2>
                <h3 className="font-semibold mt-4 mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you create an account, we collect:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Email address</li>
                  <li>Name (optional)</li>
                  <li>Profile information you choose to provide</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2">Usage Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We automatically collect information about how you use our services, including study schedules created, session completion data, and feature usage patterns.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide and personalize our services</li>
                  <li>Generate AI-powered study schedules</li>
                  <li>Track your study progress and maintain streaks</li>
                  <li>Send important updates and notifications</li>
                  <li>Improve our services through analytics</li>
                  <li>Respond to your inquiries and support requests</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">4. Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share data with service providers who assist in operating our platform, but only as necessary to provide our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">7. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are available to students of all ages. If you are under 13, please have a parent or guardian review this policy and help you create an account.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Email:</strong> privacy@task2top.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
