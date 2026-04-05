import { Users } from "lucide-react";
import { motion } from "motion/react";
import LoadingSpinner from "../components/LoadingSpinner";
import TeamCard from "../components/TeamCard";
import { useTeamMembers } from "../hooks/useQueries";

const sampleTeam = [
  {
    name: "Arjun Sharma",
    role: "President",
    bio: "Final year CSE student, CTF enthusiast, and web security researcher. Led the team to 3 consecutive national CTF wins.",
    sortOrder: BigInt(1),
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Priya Mehta",
    role: "Vice President",
    bio: "Specializes in digital forensics and incident response. Bug bounty hunter with 20+ CVEs to her name.",
    sortOrder: BigInt(2),
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Ravi Kumar",
    role: "Technical Lead",
    bio: "Malware analyst and reverse engineer. Maintains the club's internal CTF platform and security lab infrastructure.",
    sortOrder: BigInt(3),
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Sneha Verma",
    role: "Research Lead",
    bio: "Published security researcher focusing on IoT vulnerabilities and embedded systems security.",
    sortOrder: BigInt(4),
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Vikram Singh",
    role: "Events Coordinator",
    bio: "Organizes workshops, guest lectures, and national-level competitions. Network security enthusiast.",
    sortOrder: BigInt(5),
    githubUrl: "https://github.com",
  },
  {
    name: "Ananya Gupta",
    role: "Web Security Lead",
    bio: "OWASP contributor and web application security specialist. Runs the weekly web hacking study group.",
    sortOrder: BigInt(6),
    linkedinUrl: "https://linkedin.com",
  },
];

export default function TeamPage() {
  const { data: teamFromBackend = [], isLoading } = useTeamMembers();
  const displayTeam = teamFromBackend.length > 0 ? teamFromBackend : sampleTeam;
  const sortedTeam = [...displayTeam].sort(
    (a, b) => Number(a.sortOrder) - Number(b.sortOrder),
  );

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
              <Users className="w-3.5 h-3.5" /> Our Team
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Meet the <span className="neon-text-green">Crew</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals who make Infosec Club what it is.
              Security researchers, developers, and enthusiasts — united by one
              goal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          {isLoading ? (
            <LoadingSpinner text="Loading team members..." />
          ) : sortedTeam.length === 0 ? (
            <div
              className="glass-card-green p-16 text-center"
              data-ocid="team.empty_state"
            >
              <Users className="w-12 h-12 text-neon-green/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Team information coming soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTeam.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-cyber-surface/50">
        <div className="page-container">
          <div className="glass-card border border-neon-green/20 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Want to <span className="neon-text-green">Join Us?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              We welcome students from all branches and years. If you're
              passionate about cybersecurity, there's a place for you here.
            </p>
            <a
              href="/contact"
              className="neon-btn-green px-8 py-3.5 rounded-lg inline-flex items-center gap-2"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
