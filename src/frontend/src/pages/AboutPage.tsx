import {
  Award,
  BookOpen,
  Globe,
  Lock,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const achievements = [
  {
    value: "12",
    label: "CTF Championships",
    icon: Award,
    color: "text-neon-green",
  },
  {
    value: "50+",
    label: "Workshops Conducted",
    icon: BookOpen,
    color: "text-electric-blue",
  },
  {
    value: "200+",
    label: "Active Members",
    icon: Users,
    color: "text-accent-purple",
  },
  {
    value: "8",
    label: "National Ranks",
    icon: Globe,
    color: "text-neon-green",
  },
  {
    value: "30+",
    label: "Projects Built",
    icon: Zap,
    color: "text-electric-blue",
  },
  {
    value: "5",
    label: "Research Papers",
    icon: BookOpen,
    color: "text-accent-purple",
  },
];

const cyberTopics = [
  {
    icon: Lock,
    title: "Network Security",
    desc: "Firewalls, IDS/IPS, VPNs, and network monitoring.",
  },
  {
    icon: Shield,
    title: "Web Security",
    desc: "OWASP Top 10, XSS, SQLi, CSRF and beyond.",
  },
  {
    icon: Target,
    title: "Penetration Testing",
    desc: "Ethical hacking, vulnerability scanning, exploitation.",
  },
  {
    icon: Globe,
    title: "Digital Forensics",
    desc: "Incident response, memory forensics, log analysis.",
  },
  {
    icon: Zap,
    title: "Malware Analysis",
    desc: "Reverse engineering, sandbox analysis, threat intel.",
  },
  {
    icon: BookOpen,
    title: "Cryptography",
    desc: "Encryption, hashing, PKI, and secure protocols.",
  },
];

const missionItems = [
  {
    title: "Learn",
    desc: "Master security concepts through workshops, labs, and guided learning paths.",
    borderColor: "border-neon-green/40",
    textColor: "text-neon-green",
  },
  {
    title: "Compete",
    desc: "Represent MNIT Jaipur in national and international CTF competitions.",
    borderColor: "border-electric-blue/40",
    textColor: "text-electric-blue",
  },
  {
    title: "Build",
    desc: "Create security tools, contribute to open-source, and build portfolios.",
    borderColor: "border-accent-purple/40",
    textColor: "text-accent-purple",
  },
  {
    title: "Network",
    desc: "Connect with industry professionals, alumni, and fellow security enthusiasts.",
    borderColor: "border-neon-green/40",
    textColor: "text-neon-green",
  },
];

function CounterCard({
  value,
  label,
  icon: Icon,
  color,
}: { value: string; label: string; icon: typeof Award; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-card-green p-6 text-center group card-hover"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`text-3xl font-bold font-mono ${color} mb-1`}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(missionRef, { once: true });

  return (
    <div className="pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div className="page-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Shield className="w-3.5 h-3.5" /> About Us
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Our <span className="neon-text-green">Mission</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Infosec Club is the premier cybersecurity community at MNIT
              Jaipur, dedicated to fostering a culture of security awareness,
              technical excellence, and responsible digital citizenship.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-cyber-surface/50" ref={missionRef}>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                Who We <span className="neon-text-green">Are</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2018, Infosec Club at MNIT Jaipur has grown from a
                  small group of enthusiasts into a vibrant community of over
                  200 security professionals-in-training.
                </p>
                <p>
                  We believe that cybersecurity knowledge should be accessible
                  to everyone. Our club provides hands-on learning experiences
                  through workshops, CTF competitions, guest lectures, and
                  collaborative research projects.
                </p>
                <p>
                  From beginners curious about how the internet works to
                  advanced practitioners hunting for zero-days, our community
                  welcomes all levels of expertise.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {missionItems.map((item) => (
                <div
                  key={item.title}
                  className={`glass-card border-l-2 ${item.borderColor} p-4 flex items-start gap-4`}
                >
                  <span
                    className={`font-mono font-bold ${item.textColor} text-sm`}
                  >
                    &gt; {item.title}
                  </span>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              What is <span className="neon-text-green">Cybersecurity?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cybersecurity protects computer systems, networks, and data from
              digital attacks, unauthorized access, and damage. Here are the key
              domains we explore:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cyberTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-6 border border-white/10 group card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mb-4">
                  <topic.icon className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="font-semibold text-base mb-2 text-foreground">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-sm">{topic.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cyber-surface/50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Our <span className="neon-text-green">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Years of hard work, countless hours of practice, and the support
              of our community.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievements.map((a) => (
              <CounterCard key={a.label} {...a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
