"use client";

import { useState } from "react";

export default function Page() {
  const [last, setLast] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  function getScore() {
    let score = 0;

    // who texted last
    if (last === "me") score -= 2;
    if (last === "them") score += 2;

    // time
    if (time === "<1h") score -= 3;
    if (time === "hours") score -= 2;
    if (time === "1d") score += 0;
    if (time === "2-3d") score += 2;
    if (time === "4d") score += 3;

    // vibe
    if (vibe === "good") score += 2;
    if (vibe === "mixed") score += 0;
    if (vibe === "bad") score -= 3;

    // intent
    if (intent === "miss") score += 0;
    if (intent === "need") score += 1;
    if (intent === "check") score += 1;
    if (intent === "emotional") score -= 2;

    return score;
  }

  function getResult() {
    if (!last || !time || !vibe || !intent) return null;

    const score = getScore();

    if (score >= 3)
      return {
        label: "TEXT",
        color: "text-green-600",
        msg: "You’ve waited long enough. This won’t hurt your position.",
      };

    if (score <= -3)
      return {
        label: "DON’T TEXT",
        color: "text-red-600",
        msg: "You’re chasing. Let them come to you.",
      };

    return {
      label: "WAIT",
      color: "text-orange-500",
      msg: "Too early. Give it more space.",
    };
  }

  const result = getResult();

  const Button = ({
    value,
    selected,
    onClick,
  }: {
    value: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 border rounded ${
        selected ? "bg-black text-white" : "bg-white"
      }`}
    >
      {value}
    </button>
  );

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-center">
        Should I Text Them?
      </h1>

      <p className="text-center text-gray-600">
        Get a clear answer in seconds. No overthinking.
      </p>

      <div className="space-y-4">

        <div>
          <p className="mb-2 font-medium">Who texted last?</p>
          <div className="flex gap-2">
            <Button value="Me" selected={last==="me"} onClick={()=>setLast("me")} />
            <Button value="Them" selected={last==="them"} onClick={()=>setLast("them")} />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">How long ago?</p>
          <div className="flex flex-wrap gap-2">
            <Button value="<1h" selected={time==="<1h"} onClick={()=>setTime("<1h")} />
            <Button value="Hours" selected={time==="hours"} onClick={()=>setTime("hours")} />
            <Button value="1 day" selected={time==="1d"} onClick={()=>setTime("1d")} />
            <Button value="2–3 days" selected={time==="2-3d"} onClick={()=>setTime("2-3d")} />
            <Button value="4+ days" selected={time==="4d"} onClick={()=>setTime("4d")} />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Conversation vibe</p>
          <div className="flex gap-2">
            <Button value="Good" selected={vibe==="good"} onClick={()=>setVibe("good")} />
            <Button value="Mixed" selected={vibe==="mixed"} onClick={()=>setVibe("mixed")} />
            <Button value="Bad" selected={vibe==="bad"} onClick={()=>setVibe("bad")} />
          </div>
        </div>

        <div>
          <p className="mb-2 font-medium">Why text?</p>
          <div className="flex flex-wrap gap-2">
            <Button value="Miss them" selected={intent==="miss"} onClick={()=>setIntent("miss")} />
            <Button value="Need something" selected={intent==="need"} onClick={()=>setIntent("need")} />
            <Button value="Check in" selected={intent==="check"} onClick={()=>setIntent("check")} />
            <Button value="Emotional" selected={intent==="emotional"} onClick={()=>setIntent("emotional")} />
          </div>
        </div>

      </div>

      {result && (
        <div className="text-center mt-6">
          <div className={`text-4xl font-bold ${result.color}`}>
            {result.label}
          </div>
          <p className="mt-2 text-gray-700">{result.msg}</p>
        </div>
      )}
    </main>
  );
}