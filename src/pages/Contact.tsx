import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20, "Phone number too long").optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be under 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@engineerstechbd.com",
    href: "mailto:info@engineerstechbd.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+88 01314 44 33 11",
    href: "tel:+8801314443311",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Rashi International, Level 6, Flat B6\nPlot 9, Road 4, Sector 16/A\nUttara, Dhaka 1230",
    href: "https://maps.app.goo.gl/jcPQ1mB5N83hoGrm7",
  },
  {
    icon: MapPin,
    label: "Registered Address",
    value: "Faydabad Madrasha Road\nDakshinkhan, Dhaka 1230",
    href: null,
  },
];

const Contact = () => {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    try {
      await api.contact({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        subject: result.data.subject,
        message: result.data.message,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setSubmitError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={t("Contact Us", "যোগাযোগ করুন")}
        description={t("Get in touch with engineersTech for your next software project. Reach us by phone, email, or visit our Dhaka office — we typically reply within 24 hours.", "আপনার পরবর্তী সফটওয়্যার প্রজেক্টের জন্য engineersTech এর সাথে যোগাযোগ করুন। ফোন, ইমেইলের মাধ্যমে অথবা আমাদের ঢাকা অফিসে আসুন — আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।")}
        path="/contact"
        lang={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact engineersTech",
            url: "https://engineerstechbd.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "engineersTech",
              telephone: "+880-1314-443311",
              email: "info@engineerstechbd.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rashi International, Level 6, Flat B6, Plot 9, Road 4, Sector 16/A",
                addressLocality: "Uttara, Dhaka",
                postalCode: "1230",
                addressCountry: "BD"
              }
            }
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" }
          ])
        ]}
      />
      {/* Hero */}
      <section className="relative pt-16 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center pt-10 sm:pt-12 pb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
              <MessageSquare size={14} /> Get In Touch
            </div>
            <h1 className="mb-4">
              Let's Build Something{" "}
              <span className="gradient-text">Great Together</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a project in mind? We'd love to hear about it. Reach out and let's discuss how we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        placeholder="+880-1XXX-XXXXXX"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Project inquiry"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to the processing of my personal data in accordance with the{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full gradient-bg border-0" disabled={sending || !consent}>
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} /> Send Message
                      </span>
                    )}
                  </Button>
                  {submitted && <p className="text-sm text-green-500 text-center">Message sent! We'll get back to you within 24 hours.</p>}
                  {submitError && <p className="text-sm text-destructive text-center">{submitError}</p>}
                </form>
              </div>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="glass-card rounded-xl p-5 group hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm font-medium hover:text-primary transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
