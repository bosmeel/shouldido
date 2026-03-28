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

  function getResult() {
    if (context === "formal") {
      if (intent === "uncertain") {
        return {
          label: "WAIT",
          color: "text-orange-400",
          msg: "Uncertainty is not a reason to act.",
          sub: "Wait and follow up later.",
        };
      }

      if (intent === "impatient" && delay === "short") {
        return {
          label: "WAIT",
          color: "text-orange-400",
          msg: "You’re acting too quickly.",
          sub: "Give them more time.",
        };
      }

      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "A follow-up is appropriate.",
        sub: "Keep it short and professional.",
      };
    }

    if (timing === "night" && intent !== "practical") {
      return {
        label: "WAIT",
        color: "text-orange-400",
        msg: "This is an emotional moment.",
        sub: "Wait until morning.",
      };
    }

    if (intent === "anxious") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "You’re acting from anxiety.",
        sub: "This will pass if you wait.",
      };
    }

    if (last === "me" && delay === "short") {
      return {
        label: "DON’T TEXT",
        color: "text-red-400",
        msg: "This is double texting.",
        sub: "Wait. Don’t chase.",
      };
    }

    if (stage === "new" && delay === "long") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "It’s okay to reach out.",
        sub: "Early stage is flexible.",
      };
    }

    if (stage === "ongoing" && last === "them" && vibe === "good") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "You’re good to text.",
        sub: "Keep it natural.",
      };
    }

    if (intent === "flirt") {
      return {
        label: "TEXT",
        color: "text-green-400",
        msg: "Go for it.",
        sub: "Keep it playful.",
      };
    }

    return {
      label: "WAIT",
      color: "text-orange-400",
      msg: "Not enough signal yet.",
      sub: "Give it more time.",
    };
  }

  function getInsight() {
    if (context === "formal") {
      if (intent === "uncertain") {
        return {
          why: "You do not have enough objective reason to follow up yet. The urge comes from uncertainty, not necessity.",
          action: "Wait and review the situation later with a clear purpose.",
          avoid: "Do not send a message just to reduce your own tension.",
        };
      }

      if (intent === "impatient" && delay === "short") {
        return {
          why: "The other side likely has not had enough time to respond. Following up too soon can feel pushy.",
          action: "Give it more time before checking in again.",
          avoid: "Do not confuse your urgency with their responsibility to reply immediately.",
        };
      }

      return {
        why: "Your reason is legitimate and the situation allows for a calm follow-up.",
        action: "Send a short, polite, low-pressure message.",
        avoid: "Do not overexplain or sound frustrated.",
      };
    }

    if (timing === "night" && intent !== "practical") {
      return {
        why: "Late-day relational decisions are more likely to be driven by loneliness, rumination, or impulse.",
        action: "Sleep on it and review the urge in the morning.",
        avoid: "Do not send emotional, ambiguous, or needy messages at night.",
      };
    }

    if (intent === "anxious") {
      return {
        why: "Your urge to text is being driven by discomfort and uncertainty rather than strong signal from the other person.",
        action: "Pause and let the emotion settle before doing anything.",
        avoid: "Do not use texting to self-soothe.",
      };
    }

    if (last === "me" && delay === "short") {
      return {
        why: "They have not re-engaged yet. Sending another message now shifts the balance too far in your direction.",
        action: "Wait and let them come back on their own.",
        avoid: "Do not double text to force momentum.",
      };
    }

    if (stage === "new" && delay === "long") {
      return {
        why: "In an early-stage connection, a light re-entry after some time can feel normal rather than needy.",
        action: "Reach out casually and keep the tone low-pressure.",
        avoid: "Do not make it emotionally heavy too early.",
      };
    }

    if (stage === "ongoing" && last === "them" && vibe === "good") {
      return {
        why: "The interaction is balanced and there is enough reciprocity to justify reaching out.",
        action: "Send something natural and in line with the existing dynamic.",
        avoid: "Do not suddenly overinvest or change tone.",
      };
    }

    if (intent === "flirt") {
      return {
        why: "There is enough room here for light initiative, as long as it stays playful and not over-eager.",
        action: "Keep it short, confident, and a little teasing.",
        avoid: "Do not turn flirtation into validation-seeking.",
      };
    }

    return {
      why: "The situation does not yet give a strong enough signal to act confidently.",
      action: "Give it more time and wait for better clarity.",
      avoid: "Do not force contact to create certainty.",
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

      <div className="text-center space-y-6">
        {step === "context" && (
          <>
            <p className="text-lg font-medium">What’s the situation?</p>
            <div className="flex justify-center gap-3">
              <Button
                label="Personal / Dating"
                onClick={() => {
                  setContext("relational");
                  next();
                }}
              />
              <Button
                label="Formal / Work"
                onClick={() => {
                  setContext("formal");
                  next(2);
                }}
              />
            </div>
          </>
        )}

        {step === "stage" && (
          <>
            <p className="text-lg font-medium">What stage are you in?</p>
            <div className="flex justify-center gap-3">
              <Button
                label="New"
                onClick={() => {
                  setStage("new");
                  next();
                }}
              />
              <Button
                label="Ongoing"
                onClick={() => {
                  setStage("ongoing");
                  next();
                }}
              />
            </div>
          </>
        )}

        {step === "last" && (
          <>
            <p className="text-lg font-medium">Who texted last?</p>
            <div className="flex justify-center gap-3">
              <Button
                label="I did"
                onClick={() => {
                  setLast("me");
                  next();
                }}
              />
              <Button
                label="They did"
                onClick={() => {
                  setLast("them");
                  next();
                }}
              />
            </div>
          </>
        )}

        {step === "delay" && (
          <>
            <p className="text-lg font-medium">How long ago?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                label="Just now"
                onClick={() => {
                  setDelay("short");
                  next();
                }}
              />
              <Button
                label="Hours"
                onClick={() => {
                  setDelay("hours");
                  next();
                }}
              />
              <Button
                label="1+ day"
                onClick={() => {
                  setDelay("long");
                  next();
                }}
              />
            </div>
          </>
        )}

        {step === "timing" && (
          <>
            <p className="text-lg font-medium">
              When are you about to send this?
            </p>
            <div className="flex justify-center gap-3">
              <Button
                label="Daytime"
                onClick={() => {
                  setTiming("day");
                  next();
                }}
              />
              <Button
                label="Evening"
                onClick={() => {
                  setTiming("night");
                  next();
                }}
              />
            </div>
          </>
        )}

        {step === "intent" && (
          <>
            <p className="text-lg font-medium">Why?</p>

            <div className="flex flex-wrap justify-center gap-3">
              {context === "formal" ? (
                <>
                  <Button
                    label="Follow up"
                    onClick={() => {
                      setIntent("followup");
                      next(2);
                    }}
                  />
                  <Button
                    label="Practical"
                    onClick={() => {
                      setIntent("practical");
                      next(2);
                    }}
                  />
                  <Button
                    label="Uncertain"
                    onClick={() => {
                      setIntent("uncertain");
                      next(2);
                    }}
                  />
                  <Button
                    label="Impatient"
                    onClick={() => {
                      setIntent("impatient");
                      next(2);
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    label="Miss them"
                    onClick={() => {
                      setIntent("miss");
                      next();
                    }}
                  />
                  <Button
                    label="Practical"
                    onClick={() => {
                      setIntent("practical");
                      next();
                    }}
                  />
                  <Button
                    label="Flirt"
                    onClick={() => {
                      setIntent("flirt");
                      next();
                    }}
                  />
                  <Button
                    label="Anxious"
                    onClick={() => {
                      setIntent("anxious");
                      next(2);
                    }}
                  />
                </>
              )}
            </div>
          </>
        )}

        {step === "vibe" && (
          <>
            <p className="text-lg font-medium">Vibe?</p>
            <div className="flex justify-center gap-3">
              <Button
                label="Good"
                onClick={() => {
                  setVibe("good");
                  next();
                }}
              />
              <Button
                label="Mixed"
                onClick={() => {
                  setVibe("mixed");
                  next();
                }}
              />
              <Button
                label="Bad"
                onClick={() => {
                  setVibe("bad");
                  next();
                }}
              />
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

          <div className="mt-6 p-5 rounded-2xl border border-gray-200 bg-gray-50 text-left">
            {!showPremium ? (
              <>
                <p className="font-medium">Want to understand why?</p>

                <p className="text-sm text-gray-500 mt-1">
                  See the reasoning behind this decision
                </p>

                <button
                  onClick={() => setShowPremium(true)}
                  className="mt-4 px-5 py-2 rounded-full bg-black text-white text-sm"
                >
                  Show explanation
                </button>
              </>
            ) : (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">What’s happening</p>
                  <p>{getInsight().why}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">What to do</p>
                  <p>{getInsight().action}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Avoid this</p>
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