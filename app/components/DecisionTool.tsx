"use client";

import { useState } from "react";

type LastType = "me" | "them" | null;
type TimeType = "<1h" | "hours" | "1d" | "2-3d" | "4d" | null;
type VibeType = "good" | "mixed" | "bad" | null;
type IntentType = "miss" | "need" | "check" | "emotional" | null;

type ResultType = {
  label: "TEXT" | "WAIT" | "DON’T TEXT";
  color: string;
  msg: string;
} | null;

function ChoiceButton({
  value,
  selected,
  onClick,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded border px-4 py-2 text-sm transition ${
        selected
          ? "bg-black text-white border-black"
          : "bg-white text-black border-gray-300 hover:border-black"
      }`}
    >
      {value}
    </button>
  );
}

export default function DecisionTool() {
  const [last, setLast] = useState<LastType>(null);
  const [time, setTime] = useState<TimeType>(null);
  const [vibe, setVibe] = useState<VibeType>(null);
  const [intent, setIntent] = useState<IntentType>(null);

  function resetForm() {
    setLast(null);
    setTime(null);
    setVibe(null);
    setIntent(null);
  }

  function getScore() {
    let score = 0;

    if (last === "me") score -= 2;
    if (last === "them") score += 2;

    if (time === "<1h") score -= 3;
    if (time === "hours") score -= 2;
    if (time === "1d") score += 0;
    if (time === "2-3d") score += 2;
    if (time === "4d") score += 3;

    if (vibe === "good") score += 2;
    if (vibe === "mixed") score += 0;
    if (vibe === "bad") score -= 3;

    if (intent === "miss") score += 0;
    if (intent === "need") score += 1;
    if (intent === "check") score += 1;
    if (intent === "emotional") score -= 2;

    return score;
  }

  function getResult() {
  if (!last || !time || !vibe || !intent) return null;

  const score = getScore();

  // 🔴 situatie detectie
  const isDoubleText = last === "me" && (time === "<1h" || time === "hours");
  const isChasing = last === "me" && vibe === "bad";
  const theyPulledAway = last === "them" && vibe === "bad";

  if (isDoubleText) {
    return {
      label: "DON’T TEXT",
      color: "text-red-600",
      msg: "This is double texting. Wait — you risk looking needy.",
    };
  }

  if (isChasing) {
    return {
      label: "DON’T TEXT",
      color: "text-red-600",
      msg: "You’re chasing. Give them space.",
    };
  }

  if (theyPulledAway) {
    return {
      label: "WAIT",
      color: "text-orange-500",
      msg: "They pulled back. Let them re-engage.",
    };
  }

  // fallback op score
  if (score >= 3) {
    return {
      label: "TEXT",
      color: "text-green-600",
      msg: "Good timing. You can reach out.",
    };
  }

  if (score <= -3) {
    return {
      label: "DON’T TEXT",
      color: "text-red-600",
      msg: "Not a good move right now.",
    };
  }

  return {
    label: "WAIT",
    color: "text-orange-500",
    msg: "Too early. Give it more time.",
  };
}

  const result = getResult();

  return (
    <section className="space-y-6">
      <div>
        <p className="mb-2 font-medium">Who texted last?</p>
        <div className="flex flex-wrap gap-2">
          <ChoiceButton
            value="Me"
            selected={last === "me"}
            onClick={() => setLast("me")}
          />
          <ChoiceButton
            value="Them"
            selected={last === "them"}
            onClick={() => setLast("them")}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">How long ago?</p>
        <div className="flex flex-wrap gap-2">
          <ChoiceButton
            value="<1h"
            selected={time === "<1h"}
            onClick={() => setTime("<1h")}
          />
          <ChoiceButton
            value="Hours"
            selected={time === "hours"}
            onClick={() => setTime("hours")}
          />
          <ChoiceButton
            value="1 day"
            selected={time === "1d"}
            onClick={() => setTime("1d")}
          />
          <ChoiceButton
            value="2–3 days"
            selected={time === "2-3d"}
            onClick={() => setTime("2-3d")}
          />
          <ChoiceButton
            value="4+ days"
            selected={time === "4d"}
            onClick={() => setTime("4d")}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Conversation vibe</p>
        <div className="flex flex-wrap gap-2">
          <ChoiceButton
            value="Good"
            selected={vibe === "good"}
            onClick={() => setVibe("good")}
          />
          <ChoiceButton
            value="Mixed"
            selected={vibe === "mixed"}
            onClick={() => setVibe("mixed")}
          />
          <ChoiceButton
            value="Bad"
            selected={vibe === "bad"}
            onClick={() => setVibe("bad")}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Why do you want to text?</p>
        <div className="flex flex-wrap gap-2">
          <ChoiceButton
            value="Miss them"
            selected={intent === "miss"}
            onClick={() => setIntent("miss")}
          />
          <ChoiceButton
            value="Need something"
            selected={intent === "need"}
            onClick={() => setIntent("need")}
          />
          <ChoiceButton
            value="Check in"
            selected={intent === "check"}
            onClick={() => setIntent("check")}
          />
          <ChoiceButton
            value="Emotional"
            selected={intent === "emotional"}
            onClick={() => setIntent("emotional")}
          />
        </div>
      </div>

      {result && (
        <div className="mt-8 rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
          <div className={`text-5xl font-bold ${result.color}`}>
            {result.label}
          </div>

          <p className="mt-3 text-lg text-gray-700">{result.msg}</p>

          <button
            type="button"
            onClick={resetForm}
            className="mt-5 text-sm text-gray-500 underline"
          >
            Start over
          </button>
        </div>
      )}
    </section>
  );
}