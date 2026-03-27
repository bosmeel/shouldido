"use client";

import { useState } from "react";

export default function DecisionTool() {
  const [last, setLast] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [vibe, setVibe] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

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

    if (score >= 3)
      return { label: "TEXT", color: "text-green-600", msg: "You’ve waited long enough." };

    if (score <= -3)
      return { label: "DON’T TEXT", color: "text-red-600", msg: "You’re chasing." };

    return { label: "WAIT", color: "text-orange-500", msg: "Give it more space." };
  }

  const result = getResult();

  const Button = ({ value, selected, onClick }: any) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 border rounded ${selected ? "bg-black text-white" : ""}`}
    >
      {value}
    </button>
  );

  return (
    <div className="space-y-4">

      <div>
        <p>Who texted last?</p>
        <div className="flex gap-2">
          <Button value="Me" selected={last==="me"} onClick={()=>setLast("me")} />
          <Button value="Them" selected={last==="them"} onClick={()=>setLast("them")} />
        </div>
      </div>

      <div>
        <p>How long ago?</p>
        <div className="flex flex-wrap gap-2">
          <Button value="<1h" selected={time==="<1h"} onClick={()=>setTime("<1h")} />
          <Button value="Hours" selected={time==="hours"} onClick={()=>setTime("hours")} />
          <Button value="1 day" selected={time==="1d"} onClick={()=>setTime("1d")} />
          <Button value="2–3 days" selected={time==="2-3d"} onClick={()=>setTime("2-3d")} />
          <Button value="4+ days" selected={time==="4d"} onClick={()=>setTime("4d")} />
        </div>
      </div>

      <div>
        <p>Vibe</p>
        <div className="flex gap-2">
          <Button value="Good" selected={vibe==="good"} onClick={()=>setVibe("good")} />
          <Button value="Mixed" selected={vibe==="mixed"} onClick={()=>setVibe("mixed")} />
          <Button value="Bad" selected={vibe==="bad"} onClick={()=>setVibe("bad")} />
        </div>
      </div>

      <div>
        <p>Why?</p>
        <div className="flex flex-wrap gap-2">
          <Button value="Miss" selected={intent==="miss"} onClick={()=>setIntent("miss")} />
          <Button value="Need" selected={intent==="need"} onClick={()=>setIntent("need")} />
          <Button value="Check" selected={intent==="check"} onClick={()=>setIntent("check")} />
          <Button value="Emotional" selected={intent==="emotional"} onClick={()=>setIntent("emotional")} />
        </div>
      </div>

      {result && (
  <div className="mt-6 text-center space-y-3">

    <div className={`text-5xl font-bold ${result.color}`}>
      {result.label}
    </div>

    <p className="text-gray-700 text-lg">
      {result.msg}
    </p>

    <button
      onClick={() => {
        setLast(null);
        setTime(null);
        setVibe(null);
        setIntent(null);
      }}
      className="mt-2 text-sm underline text-gray-500"
    >
      Start over
    </button>

  </div>
)}

  <div className={`text-5xl font-bold ${result.color}`}>
    {result.label}
  </div>

  <p className="text-gray-700 text-lg">
    {result.msg}
  </p>

</div>
        </div>
      )}
    </div>
  );
}