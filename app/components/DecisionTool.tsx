"use client";

import { useState } from "react";

type Step =
  | "last"
  | "time"
  | "intent"
  | "vibe"
  | "result";

export default function DecisionTool() {
  const [step, setStep] = useState<Step>("last");

  const [last, setLast] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);

  function reset() {
    setStep("last");
    setLast(null);
    setTime(null);
    setIntent(null);
    setVibe(null);
  }

  function getResult() {
    // harde regels eerst
    if (intent === "anxious") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "You’re acting from anxiety.",
        sub: "Give it time. This feeling will pass.",
      };
    }

    if (time === "night") {
      return {
        label: "WAIT",
        color: "text-orange-500",
        msg: "Late-night texting isn’t a good move.",
        sub: "Revisit this in the morning.",
      };
    }

    if (last === "me" && time === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "This is double texting.",
        sub: "Wait. Don’t lower your position.",
      };
    }

    if (last === "them" && vibe === "good") {
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "You’re good to text.",
        sub: "Keep it light and natural.",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-500",
      msg: "Not enough signal yet.",
      sub: "Give it a bit more time.",
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

      {/* STEP 1 */}
      {step === "last" && (
        <div className="space-y-4 text-center">
          <p className="font-medium">Who texted last?</p>
          <div className="flex justify-center gap-3">
            <Button label="I did" onClick={() => { setLast("me"); setStep("time"); }} />
            <Button label="They did" onClick={() => { setLast("them"); setStep("time"); }} />
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === "time" && (
        <div className="space-y-4 text-center">
          <p className="font-medium">How long ago?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button label="Just now" onClick={() => { setTime("short"); setStep("intent"); }} />
            <Button label="Few hours" onClick={() => { setTime("hours"); setStep("intent"); }} />
            <Button label="1+ day" onClick={() => { setTime("long"); setStep("intent"); }} />
            <Button label="Late night" onClick={() => { setTime("night"); setStep("intent"); }} />
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === "intent" && (
        <div className="space-y-4 text-center">
          <p className="font-medium">Why do you want to text?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button label="I miss them" onClick={() => { setIntent("miss"); setStep("vibe"); }} />
            <Button label="Practical reason" onClick={() => { setIntent("practical"); setStep("vibe"); }} />
            <Button label="Flirting" onClick={() => { setIntent("flirt"); setStep("vibe"); }} />
            <Button label="I feel anxious" onClick={() => { setIntent("anxious"); setStep("result"); }} />
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === "vibe" && (
        <div className="space-y-4 text-center">
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
        <div className="text-center space-y-3 mt-6">
          <div className={`text-5xl font-bold ${result.color}`}>
            {result.label}
          </div>

          <p className="text-lg">{result.msg}</p>
          <p className="text-sm text-gray-500">{result.sub}</p>

          <button onClick={reset} className="underline text-sm mt-4">
            Start over
          </button>
        </div>
      )}

    </div>
  );
}