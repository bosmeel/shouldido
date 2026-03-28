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
    setContext(null);
    setStage(null);
    setLast(null);
    setDelay(null);
    setTiming(null);
    setIntent(null);
    setVibe(null);
  }

  function getResult() {
    if (context === "formal") {
      if (intent === "uncertain") {
        return {
          label: "WAIT",
          color: "text-orange-500",
          msg: "Uncertainty is not a reason to act.",
          sub: "Wait and follow up later.",
          text: null,
        };
      }

      if (intent === "impatient" && delay === "short") {
        return {
          label: "WAIT",
          color: "text-orange-500",
          msg: "You’re acting too quickly.",
          sub: "Give them more time.",
          text: null,
        };
      }

      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "A follow-up is appropriate.",
        sub: "Keep it short and professional.",
        text: "Hi, just checking in regarding my previous message.",
      };
    }

    if (timing === "night" && intent !== "practical") {
      return {
        label: "WAIT",
        color: "text-orange-500",
        msg: "This is an emotional moment.",
        sub: "Wait until morning.",
        text: null,
      };
    }

    if (intent === "anxious") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "You’re acting from anxiety.",
        sub: "This will pass if you wait.",
        text: null,
      };
    }

    if (last === "me" && delay === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "This is double texting.",
        sub: "Wait. Don’t chase.",
        text: null,
      };
    }

    if (stage === "new" && delay === "long") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "It’s okay to reach out.",
        sub: "Early stage is flexible.",
        text: "Hey, how’s your day going?",
      };
    }

    if (stage === "ongoing" && last === "them" && vibe === "good") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "You’re good to text.",
        sub: "Keep it natural.",
        text: "Hey, I was just thinking about that 😄",
      };
    }

    if (intent === "flirt") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "Go for it.",
        sub: "Keep it playful.",
        text: "So… are you always this fun?",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-500",
      msg: "Not enough signal yet.",
      sub: "Give it more time.",
      text: null,
    };
  }

  const result = getResult();

  const Button = ({ label, onClick }: any) => (
    <button
      onClick={onClick}
      className="border rounded px-4 py-2 hover:bg-black hover:text-white"
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8">

      {step !== "result" && (
        <div className="text-center text-sm text-gray-400">
          Step {stepIndex + 1} of 7
        </div>
      )}

      {/* CONTEXT */}
      {step === "context" && (
        <div className="text-center space-y-4">
          <p>What type of situation is this?</p>
          <div className="flex justify-center gap-3">
            <Button
              label="Personal / Dating"
              onClick={() => {
                setContext("relational");
                next(); // normale flow
              }}
            />
            <Button
              label="Formal / Work"
              onClick={() => {
                setContext("formal");
                next(2); // 🔥 skip stage direct
              }}
            />
          </div>
        </div>
      )}

      {/* STAGE */}
      {step === "stage" && (
        <div className="text-center space-y-4">
          <p>What stage are you in?</p>
          <Button label="New / Early" onClick={() => { setStage("new"); next(); }} />
          <Button label="Ongoing" onClick={() => { setStage("ongoing"); next(); }} />
        </div>
      )}

      {/* LAST */}
      {step === "last" && (
        <div className="text-center space-y-4">
          <p>Who texted last?</p>
          <Button label="I did" onClick={() => { setLast("me"); next(); }} />
          <Button label="They did" onClick={() => { setLast("them"); next(); }} />
        </div>
      )}

      {/* DELAY */}
      {step === "delay" && (
        <div className="text-center space-y-4">
          <p>How long since the last message?</p>
          <Button label="Just now" onClick={() => { setDelay("short"); next(); }} />
          <Button label="Few hours" onClick={() => { setDelay("hours"); next(); }} />
          <Button label="1+ day" onClick={() => { setDelay("long"); next(); }} />
        </div>
      )}

      {/* TIMING */}
      {step === "timing" && (
        <div className="text-center space-y-4">
          <p>When are you about to send this?</p>
          <Button label="Morning / Daytime" onClick={() => { setTiming("day"); next(); }} />
          <Button label="Evening / Night" onClick={() => { setTiming("night"); next(); }} />
        </div>
      )}

      {/* INTENT */}
      {step === "intent" && (
        <div className="text-center space-y-4">
          <p>Why do you want to text?</p>

          {context === "formal" ? (
            <>
              <Button label="Follow up / status" onClick={() => { setIntent("followup"); next(); }} />
              <Button label="Practical reason" onClick={() => { setIntent("practical"); next(); }} />
              <Button label="I feel uncertain" onClick={() => { setIntent("uncertain"); next(); }} />
              <Button label="I feel impatient" onClick={() => { setIntent("impatient"); next(); }} />
            </>
          ) : (
            <>
              <Button label="I miss them" onClick={() => { setIntent("miss"); next(); }} />
              <Button label="Practical reason" onClick={() => { setIntent("practical"); next(); }} />
              <Button label="Flirting" onClick={() => { setIntent("flirt"); next(); }} />
              <Button label="I feel anxious" onClick={() => { setIntent("anxious"); next(); }} />
            </>
          )}
        </div>
      )}

      {/* VIBE */}
      {step === "vibe" && context === "relational" && (
        <div className="text-center space-y-4">
          <p>How was the vibe?</p>
          <Button label="Good" onClick={() => { setVibe("good"); next(); }} />
          <Button label="Mixed" onClick={() => { setVibe("mixed"); next(); }} />
          <Button label="Bad" onClick={() => { setVibe("bad"); next(); }} />
        </div>
      )}

      {/* RESULT */}
      {step === "result" && (
        <div className="text-center space-y-4 mt-6">
          <div className={`text-5xl font-bold ${result.color}`}>
            {result.label}
          </div>
          <p>{result.msg}</p>
          <p className="text-sm text-gray-500">{result.sub}</p>

          {result.text && (
            <div className="border p-4 mt-4 text-left">
              <p className="text-sm text-gray-500">Example text:</p>
              <p>{result.text}</p>
            </div>
          )}

          <button onClick={reset} className="underline mt-4 text-sm">
            Start over
          </button>
        </div>
      )}

    </div>
  );
}