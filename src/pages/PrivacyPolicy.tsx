import { motion } from "framer-motion";

const PrivacyPolicy = () => (
  <div className="pt-28 pb-20">
    <section className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as when you fill out our contact form, subscribe to our newsletter, or engage our services. This may include your name, email address, phone number, and company details.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you technical notices and updates</li>
              <li>Communicate about products, services, and events</li>
              <li>Improve our website and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">4. Third-Party Services</h2>
            <p>We may use third-party services (analytics, hosting) that collect information. These services have their own privacy policies governing the use of your information.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at info@engineerstechbd.com for any data-related requests.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">6. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at info@engineerstechbd.com.</p>
          </div>
        </div>
      </motion.div>
    </section>
  </div>
);

export default PrivacyPolicy;
