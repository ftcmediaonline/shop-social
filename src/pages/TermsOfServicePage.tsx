import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-12 max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 12, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using Tenga Virtual Mall, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>

        <h2>2. Account Registration</h2>
        <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.</p>

        <h2>3. Buying on Tenga</h2>
        <p>When you purchase a product, you enter into a transaction with the seller. Tenga facilitates the transaction but is not a party to the sale. Prices, availability, and product descriptions are set by individual sellers.</p>

        <h2>4. Selling on Tenga</h2>
        <p>Sellers must comply with all applicable laws and regulations. You are responsible for the accuracy of your product listings, timely fulfilment, and customer service. Tenga reserves the right to remove listings or suspend accounts that violate our policies.</p>

        <h2>5. Prohibited Activities</h2>
        <p>You may not use our platform to sell counterfeit goods, engage in fraud, harass other users, or violate any applicable laws. We reserve the right to suspend or terminate accounts engaged in prohibited activities.</p>

        <h2>6. Intellectual Property</h2>
        <p>All content on Tenga, including logos, design, and software, is the property of Tenga or its licensors. Sellers retain ownership of their product content but grant Tenga a licence to display it on the platform.</p>

        <h2>7. Limitation of Liability</h2>
        <p>Tenga is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

        <h2>8. Dispute Resolution</h2>
        <p>Any disputes between buyers and sellers should first be resolved directly. If a resolution cannot be reached, Tenga may mediate at its discretion. Legal disputes shall be governed by the laws of Kenya.</p>

        <h2>9. Changes to Terms</h2>
        <p>We may update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new Terms.</p>

        <h2>10. Contact</h2>
        <p>For questions about these Terms, please visit our <a href="/contact-us" className="text-primary hover:underline">contact page</a>.</p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
