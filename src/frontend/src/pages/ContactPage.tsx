import {
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageSquare,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContactMessage } from "../hooks/useQueries";

const socialLinks = [
  {
    Icon: Github,
    label: "GitHub",
    handle: "@infosec-mnit",
    href: "https://github.com/infosec-mnit",
  },
  {
    Icon: Twitter,
    label: "Twitter",
    handle: "@infosec_mnit",
    href: "https://twitter.com/infosec_mnit",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    handle: "@infosec_mnit",
    href: "https://instagram.com/infosec_mnit",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    handle: "Infosec Club MNIT",
    href: "https://linkedin.com/company/infosec-mnit",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        read: false,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Mail className="w-3.5 h-3.5" /> Contact
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Get in <span className="neon-text-green">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions? Want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card-green p-8">
                <h2 className="font-display font-bold text-xl mb-6">
                  Send a <span className="neon-text-green">Message</span>
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
                    <p className="text-neon-green font-semibold text-lg mb-2">
                      Message Sent!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Thank you for reaching out. We'll respond within 24-48
                      hours.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="contact.panel"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="text-sm text-muted-foreground mb-1.5 block"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          className="cyber-input"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="text-sm text-muted-foreground mb-1.5 block"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          className="cyber-input"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        className="cyber-input"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, subject: e.target.value }))
                        }
                        required
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        className="cyber-input min-h-[140px] resize-none"
                        placeholder="Your message..."
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        required
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full neon-btn-green py-3 rounded-lg flex items-center justify-center gap-2"
                      data-ocid="contact.submit_button"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-card-green p-6">
                <h3 className="font-semibold mb-4 text-electric-blue">
                  Find Us
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="text-foreground font-medium">Email:</span>{" "}
                    infosec@mnit.ac.in
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      Location:
                    </span>{" "}
                    CS Department, MNIT Jaipur, Rajasthan 302017
                  </p>
                  <p>
                    <span className="text-foreground font-medium">
                      Meeting:
                    </span>{" "}
                    Every Saturday, 3:00 PM - 5:00 PM
                  </p>
                </div>
              </div>

              <div className="glass-card-green p-6">
                <h3 className="font-semibold mb-4 text-electric-blue">
                  Follow Us
                </h3>
                <div className="space-y-3">
                  {socialLinks.map(({ Icon, label, handle, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-neon-green/40 hover:bg-neon-green/5 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-green transition-colors" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card border border-neon-green/20 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  <span className="text-neon-green">&gt;</span> We typically
                  respond within 24-48 hours.
                  <br />
                  <span className="text-neon-green">&gt;</span> For urgent
                  matters, DM us on social.
                  <br />
                  <span className="text-neon-green">&gt;</span> For
                  collaboration opportunities, use the form.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
