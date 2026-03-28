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
          color: "text-orange-400",
          msg: "Uncertainty is not a reason to act.",
          sub: "Wait and follow up later.",
          text: null,
        };
      }

      if (intent === "impatient" && delay === "short") {
        return {
          label: "WAIT",
          color: "text-orange-400",
          msg: "You’re acting too quickly.",
          sub: "Give them more time.",
          text: null,
        };
      }

      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "A follow-up is appropriate.",
        sub: "Keep it short and professional.",
        text: "Hi, just checking in regarding my previous message.",
      };
    }

    if (timing === "night" && intent !== "practical") {
      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "This is an emotional moment.",
        sub: "Wait until morning.",
        text: null,
      };
    }

    if (intent === "anxious") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "You’re acting from anxiety.",
        sub: "This will pass if you wait.",
        text: null,
      };
    }

    if (last === "me" && delay === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "This is double texting.",
        sub: "Wait. Don’t chase.",
        text: null,
      };
    }

    if (stage === "new" && delay === "long") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "It’s okay to reach out.",
        sub: "Early stage is flexible.",
        text: "Hey, how’s your day going?",
      };
    }

    if (stage === "ongoing" && last === "them" && vibe === "good") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "You’re good to text.",
        sub: "Keep it natural.",
        text: "Hey, I was just thinking about that 😄",
      };
    }

    if (intent === "flirt") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "Go for it.",
        sub: "Keep it playful.",
        text: "So… are you always this fun?",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "Not enough signal yet.",
      sub: "Give it more time.",
      text: null,
    };
  }

  const result = getResult();

  const Button = ({ label, onClick }: any) => (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-all text-sm font-medium"
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-10">

      {step !== "result" && (
        <div className="text-center text-xs text-gray-400 uppercase tracking-widest">
          Step {stepIndex + 1}
        </div>
      )}

      {/* STEPS */}
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
            <p className="text-lg font-medium">Why?</p>

            <div className="flex flex-wrap justify-center gap-3">
              {context === "formal" ? (
                <>
                  <Button label="Follow up" onClick={() => { setIntent("followup"); next(2); }} />
                  <Button label="Practical" onClick={() => { setIntent("practical"); next(2); }} />
                  <Button label="Uncertain" onClick={() => { setIntent("uncertain"); next(2); }} />
                  <Button label="Impatient" onClick={() => { setIntent("impatient"); next(2); }} />
                </>
              ) : (
                <>
                  <Button label="Miss them" onClick={() => { setIntent("miss"); next(); }} />
                  <Button label="Practical" onClick={() => { setIntent("practical"); next(); }} />
                  <Button label="Flirt" onClick={() => { setIntent("flirt"); next(); }} />
                  <Button label="Anxious" onClick={() => { setIntent("anxious"); next(2); }} />
                </>
              )}
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

      {/* RESULT */}
      {step === "result" && (
        <div className="text-center space-y-4">

          <div className={`text-6xl font-extrabold ${result.color}`}>
            {result.label}
          </div>

          <p className="text-lg">{result.msg}</p>
          <p className="text-sm text-gray-400">{result.sub}</p>

          {result.text && (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50 text-left">
              <p className="text-xs text-gray-400 mb-1">Copy this:</p>
              <p className="font-medium">{result.text}</p>
            </div>
          )}

          <button onClick={reset} className="text-sm underline mt-4">
            Start over
          </button>

        </div>
      )}

    </div>
  );
}