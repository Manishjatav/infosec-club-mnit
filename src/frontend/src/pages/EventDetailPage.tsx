import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Loader2,
  MapPin,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useEvents, useRegisterForEvent } from "../hooks/useQueries";
import { formatDate, isUpcoming } from "../utils/dateUtils";

const sampleEvents = [
  {
    title: "National CTF Championship 2026",
    date: BigInt(Date.now() + 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Compete in our annual 48-hour Capture The Flag competition with teams from across India. Cash prizes for top 3 teams. Topics include web exploitation, pwn, crypto, forensics, and reverse engineering.",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
    registrationOpen: true,
    location: "MNIT Jaipur, LHC-101",
    eventType: "CTF Competition",
  },
];

export default function EventDetailPage() {
  const params = useParams({ from: "/events/$eventId" });
  const { data: events = [] } = useEvents();
  const { identity, login } = useInternetIdentity();
  const registerMutation = useRegisterForEvent();

  const eventIndex = Number.parseInt(params.eventId.split("-").pop() || "0");
  const allEvents = events.length > 0 ? events : sampleEvents;
  const event = allEvents[eventIndex] || allEvents[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground">Event not found.</p>
        <Link
          to="/events"
          className="text-neon-green hover:underline mt-4 inline-block"
        >
          &larr; Back to Events
        </Link>
      </div>
    );
  }

  const upcoming = isUpcoming(event.date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please log in to register for events.");
      return;
    }
    if (!form.name || !form.email || !form.branch || !form.year) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await registerMutation.mutateAsync({
        eventId: params.eventId,
        name: form.name,
        email: form.email,
        branch: form.branch,
        year: BigInt(Number.parseInt(form.year)),
      });
      setSubmitted(true);
      toast.success("Registration successful! See you there.");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="pt-20">
      <div className="page-container py-12">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors text-sm mb-8"
          data-ocid="event.link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {event.imageUrl && (
              <div className="overflow-hidden rounded-xl mb-6 h-64">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="cyber-badge bg-neon-green/10 text-neon-green border border-neon-green/40">
                {event.eventType}
              </span>
              <span
                className={`cyber-badge ${
                  upcoming
                    ? "bg-electric-blue/10 text-electric-blue border border-electric-blue/40"
                    : "bg-white/10 text-muted-foreground border border-white/20"
                }`}
              >
                {upcoming ? "Upcoming" : "Past Event"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: Calendar,
                  label: formatDate(event.date),
                  color: "text-neon-green",
                },
                {
                  icon: MapPin,
                  label: event.location,
                  color: "text-electric-blue",
                },
                {
                  icon: Tag,
                  label: event.eventType,
                  color: "text-accent-purple",
                },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <Icon className={`w-5 h-5 ${color} shrink-0`} />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <div className="glass-card-green p-6">
              <h2 className="font-semibold mb-4 neon-text-green">
                About this Event
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>

          {upcoming && event.registrationOpen && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card-green p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg mb-6">
                  <span className="neon-text-green">Register</span> for this
                  Event
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                    data-ocid="event.success_state"
                  >
                    <CheckCircle className="w-12 h-12 text-neon-green mx-auto mb-4" />
                    <p className="text-neon-green font-semibold mb-2">
                      You're registered!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      We'll send details to your email.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="event.panel"
                  >
                    <div>
                      <label
                        htmlFor="reg-name"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Full Name
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        className="cyber-input"
                        placeholder="Arjun Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        data-ocid="event.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reg-email"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Email
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        className="cyber-input"
                        placeholder="2021ucs1234@mnit.ac.in"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        data-ocid="event.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="reg-branch"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Branch
                      </label>
                      <select
                        id="reg-branch"
                        className="cyber-input"
                        value={form.branch}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, branch: e.target.value }))
                        }
                        required
                        data-ocid="event.select"
                      >
                        <option value="">Select Branch</option>
                        {[
                          "Computer Science",
                          "Electronics",
                          "Electrical",
                          "Mechanical",
                          "Civil",
                          "Chemical",
                          "Metallurgy",
                          "Other",
                        ].map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="reg-year"
                        className="text-sm text-muted-foreground mb-1.5 block"
                      >
                        Year
                      </label>
                      <select
                        id="reg-year"
                        className="cyber-input"
                        value={form.year}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, year: e.target.value }))
                        }
                        required
                        data-ocid="event.select"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                        <option value="5">5th Year</option>
                      </select>
                    </div>

                    {!identity && (
                      <div className="glass-card p-3 border border-electric-blue/30 text-sm text-electric-blue">
                        <button
                          type="button"
                          onClick={login}
                          className="underline font-medium"
                        >
                          Log in
                        </button>{" "}
                        to complete your registration.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="w-full neon-btn-green py-3 rounded-lg flex items-center justify-center gap-2"
                      data-ocid="event.submit_button"
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Registering...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {upcoming && !event.registrationOpen && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass-card border border-electric-blue/20 p-6">
                <p className="text-electric-blue font-semibold mb-2">
                  Registration Opening Soon
                </p>
                <p className="text-muted-foreground text-sm">
                  Registration for this event will open shortly. Stay tuned!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
