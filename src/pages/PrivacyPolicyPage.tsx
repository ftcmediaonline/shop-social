import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-12 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 12, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly, such as your name, email address, and payment details when you create an account, make a purchase, or contact us. We also automatically collect usage data including IP address, browser type, and browsing behaviour on our platform.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to operate and improve our services, process transactions, communicate with you, and personalise your shopping experience. We may also use your data for security purposes and to comply with legal obligations.</p>

        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share your data with sellers on our platform to fulfil orders, with payment processors to complete transactions, and with service providers who help us operate our platform.</p>

        <h2>4. Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information, including encryption of data in transit and at rest. However, no method of transmission over the internet is 100% secure.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You can update your account information at any time or contact us to exercise your rights.</p>

        <h2>6. Cookies</h2>
        <p>We use cookies and similar technologies to enhance your experience, analyse usage, and deliver personalised content. You can manage your cookie preferences through your browser settings.</p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="/contact-us" className="text-primary hover:underline">our contact page</a>.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
