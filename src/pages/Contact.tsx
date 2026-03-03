import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
    value: "+880-18737-22228",
    href: "tel:+8801873722228",
  },
  {
    icon: Phone,
    label: "Alternative",
    value: "01689877007",
    href: "tel:+8801689877007",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Sun – Thu, 10 AM – 7 PM (BST)",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);

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
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      subject: result.data.subject,
      message: result.data.message,
    });
    setSending(false);
    if (error) {
      toast({ title: "Error", description: "Failed to send. Please try again.", variant: "destructive" });
      return;
    }
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center">
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

                  <Button type="submit" size="lg" className="w-full gradient-bg border-0" disabled={sending}>
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
                        <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <div className="glass-card rounded-xl overflow-hidden h-48 relative">
                <div className="absolute inset-0 grid-pattern opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={28} className="text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
