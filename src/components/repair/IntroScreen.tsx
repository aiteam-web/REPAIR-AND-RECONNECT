import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: Props) => (
  <div className="glass-card p-8 text-center space-y-6">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-5xl"
    >
      🤝
    </motion.div>

    <h1 className="font-heading text-2xl font-semibold text-foreground">
      Repair & Reconnect
    </h1>

    <p className="font-body text-muted-foreground leading-relaxed">
      Anger can create distance between us and the people we care about.
      But small, gentle steps can help rebuild that connection.
    </p>

    <div className="glass-card p-4">
      <p className="font-body text-sm text-muted-foreground italic">
        "Repair doesn't mean you were wrong—it means you care enough to try."
      </p>
    </div>

    <p className="font-body text-xs text-muted-foreground">
      Even small efforts can make a difference.
    </p>

    <button onClick={onStart} className="btn-gradient w-full py-3.5 font-heading font-medium text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
      Start →
    </button>
  </div>
);

export default IntroScreen;
