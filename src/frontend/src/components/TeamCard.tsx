import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import type { TeamMember } from "../backend.d";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export default function TeamCard({ member, index = 0 }: TeamCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card-green card-hover group text-center p-6"
    >
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neon-green/30 group-hover:border-neon-green/80 transition-all duration-300 mx-auto">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neon-green/20 to-electric-blue/20 flex items-center justify-center">
              <span className="text-xl font-bold text-neon-green font-mono">
                {initials}
              </span>
            </div>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-green/20 border border-neon-green/60 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-cyber-pulse" />
        </div>
      </div>

      <h3 className="font-display font-bold text-base mb-1 text-foreground">
        {member.name}
      </h3>
      <p className="text-neon-green text-sm font-mono mb-3">{member.role}</p>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
        {member.bio}
      </p>

      <div className="flex items-center justify-center gap-3">
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-muted-foreground hover:text-neon-green hover:border-neon-green/40 transition-all duration-200"
            aria-label={`${member.name} GitHub`}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-muted-foreground hover:text-electric-blue hover:border-electric-blue/40 transition-all duration-200"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
