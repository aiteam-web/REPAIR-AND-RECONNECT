import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const approachData: Record<string, {
  why: string;
  insight: string;
  howTitle: string;
  howBody: string;
  messages: string[];
}> = {
  message: {
    why: "A simple message can break the silence and show the other person you still care.",
    insight: "Research shows that reaching out—even imperfectly—is almost always received better than we expect.",
    howTitle: "Start small",
    howBody: "You don't need to write an essay. A few honest words can open the door to reconnection.",
    messages: [
      "Hey, I've been thinking about you. Hope you're doing okay.",
      "I know things were tense—just wanted to say I care.",
      "I'm sorry about earlier. Can we talk when you're ready?",
    ],
  },
  acknowledge: {
    why: "Acknowledging what happened shows maturity and helps the other person feel seen.",
    insight: "People don't need you to be perfect—they need to know you noticed.",
    howTitle: "Name it gently",
    howBody: "You can acknowledge without taking all the blame. Just name what happened honestly.",
    messages: [
      "I know things got heated between us. I want you to know I noticed.",
      "I realize I may have come across harshly. That wasn't my intention.",
      "I've been reflecting on what happened, and I wish I'd handled it differently.",
    ],
  },
  pause: {
    why: "Committing to a pause next time gives you space to respond rather than react.",
    insight: "A 6-second pause is often enough to shift from reaction to reflection.",
    howTitle: "Plan your pause",
    howBody: "Think of a simple cue—like taking a breath or stepping away briefly—before responding.",
    messages: [
      "Next time I feel upset, I'll take a deep breath before responding.",
      "I'll try saying 'Give me a moment' instead of reacting immediately.",
      "I'll step away for a few minutes to collect my thoughts.",
    ],
  },
  letgo: {
    why: "Sometimes the kindest thing you can do is release the weight of the situation.",
    insight: "Letting go isn't giving up—it's choosing peace over being right.",
    howTitle: "Release gently",
    howBody: "You don't have to forget. Just decide that this doesn't need to control how you feel anymore.",
    messages: [
      "I'm choosing to let this go—not because it didn't matter, but because my peace matters more.",
      "I release the need to be right about this. I choose connection.",
      "This situation doesn't define our relationship. I'm moving forward.",
    ],
  },
  reflect: {
    why: "Reflection builds self-awareness, which is the foundation of every healthy relationship.",
    insight: "Journaling or even thinking through what happened helps you process emotions without pressure.",
    howTitle: "Look inward",
    howBody: "Ask yourself: What was I really feeling underneath the anger? Often it's hurt, fear, or disappointment.",
    messages: [
      "Underneath my anger, I think I was feeling hurt.",
      "I realize I was reacting out of fear of not being heard.",
      "What I really needed was to feel respected and valued.",
    ],
  },
};

interface Props {
  approach: string;
  person: string;
  onComplete: () => void;
}

const GuidedActionScreen = ({ approach, onComplete }: Props) => {
  const data = approachData[approach] || approachData.message;
  const [revealed, setRevealed] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(0);
  const [editedMsg, setEditedMsg] = useState(data.messages[0]);

  const handleSelectMsg = (i: number) => {
    setSelectedMsg(i);
    setEditedMsg(data.messages[i]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedMsg);
    toast.success("Message copied!");
  };


  return (
    <div className="glass-card p-8 space-y-5">
      {/* Why this helps */}
      <div className="space-y-2">
        <p className="font-body text-sm text-foreground leading-relaxed">{data.why}</p>
        <p className="font-body text-xs text-muted-foreground italic">💡 {data.insight}</p>
      </div>

      {/* Tap to reveal */}
      <motion.button
        onClick={() => setRevealed(true)}
        className="w-full glass-card p-5 text-left space-y-1 transition-all hover:scale-[1.01]"
        whileTap={{ scale: 0.98 }}
      >
        <p className="font-heading text-base font-semibold text-foreground">{data.howTitle}</p>
        <AnimatePresence>
          {!revealed ? (
            <motion.p
              key="tap"
              exit={{ opacity: 0 }}
              className="font-body text-xs text-primary"
            >
              Tap to see how ✨
            </motion.p>
          ) : (
            <motion.p
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="font-body text-sm text-muted-foreground leading-relaxed"
            >
              {data.howBody}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Message options */}
      <div className="space-y-2">
        <p className="font-heading text-sm font-medium text-foreground">Choose a starting point:</p>
        <div className="space-y-2">
          {data.messages.map((msg, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelectMsg(i)}
              className={`w-full glass-card p-3 text-left transition-all hover:scale-[1.01] ${
                selectedMsg === i ? "ring-2 ring-primary shadow-md" : ""
              }`}
            >
              <p className="font-body text-sm text-foreground">{msg}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editable input */}
      <div className="space-y-2">
        <p className="font-heading text-sm font-medium text-foreground">Make it yours:</p>
        <textarea
          value={editedMsg}
          onChange={(e) => setEditedMsg(e.target.value)}
          rows={3}
          className="w-full glass-card p-4 font-body text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 glass-card py-3 font-heading text-sm font-medium text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          📋 Copy Message
        </button>
        <button
          onClick={onComplete}
          className="flex-1 btn-gradient py-3 font-heading text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          I'm Done →
        </button>
      </div>

      {/* Safety line */}
      <p className="font-body text-xs text-muted-foreground text-center italic">
        You don't have to send anything right now. 💛
      </p>
    </div>
  );
};

export default GuidedActionScreen;
