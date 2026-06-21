import { motion } from "framer-motion";

const DataProtectionPolicy = () => (
  <div className="pt-28 pb-20">
    <section className="container max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Data Protection Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-3">1. Data Controller</h2>
            <p>engineersTech is the data controller for personal information collected through this website. Registered: TRAD/DNCC/025495/2025.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">2. Data We Process</h2>
            <p>We process personal data for: responding to inquiries, providing services, marketing communications, and website analytics.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">3. Legal Basis</h2>
            <p>We process data based on: consent (contact forms), contractual necessity (service delivery), and legitimate interest (analytics, marketing).</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">4. Data Retention</h2>
            <p>We retain personal data only as long as necessary for the purposes collected, or as required by law.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">5. Data Transfers</h2>
            <p>Your data may be processed in countries outside Bangladesh. We ensure appropriate safeguards are in place for international transfers.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">6. Your Rights</h2>
            <p>You have the right to: access, rectify, erase, restrict processing, data portability, and object to processing of your personal data.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">7. Contact</h2>
            <p>For data protection inquiries, contact us at info@engineerstechbd.com.</p>
          </div>
        </div>
      </motion.div>
    </section>
  </div>
);

export default DataProtectionPolicy;
