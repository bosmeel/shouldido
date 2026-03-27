"use client";

import { useState } from "react";

type Step = "context" | "last" | "time" | "intent" | "vibe" | "result";

export default function DecisionTool() {
  const [step, setStep] = useState<Step>("context");

  const [context, setContext] = useState<string | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);

  function reset() {
    setStep("context");
    setContext(null);
    setLast(null);
    setTime(null);
    setIntent(null);
    setVibe(null);
  }

  function getResult() {
    // 🔵 FORMAL FLOW
    if (context === "formal") {
      if (intent === "anxious") {
        return {
          label: "WAIT",
          color: "text-orange-500",
          msg: "Don’t act on stress.",
          sub: "Wait and follow up calmly later.",
          text: null,
        };
      }

      if (time === "short") {
        return {
          label: "WAIT",
          color: "text-orange-500",
          msg: "Too soon to follow up.",
          sub: "Give them more time to respond.",
          text: null,
        };
      }

      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "A follow-up is appropriate.",
        sub: "Keep it short and polite.",
        text: "Hi, just checking in regarding my previous message.",
      };
    }

    // 🔴 RELATIONAL FLOW

    if (intent === "anxious") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "You’re acting from anxiety.",
        sub: "Give it time. This feeling will pass.",
        text: null,
      };
    }

    if (time === "night") {
      return {
        label: "WAIT",
        color: "text-orange-500",
        msg: "Late-night texting isn’t a good move.",
        sub: "Revisit this in the morning.",
        text: null,
      };
    }

    if (last === "me" && time === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "This is double texting.",
        sub: "Wait. Don’t lower your position.",
        text: null,
      };
    }

    if (last === "them" && vibe === "good") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "You’re good to text.",
        sub: "Keep it light and natural.",
        text: "Hey, I was just thinking about that 😄",
      };
    }

    if (intent === "flirt") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "Go for it.",
        sub: "Keep it playful.",
        text: "So… are you always this interesting?",
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
    <div className="space-y-6">

      {/* CONTEXT */}
      {step === "context" && (
        <div className="text-center space-y-4">
          <p className="font-medium">What type of situation is this?</p>
          <div className="flex justify-center gap-3">
            <Button label="Personal / Dating" onClick={() => { setContext("relational"); setStep("last"); }} />
            <Button label="Formal / Work" onClick={() => { setContext("formal"); setStep("time"); }} />
          </div>
        </div>
      )}

      {/* LAST */}
      {step === "last" && (
        <div className="text-center space-y-4">
          <p className="font-medium">Who texted last?</p>
          <div className="flex justify-center gap-3">
            <Button label="I did" onClick={() => { setLast("me"); setStep("time"); }} />
            <Button label="They did" onClick={() => { setLast("them"); setStep("time"); }} />
          </div>
        </div>
      )}

      {/* TIME */}
      {step === "time" && (
        <div className="text-center space-y-4">
          <p className="font-medium">How long ago?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button label="Just now" onClick={() => { setTime("short"); setStep("intent"); }} />
            <Button label="Few hours" onClick={() => { setTime("hours"); setStep("intent"); }} />
            <Button label="1+ day" onClick={() => { setTime("long"); setStep("intent"); }} />
            <Button label="Late night" onClick={() => { setTime("night"); setStep("intent"); }} />
          </div>
        </div>
      )}

      {/* INTENT */}
      {step === "intent" && (
        <div className="text-center space-y-4">
          <p className="font-medium">Why do you want to text?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button label="I miss them" onClick={() => { setIntent("miss"); setStep(context==="formal" ? "result" : "vibe"); }} />
            <Button label="Practical reason" onClick={() => { setIntent("practical"); setStep(context==="formal" ? "result" : "vibe"); }} />
            <Button label="Flirting" onClick={() => { setIntent("flirt"); setStep("vibe"); }} />
            <Button label="I feel anxious" onClick={() => { setIntent("anxious"); setStep("result"); }} />
          </div>
        </div>
      )}

      {/* VIBE */}
      {step === "vibe" && context === "relational" && (
        <div className="text-center space-y-4">
          <p className="font-medium">How was the vibe?</p>
          <div className="flex justify-center gap-3">
            <Button label="Good" onClick={() => { setVibe("good"); setStep("result"); }} />
            <Button label="Mixed" onClick={() => { setVibe("mixed"); setStep("result"); }} />
            <Button label="Bad" onClick={() => { setVibe("bad"); setStep("result"); }} />
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && (
        <div className="text-center space-y-4 mt-6">

          <div className={`text-5xl font-bold ${result.color}`}>
            {result.label}
          </div>

          <p className="text-lg">{result.msg}</p>
          <p className="text-sm text-gray-500">{result.sub}</p>

          {result.text && (
            <div className="mt-4 border rounded p-4 text-left">
              <p className="text-sm text-gray-500 mb-1">Example text:</p>
              <p className="font-medium">{result.text}</p>
            </div>
          )}

          <button onClick={reset} className="underline text-sm mt-4">
            Start over
          </button>

        </div>
      )}

    </div>
  );
}