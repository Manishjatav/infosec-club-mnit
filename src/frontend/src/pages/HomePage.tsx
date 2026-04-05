import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Code2,
  Shield,
  Terminal,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import CyberGrid from "../components/CyberGrid";
import EventCard from "../components/EventCard";
import { useEvents } from "../hooks/useQueries";
import { isUpcoming } from "../utils/dateUtils";

const stats = [
  { value: "200+", label: "Members", icon: Users },
  { value: "50+", label: "Events Held", icon: Zap },
  { value: "12", label: "CTF Wins", icon: Trophy },
  { value: "30+", label: "Projects", icon: Code2 },
];

const features = [
  {
    icon: Shield,
    title: "Ethical Hacking",
    desc: "Learn penetration testing, vulnerability assessment, and responsible disclosure techniques.",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
    border: "border-neon-green/30",
  },
  {
    icon: Terminal,
    title: "CTF Competitions",
    desc: "Participate in national and international Capture The Flag competitions as a team.",
    color: "text-electric-blue",
    bg: "bg-electric-blue/10",
    border: "border-electric-blue/30",
  },
  {
    icon: Code2,
    title: "Security Research",
    desc: "Conduct original security research and publish findings in academic and industry venues.",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10",
    border: "border-accent-purple/30",
  },
];

function AnimatedCounter({
  value,
  label,
  icon: Icon,
}: { value: string; label: string; icon: typeof Users }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-card-green p-6 text-center"
    >
      <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-neon-green" />
      </div>
      <div className="text-3xl font-bold font-mono neon-text-green mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  const { data: events = [] } = useEvents();
  const featuredEvents = events.filter((e) => isUpcoming(e.date)).slice(0, 3);
  const displayEvents =
    featuredEvents.length > 0 ? featuredEvents : events.slice(0, 3);

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-bg">
          <CyberGrid />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
        </div>

        <div className="relative z-10 page-container text-center pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-cyber-pulse" />
              MNIT Jaipur &bull; Cybersecurity Club
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-black mb-6 leading-none tracking-tight"
          >
            <span className="block text-foreground">INFOSEC</span>
            <span
              className="block neon-text-green"
              style={{
                textShadow:
                  "0 0 30px oklch(0.88 0.22 155 / 50%), 0 0 60px oklch(0.88 0.22 155 / 25%)",
              }}
            >
              CLUB
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl sm:text-2xl text-muted-foreground font-light mb-2"
          >
            Securing Tomorrow,{" "}
            <span className="text-electric-blue font-medium">Today</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-muted-foreground text-sm font-mono max-w-md mx-auto mb-10"
          >
            $ Building next-gen security professionals at MNIT Jaipur
            <span className="animate-blink">_</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/auth"
              className="neon-btn-green px-8 py-3.5 rounded-lg flex items-center gap-2"
              data-ocid="home.primary_button"
            >
              <Terminal className="w-4 h-4" />
              Join Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/events"
              className="neon-btn-blue px-8 py-3.5 rounded-lg flex items-center gap-2"
              data-ocid="home.secondary_button"
            >
              <Zap className="w-4 h-4" />
              Explore Events
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground font-mono">
            scroll
          </span>
          <ChevronRight className="w-4 h-4 text-neon-green rotate-90" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-cyber-surface border-y border-white/10">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / About teaser */}
      <section className="section-padding" ref={sectionRef}>
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              What We <span className="neon-text-green">Do</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are a community of passionate security enthusiasts who learn,
              build, and compete together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`glass-card p-6 border ${f.border} group card-hover`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4`}
                >
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-neon-green hover:text-neon-green/80 font-medium text-sm transition-colors"
              data-ocid="home.link"
            >
              Learn more about us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="section-padding bg-cyber-surface/50">
        <div className="page-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-2">
                Featured <span className="neon-text-green">Events</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Join our upcoming workshops and competitions
              </p>
            </div>
            <Link
              to="/events"
              className="hidden sm:flex items-center gap-2 text-neon-green hover:text-neon-green/80 font-medium text-sm transition-colors"
              data-ocid="home.link"
            >
              All events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {displayEvents.length === 0 ? (
            <div
              className="glass-card-green p-16 text-center"
              data-ocid="home.empty_state"
            >
              <Zap className="w-12 h-12 text-neon-green/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Events coming soon. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayEvents.map((event, i) => {
                const id = `event-${i}`;
                return (
                  <EventCard key={id} event={event} eventId={id} index={i} />
                );
              })}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-neon-green font-medium text-sm"
              data-ocid="home.link"
            >
              View all events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="section-padding">
        <div className="page-container">
          <div className="glass-card border border-neon-green/20 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
            <h2 className="section-title">
              Meet the <span className="neon-text-green">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Our talented team of security researchers, developers, and
              enthusiasts driving the club forward.
            </p>
            <Link
              to="/team"
              className="neon-btn-green px-8 py-3.5 rounded-lg inline-flex items-center gap-2"
              data-ocid="home.link"
            >
              <Users className="w-4 h-4" />
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
