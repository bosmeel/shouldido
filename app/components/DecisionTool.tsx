"use client";

import { useState } from "react";

type Step = "context" | "stage" | "last" | "delay" | "timing" | "intent" | "vibe" | "result";

export default function DecisionTool() {
  const [step, setStep] = useState<Step>("context");

  const [context, setContext] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const [delay, setDelay] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);

  function reset() {
    setStep("context");
    setContext(null);
    setStage(null);
    setLast(null);
    setDelay(null);
    setTiming(null);
    setIntent(null);
    setVibe(null);
  }

  const stepsOrder = ["context","stage","last","delay","timing","intent","vibe","result"];
  const currentStepIndex = stepsOrder.indexOf(step) + 1;
  const totalSteps = context === "formal" ? 5 : 7;

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
          Step {currentStepIndex} of {totalSteps}
        </div>
      )}

      {step === "context" && (
        <div className="text-center space-y-4">
          <p>What type of situation is this?</p>
          <div className="flex justify-center gap-3">
            <Button label="Personal / Dating" onClick={() => { setContext("relational"); setStep("stage"); }} />
            <Button label="Formal / Work" onClick={() => { setContext("formal"); setStep("delay"); }} />
          </div>
        </div>
      )}

      {step === "stage" && (
        <div className="text-center space-y-4">
          <p>What stage are you in?</p>
          <Button label="New / Early" onClick={() => { setStage("new"); setStep("last"); }} />
          <Button label="Ongoing" onClick={() => { setStage("ongoing"); setStep("last"); }} />
        </div>
      )}

      {step === "last" && (
        <div className="text-center space-y-4">
          <p>Who texted last?</p>
          <Button label="I did" onClick={() => { setLast("me"); setStep("delay"); }} />
          <Button label="They did" onClick={() => { setLast("them"); setStep("delay"); }} />
        </div>
      )}

      {step === "delay" && (
        <div className="text-center space-y-4">
          <p>How long since the last message?</p>
          <Button label="Just now" onClick={() => { setDelay("short"); setStep("timing"); }} />
          <Button label="Few hours" onClick={() => { setDelay("hours"); setStep("timing"); }} />
          <Button label="1+ day" onClick={() => { setDelay("long"); setStep("timing"); }} />
        </div>
      )}

      {step === "timing" && (
        <div className="text-center space-y-4">
          <p>When are you about to send this?</p>
          <Button label="Morning / Daytime" onClick={() => { setTiming("day"); setStep("intent"); }} />
          <Button label="Evening / Night" onClick={() => { setTiming("night"); setStep("intent"); }} />
        </div>
      )}

      {step === "intent" && (
        <div className="text-center space-y-4">
          <p>Why do you want to text?</p>

          {context === "formal" ? (
            <>
              <Button label="Follow up / status" onClick={() => { setIntent("followup"); setStep("result"); }} />
              <Button label="Practical reason" onClick={() => { setIntent("practical"); setStep("result"); }} />
              <Button label="I feel uncertain" onClick={() => { setIntent("uncertain"); setStep("result"); }} />
              <Button label="I feel impatient" onClick={() => { setIntent("impatient"); setStep("result"); }} />
            </>
          ) : (
            <>
              <Button label="I miss them" onClick={() => { setIntent("miss"); setStep("vibe"); }} />
              <Button label="Practical reason" onClick={() => { setIntent("practical"); setStep("vibe"); }} />
              <Button label="Flirting" onClick={() => { setIntent("flirt"); setStep("vibe"); }} />
              <Button label="I feel anxious" onClick={() => { setIntent("anxious"); setStep("result"); }} />
            </>
          )}

        </div>
      )}

      {step === "vibe" && context === "relational" && (
        <div className="text-center space-y-4">
          <p>How was the vibe?</p>
          <Button label="Good" onClick={() => { setVibe("good"); setStep("result"); }} />
          <Button label="Mixed" onClick={() => { setVibe("mixed"); setStep("result"); }} />
          <Button label="Bad" onClick={() => { setVibe("bad"); setStep("result"); }} />
        </div>
      )}

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