"use client";

import { useState } from "react";

type Step =
  | "context"
  | "stage"
  | "last"
  | "delay"
  | "intent"
  | "vibe"
  | "result";

const FLOW: Step[] = [
  "context",
  "stage",
  "last",
  "delay",
  "intent",
  "vibe",
  "result",
];

export default function DecisionTool() {
  const [stepIndex, setStepIndex] = useState(0);
  const [showPremium, setShowPremium] = useState(false);

  const [context, setContext] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const [delay, setDelay] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);

  const step = FLOW[stepIndex];

  function next(stepJump = 1) {
    setStepIndex((i) => i + stepJump);
  }

  function reset() {
    setStepIndex(0);
    setShowPremium(false);
    setContext(null);
    setStage(null);
    setLast(null);
    setDelay(null);
    setIntent(null);
    setVibe(null);
  }

  // 🔥 SIMPELE + STERKE BESLISLOGICA
  function getResult() {

    // 1. EMOTIE (dominant)
    if (intent === "anxiety") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "You’re reacting to uncertainty.",
        sub: "Don’t act just to feel better.",
      };
    }

    if (intent === "impulse") {
      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "This is just a moment.",
        sub: "Let it pass.",
      };
    }

    // 2. STRUCTUUR
    if (last === "me" && delay === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "You’re about to double text.",
        sub: "Wait for them.",
      };
    }

    if (vibe === "bad") {
      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "They pulled back.",
        sub: "Give them space.",
      };
    }

    if (delay === "short" && intent !== "practical") {
      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "It’s too soon.",
        sub: "Give it time.",
      };
    }

    // 3. CONTEXT
    if (context === "formal") {
      if (intent === "practical") {
        return {
          label: "TEXT",
          color: "text-green-400",
          msg: "You have a reason.",
          sub: "Keep it short.",
        };
      }

      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "No strong reason yet.",
        sub: "Wait a bit.",
      };
    }

    if (intent === "practical") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "You have a clear reason.",
        sub: "Keep it simple.",
      };
    }

    if (intent === "genuine") {
      if (last === "them" && vibe === "good") {
        return {
          label: "TEXT",
          color: "text-green-400",
          msg: "There’s enough signal.",
          sub: "Stay natural.",
        };
      }

      if (delay === "long") {
        return {
          label: "TEXT",
          color: "text-green-400",
          msg: "Enough time has passed.",
          sub: "You can restart.",
        };
      }

      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "Not enough signal yet.",
        sub: "Let them invest.",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "Not enough clarity.",
      sub: "Give it time.",
    };
  }

  // 🔥 SIMPELE EXPLANATION
  function getInsight() {

    if (intent === "anxiety") {
      return {
        why: "You’re trying to fix uncertainty.",
        action: "Wait until you feel calm.",
        avoid: "Don’t text to feel better.",
      };
    }

    if (intent === "impulse") {
      return {
        why: "This is just a passing urge.",
        action: "Let it pass.",
        avoid: "Don’t act on impulse.",
      };
    }

    if (last === "me" && delay === "short") {
      return {
        why: "They haven’t replied yet.",
        action: "Wait for them.",
        avoid: "Don’t double text.",
      };
    }

    if (vibe === "bad") {
      return {
        why: "Their energy dropped.",
        action: "Give them space.",
        avoid: "Don’t chase.",
      };
    }

    if (intent === "practical") {
      return {
        why: "You have a reason.",
        action: "Send a short message.",
        avoid: "Don’t overdo it.",
      };
    }

    if (intent === "genuine") {
      return {
        why: "Connection needs balance.",
        action: "Wait for signal.",
        avoid: "Don’t chase.",
      };
    }

    return {
      why: "There’s no clear reason.",
      action: "Do nothing.",
      avoid: "Don’t force it.",
    };
  }

  const result = getResult();

  const Button = ({
    label,
    onClick,
  }: {
    label: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-medium"
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-10 text-gray-800 dark:text-gray-100">

      {step !== "result" && (
        <div className="text-center text-xs text-gray-400 uppercase tracking-widest">
          Step {stepIndex + 1}
        </div>
      )}

      <div className="text-center space-y-6">

        {step === "context" && (
          <>
            <p className="text-lg font-medium">What’s the situation?</p>
            <div className="flex justify-center gap-3">
              <Button label="Personal / Dating" onClick={() => { setContext("relational"); next(); }} />
              <Button label="Formal / Work" onClick={() => { setContext("formal"); next(2); }} />
            </div>
          </>
        )}

        {step === "stage" && (
          <>
            <p className="text-lg font-medium">What stage are you in?</p>
            <div className="flex justify-center gap-3">
              <Button label="New" onClick={() => { setStage("new"); next(); }} />
              <Button label="Ongoing" onClick={() => { setStage("ongoing"); next(); }} />
            </div>
          </>
        )}

        {step === "last" && (
          <>
            <p className="text-lg font-medium">Who texted last?</p>
            <div className="flex justify-center gap-3">
              <Button label="I did" onClick={() => { setLast("me"); next(); }} />
              <Button label="They did" onClick={() => { setLast("them"); next(); }} />
            </div>
          </>
        )}

        {step === "delay" && (
          <>
            <p className="text-lg font-medium">How long ago?</p>
            <div className="flex gap-3 justify-center">
              <Button label="Just now" onClick={() => { setDelay("short"); next(); }} />
              <Button label="Hours" onClick={() => { setDelay("hours"); next(); }} />
              <Button label="1+ day" onClick={() => { setDelay("long"); next(); }} />
            </div>
          </>
        )}

        {step === "intent" && (
          <>
            <p className="text-lg font-medium">Why do you want to text?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button label="I feel unsure" onClick={() => { setIntent("anxiety"); next(2); }} />
              <Button label="I want to talk" onClick={() => { setIntent("genuine"); next(); }} />
              <Button label="I have a reason" onClick={() => { setIntent("practical"); next(2); }} />
              <Button label="Just because" onClick={() => { setIntent("impulse"); next(2); }} />
            </div>
          </>
        )}

        {step === "vibe" && (
          <>
            <p className="text-lg font-medium">Vibe?</p>
            <div className="flex justify-center gap-3">
              <Button label="Good" onClick={() => { setVibe("good"); next(); }} />
              <Button label="Mixed" onClick={() => { setVibe("mixed"); next(); }} />
              <Button label="Bad" onClick={() => { setVibe("bad"); next(); }} />
            </div>
          </>
        )}

      </div>

      {step === "result" && (
        <div className="text-center space-y-5 mt-6">

          <div className={`text-6xl font-extrabold ${result.color}`}>
            {result.label}
          </div>

          <p className="text-lg">{result.msg}</p>
          <p className="text-sm text-gray-400">{result.sub}</p>

          <div className="mt-6 p-5 rounded-2xl border bg-white dark:bg-gray-900">

            {!showPremium ? (
              <button
                onClick={() => setShowPremium(true)}
                className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
              >
                Show why
              </button>
            ) : (
              <div className="space-y-3 text-sm text-left">
                <p>{getInsight().why}</p>
                <p>{getInsight().action}</p>
                <p className="text-gray-400">{getInsight().avoid}</p>
              </div>
            )}

          </div>

          <button onClick={reset} className="text-sm underline">
            Start over
          </button>

        </div>
      )}

    </div>
  );
}