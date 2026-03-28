"use client";

import { useState } from "react";

type Step =
  | "context"
  | "stage"
  | "last"
  | "delay"
  | "timing"
  | "intent"
  | "vibe"
  | "result";

const FLOW: Step[] = [
  "context",
  "stage",
  "last",
  "delay",
  "timing",
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
  const [timing, setTiming] = useState<string | null>(null);
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
    setTiming(null);
    setIntent(null);
    setVibe(null);
  }

  // 🔥 ELITE DECISION LOGIC
  function getResult() {

  const doubleText = last === "me" && delay === "short";
  const waitingShort = delay === "short";
  const longWait = delay === "long";
  const theyPulledBack = vibe === "bad";
  const mixedSignal = vibe === "mixed";

  // 🔴 1. EMOTIONAL DRIVERS (dominant)
  if (intent === "anxiety") {
    return {
      label: "DON’T TEXT",
      color: "text-red-400",
      msg: "You’re reacting to uncertainty.",
      sub: "That leads to bad timing.",
    };
  }

  if (intent === "impulse") {
    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "This is just a moment.",
      sub: "Don’t act on it.",
    };
  }

  // 🔴 2. STRUCTURAL WEAK POSITION
  if (doubleText) {
    return {
      label: "DON’T TEXT",
      color: "text-red-400",
      msg: "You’re about to double text.",
      sub: "That lowers your position.",
    };
  }

  // 🔴 3. THEY PULLED BACK
  if (theyPulledBack) {
    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "They pulled back.",
      sub: "Let them re-engage.",
    };
  }

  // 🟡 4. TOO SOON
  if (waitingShort && intent !== "practical") {
    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "It’s too soon.",
      sub: "Give it space.",
    };
  }

  // 🟢 5. CONTEXT OVERRIDE

  // FORMAL
  if (context === "formal") {
    if (intent === "practical") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "You have a valid reason.",
        sub: "Keep it short and clear.",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "There’s no strong reason yet.",
      sub: "Wait for a clearer moment.",
    };
  }

  // PRACTICAL
  if (intent === "practical") {
    return {
      label: "TEXT",
      color: "text-green-400",
      msg: "You have a clear reason.",
      sub: "Keep it simple.",
    };
  }

  // 🟢 6. GENUINE SIGNAL
  if (intent === "genuine" && last === "them" && vibe === "good") {
    return {
      label: "TEXT",
      color: "text-green-400",
      msg: "They opened the door.",
      sub: "You can step in.",
    };
  }

  // 🟢 7. SAFE REOPEN
  if (longWait && intent === "genuine") {
    return {
      label: "TEXT",
      color: "text-green-400",
      msg: "Enough time has passed.",
      sub: "You can restart lightly.",
    };
  }

  // 🟡 8. MIXED SIGNAL
  if (mixedSignal) {
    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "The signal is unclear.",
      sub: "Wait for more clarity.",
    };
  }

  // 🟡 DEFAULT
  return {
    label: "WAIT",
    color: "text-orange-400",
    msg: "There isn’t enough signal.",
    sub: "Give it more time.",
  };
}

  // 🔥 STRONGER PSYCHOLOGICAL EXPLANATIONS
  function getInsight() {

  const doubleText = last === "me" && delay === "short";
  const theyPulledBack = vibe === "bad";
  const mixedSignal = vibe === "mixed";

  if (intent === "anxiety") {
    return {
      why: "You’re trying to remove uncertainty by taking action.",
      action: "Wait until the feeling settles.",
      avoid: "Don’t use texting to calm yourself.",
    };
  }

  if (intent === "impulse") {
    return {
      why: "This urge isn’t based on anything real.",
      action: "Let it pass.",
      avoid: "Don’t act out of boredom.",
    };
  }

  if (doubleText) {
    return {
      why: "They haven’t responded yet, and you’re trying to push.",
      action: "Wait for them to come back.",
      avoid: "Don’t double text.",
    };
  }

  if (theyPulledBack) {
    return {
      why: "Their energy dropped, and you’re trying to fix it.",
      action: "Give them space.",
      avoid: "Don’t chase reduced interest.",
    };
  }

  if (intent === "practical") {
    return {
      why: "There is a clear external reason.",
      action: "Send a short message.",
      avoid: "Don’t overcomplicate it.",
    };
  }

  if (intent === "genuine" && last === "them") {
    return {
      why: "They already invested.",
      action: "You can match that energy.",
      avoid: "Don’t overthink it.",
    };
  }

  if (mixedSignal) {
    return {
      why: "The situation isn’t clear yet.",
      action: "Wait for more signal.",
      avoid: "Don’t force clarity.",
    };
  }

  return {
    why: "There’s no strong reason to act.",
    action: "Do nothing for now.",
    avoid: "Don’t create unnecessary interaction.",
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
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
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
            <div className="flex flex-wrap justify-center gap-3">
              <Button label="Just now" onClick={() => { setDelay("short"); next(); }} />
              <Button label="Hours" onClick={() => { setDelay("hours"); next(); }} />
              <Button label="1+ day" onClick={() => { setDelay("long"); next(); }} />
            </div>
          </>
        )}

        {step === "timing" && (
          <>
            <p className="text-lg font-medium">When are you about to send this?</p>
            <div className="flex justify-center gap-3">
              <Button label="Daytime" onClick={() => { setTiming("day"); next(); }} />
              <Button label="Evening" onClick={() => { setTiming("night"); next(); }} />
            </div>
          </>
        )}

        {step === "intent" && (
          <>
            <p className="text-lg font-medium">Why do you want to text?</p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button label="I feel unsure / want clarity" onClick={() => { setIntent("anxiety"); next(2); }} />
              <Button label="I genuinely want to talk" onClick={() => { setIntent("genuine"); next(); }} />
              <Button label="I have a clear reason" onClick={() => { setIntent("practical"); next(2); }} />
              <Button label="I just feel like texting" onClick={() => { setIntent("impulse"); next(2); }} />
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
          <p className="text-sm text-gray-400 dark:text-gray-500">{result.sub}</p>

          <div className="mt-6 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-left">

            {!showPremium ? (
              <>
                <p className="font-medium">Want to understand why?</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  See the reasoning behind this decision
                </p>

                <button
                  onClick={() => setShowPremium(true)}
                  className="mt-4 px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm"
                >
                  Show explanation
                </button>
              </>
            ) : (
              <div className="space-y-4 text-sm">

                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">What’s happening</p>
                  <p>{getInsight().why}</p>
                </div>

                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">What to do</p>
                  <p>{getInsight().action}</p>
                </div>

                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-xs">Avoid this</p>
                  <p>{getInsight().avoid}</p>
                </div>

              </div>
            )}

          </div>

          <button onClick={reset} className="text-sm underline mt-4">
            Start over
          </button>

        </div>
      )}

    </div>
  );
}