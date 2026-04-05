import { Link } from "@tanstack/react-router";
import {
  Github,
  Heart,
  Instagram,
  Linkedin,
  Shield,
  Twitter,
} from "lucide-react";

const footerLinks = {
  Pages: [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/team", label: "Team" },
    { path: "/events", label: "Events" },
  ],
  Resources: [
    { path: "/blog", label: "Blog" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
    { path: "/auth", label: "Login" },
  ],
};

const socialLinks = [
  { Icon: Github, href: "https://github.com/infosec-mnit", label: "GitHub" },
  { Icon: Twitter, href: "https://twitter.com/infosec_mnit", label: "Twitter" },
  {
    Icon: Instagram,
    href: "https://instagram.com/infosec_mnit",
    label: "Instagram",
  },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/company/infosec-mnit",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-cyber-surface mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neon-green/10 border border-neon-green/30">
                <Shield className="w-5 h-5 text-neon-green" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="neon-text-green">Infosec</span>
                <span className="text-foreground"> Club</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The cybersecurity club of MNIT Jaipur. Empowering students with
              the knowledge and skills to navigate the digital frontier
              securely.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-muted-foreground hover:text-neon-green hover:border-neon-green/40 hover:bg-neon-green/10 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-neon-green transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {currentYear} Infosec Club, MNIT Jaipur. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with <Heart className="w-3 h-3 inline text-red-400" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
