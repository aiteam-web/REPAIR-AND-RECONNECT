import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/repair/IntroScreen";
import ChoosePersonScreen from "@/components/repair/ChoosePersonScreen";
import ChooseApproachScreen from "@/components/repair/ChooseApproachScreen";
import GuidedActionScreen from "@/components/repair/GuidedActionScreen";
import CompletionScreen from "@/components/repair/CompletionScreen";

const pageVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Index = () => {
  const [step, setStep] = useState(0);
  const [person, setPerson] = useState("");
  const [approach, setApproach] = useState("");

  const next = () => setStep((s) => s + 1);
  const reset = () => {
    setStep(1);
    setPerson("");
    setApproach("");
  };
  const done = () => {
    setStep(0);
    setPerson("");
    setApproach("");
  };

  return (
    <div className="gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {step === 0 && <IntroScreen onStart={next} onBack={() => window.history.back()} />}
            {step === 1 && (
              <ChoosePersonScreen
                selected={person}
                onSelect={setPerson}
                onContinue={next}
              />
            )}
            {step === 2 && (
              <ChooseApproachScreen
                person={person}
                selected={approach}
                onSelect={setApproach}
                onContinue={next}
              />
            )}
            {step === 3 && (
              <GuidedActionScreen approach={approach} person={person} onComplete={next} />
            )}
            {step === 4 && (
              <CompletionScreen onTryAnother={reset} onDone={done} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
