import { useNavigate } from "@tanstack/react-router";
import { LogIn, LogOut, Shield, Terminal, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AuthPage() {
  const { login, clear, identity, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      const timer = setTimeout(() => navigate({ to: "/" }), 1500);
      return () => clearTimeout(timer);
    }
  }, [identity, navigate]);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-card-green p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
              <Shield className="w-8 h-8 text-neon-green" />
            </div>
            <h1 className="font-display font-bold text-2xl mb-1">
              <span className="neon-text-green">Infosec</span> Club
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              MNIT Jaipur
            </p>
          </div>

          {identity ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
              data-ocid="auth.success_state"
            >
              <div className="w-12 h-12 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-neon-green" />
              </div>
              <p className="text-neon-green font-semibold mb-1">
                Authenticated!
              </p>
              <p className="text-muted-foreground text-sm font-mono mb-2">
                {identity.getPrincipal().toString().slice(0, 16)}...
              </p>
              <p className="text-muted-foreground text-xs">
                Redirecting to home...
              </p>

              <button
                type="button"
                onClick={clear}
                className="mt-6 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors mx-auto"
                data-ocid="auth.button"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </motion.div>
          ) : (
            <div data-ocid="auth.panel">
              <div className="mb-6">
                <h2 className="font-display font-bold text-lg mb-2">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground text-sm">
                  Sign in with Internet Identity to access member features,
                  register for events, and more.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="w-full neon-btn-green py-3.5 rounded-lg flex items-center justify-center gap-2"
                  data-ocid="auth.primary_button"
                >
                  {isLoggingIn ? (
                    <>
                      <Terminal className="w-4 h-4 animate-cyber-pulse" />{" "}
                      Connecting...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" /> Login with Internet Identity
                    </>
                  )}
                </button>
              </div>

              {isLoginError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                  data-ocid="auth.error_state"
                >
                  {loginError?.message || "Login failed. Please try again."}
                </motion.div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Internet Identity is a secure, anonymous authentication system
                  for the Internet Computer. No username or password required.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-green/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-green/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-green/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-green/50 rounded-br-lg" />
      </motion.div>
    </div>
  );
}
