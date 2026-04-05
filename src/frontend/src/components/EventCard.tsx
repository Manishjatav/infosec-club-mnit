import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Tag } from "lucide-react";
import { motion } from "motion/react";
import type { Event } from "../backend.d";
import { formatDate } from "../utils/dateUtils";

interface EventCardProps {
  event: Event;
  eventId: string;
  index?: number;
}

export default function EventCard({
  event,
  eventId,
  index = 0,
}: EventCardProps) {
  const isPast = Number(event.date) < Date.now() * 1_000_000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card-green card-hover group cursor-pointer overflow-hidden"
    >
      <Link to="/events/$eventId" params={{ eventId }} className="block">
        {event.imageUrl && (
          <div className="relative overflow-hidden h-44">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent" />
            <div className="absolute top-3 right-3">
              <span
                className={`cyber-badge ${
                  isPast
                    ? "bg-white/10 text-muted-foreground border border-white/20"
                    : event.registrationOpen
                      ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                      : "bg-electric-blue/20 text-electric-blue border border-electric-blue/40"
                }`}
              >
                {isPast ? "Past" : event.registrationOpen ? "Open" : "Upcoming"}
              </span>
            </div>
          </div>
        )}
        <div className="p-5">
          {!event.imageUrl && (
            <div className="flex justify-between items-start mb-2">
              <span
                className={`cyber-badge ${
                  isPast
                    ? "bg-white/10 text-muted-foreground border border-white/20"
                    : event.registrationOpen
                      ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                      : "bg-electric-blue/20 text-electric-blue border border-electric-blue/40"
                }`}
              >
                {isPast ? "Past" : event.registrationOpen ? "Open" : "Upcoming"}
              </span>
            </div>
          )}
          <h3 className="font-display font-bold text-lg mb-3 text-foreground group-hover:text-neon-green transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-neon-green" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-electric-blue" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="w-3.5 h-3.5 text-accent-purple" />
              <span className="truncate">{event.eventType}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
