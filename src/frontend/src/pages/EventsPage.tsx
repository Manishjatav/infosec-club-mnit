import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEvents } from "../hooks/useQueries";
import { isUpcoming } from "../utils/dateUtils";

const sampleEvents = [
  {
    title: "National CTF Championship 2026",
    date: BigInt(Date.now() + 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Compete in our annual 48-hour Capture The Flag competition with teams from across India. Cash prizes for top 3 teams.",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
    registrationOpen: true,
    location: "MNIT Jaipur, LHC-101",
    eventType: "CTF Competition",
  },
  {
    title: "Web Security Bootcamp",
    date: BigInt(Date.now() + 14 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Three-day intensive bootcamp covering OWASP Top 10, Burp Suite, and real-world exploitation techniques.",
    registrationOpen: true,
    location: "CS Department, Lab 3",
    eventType: "Workshop",
  },
  {
    title: "Reverse Engineering 101",
    date: BigInt(Date.now() + 21 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Introduction to binary analysis, assembly language, and using tools like Ghidra and x64dbg.",
    registrationOpen: false,
    location: "Online + CS Lab 2",
    eventType: "Workshop",
  },
  {
    title: "OWASP Bug Hunt 2025",
    date: BigInt(Date.now() - 60 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Past edition of our annual bug hunting competition. Our team placed 2nd nationally.",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
    registrationOpen: false,
    location: "MNIT Jaipur",
    eventType: "CTF Competition",
  },
  {
    title: "Intro to Network Forensics",
    date: BigInt(Date.now() - 30 * 24 * 3600 * 1000) * BigInt(1_000_000),
    description:
      "Hands-on session on Wireshark, packet analysis, and identifying network intrusions.",
    registrationOpen: false,
    location: "CS Department, LT-2",
    eventType: "Workshop",
  },
];

export default function EventsPage() {
  const { data: eventsFromBackend = [], isLoading } = useEvents();
  const [typeFilter, setTypeFilter] = useState("All");

  const events =
    eventsFromBackend.length > 0 ? eventsFromBackend : sampleEvents;
  const upcoming = events.filter((e) => isUpcoming(e.date));
  const past = events.filter((e) => !isUpcoming(e.date));
  const eventTypes = [
    "All",
    ...Array.from(new Set(events.map((e) => e.eventType))),
  ];
  const filterByType = (list: typeof events) =>
    typeFilter === "All"
      ? list
      : list.filter((e) => e.eventType === typeFilter);

  return (
    <div className="pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Zap className="w-3.5 h-3.5" /> Events
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Club <span className="neon-text-green">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Workshops, competitions, seminars, and more. Stay sharp, stay
              updated.
            </p>
          </motion.div>

          <div
            className="flex flex-wrap items-center gap-2 justify-center mb-8"
            data-ocid="events.tab"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            {eventTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  typeFilter === type
                    ? "bg-neon-green/20 text-neon-green border border-neon-green/50"
                    : "bg-white/5 text-muted-foreground border border-white/10 hover:border-neon-green/30"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {isLoading ? (
            <LoadingSpinner text="Loading events..." />
          ) : (
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-8 bg-cyber-surface border border-white/10">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:text-neon-green"
                  data-ocid="events.tab"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming ({filterByType(upcoming).length})
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:text-electric-blue"
                  data-ocid="events.tab"
                >
                  Past ({filterByType(past).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {filterByType(upcoming).length === 0 ? (
                  <div
                    className="glass-card-green p-16 text-center"
                    data-ocid="events.empty_state"
                  >
                    <Zap className="w-12 h-12 text-neon-green/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No upcoming events. Check back soon!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterByType(upcoming).map((event, i) => (
                      <EventCard
                        key={event.title}
                        event={event}
                        eventId={`upcoming-${i}`}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past">
                {filterByType(past).length === 0 ? (
                  <div
                    className="glass-card-green p-16 text-center"
                    data-ocid="events.empty_state"
                  >
                    <p className="text-muted-foreground">No past events yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterByType(past).map((event, i) => (
                      <EventCard
                        key={event.title}
                        event={event}
                        eventId={`past-${i}`}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
}
