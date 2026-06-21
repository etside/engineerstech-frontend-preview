import { motion } from "framer-motion";

const Terms = () => (
  <div className="pt-28 pb-20">
    <section className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">2. Services</h2>
            <p>engineersTech provides software development, consulting, and related technology services. All engagements are governed by separate service agreements.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">3. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and software, is the property of engineersTech and protected by intellectual property laws. Deliverables created for clients are governed by individual service agreements.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">4. Limitation of Liability</h2>
            <p>engineersTech shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">5. Governing Law</h2>
            <p>These terms are governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Dhaka.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">6. Contact</h2>
            <p>For questions about these Terms, contact us at info@engineerstechbd.com.</p>
          </div>
        </div>
      </motion.div>
    </section>
  </div>
);

export default Terms;
