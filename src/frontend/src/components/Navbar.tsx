import { Link, useLocation } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Shield, Terminal, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/team", label: "Team" },
  { path: "/events", label: "Events" },
  { path: "/blog", label: "Blog" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const { identity, clear, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();

  // Close mobile menu on route change without an exhaustive-deps violation
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname;
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0a0f]/90 border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="page-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-neon-green/10 border border-neon-green/30 group-hover:border-neon-green/80 transition-all duration-300 group-hover:shadow-neon-green">
              <Shield className="w-5 h-5 text-neon-green" />
            </div>
            <span className="font-display font-bold text-lg">
              <span className="neon-text-green">Infosec</span>
              <span className="text-foreground"> Club</span>
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground font-mono">
              MNIT
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-neon-green bg-neon-green/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === "/admin"
                    ? "text-electric-blue bg-electric-blue/10"
                    : "text-muted-foreground hover:text-electric-blue hover:bg-electric-blue/5"
                }`}
                data-ocid="nav.link"
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            {identity ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neon-green/10 border border-neon-green/20">
                  <User className="w-3 h-3 text-neon-green" />
                  <span className="text-xs font-mono text-neon-green">
                    {identity.getPrincipal().toString().slice(0, 8)}...
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clear}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  data-ocid="nav.button"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg neon-btn-green text-xs"
                data-ocid="nav.link"
              >
                <Terminal className="w-3.5 h-3.5" />
                {isLoggingIn ? "Connecting..." : "Login"}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/10 backdrop-blur-xl bg-[#0a0a0f]/95"
          >
            <div className="page-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-neon-green bg-neon-green/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-electric-blue hover:bg-electric-blue/5 transition-all"
                  data-ocid="nav.link"
                >
                  Admin Panel
                </Link>
              )}
              <div className="mt-2 pt-2 border-t border-white/10">
                {identity ? (
                  <button
                    type="button"
                    onClick={clear}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                    data-ocid="nav.button"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium neon-btn-green"
                    data-ocid="nav.link"
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
