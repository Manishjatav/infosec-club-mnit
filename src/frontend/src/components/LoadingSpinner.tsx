import { Shield } from "lucide-react";
import { motion } from "motion/react";

export default function LoadingSpinner({
  text = "Loading...",
}: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="w-12 h-12 rounded-full border-2 border-neon-green/20 border-t-neon-green"
      />
      <p className="text-muted-foreground font-mono text-sm">{text}</p>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-xl flex items-center justify-center bg-neon-green/10 border border-neon-green/30"
      >
        <Shield className="w-8 h-8 text-neon-green" />
      </motion.div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm text-muted-foreground">
          Initializing system
        </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="text-neon-green font-mono"
        >
          _
        </motion.span>
      </div>
    </div>
  );
}
