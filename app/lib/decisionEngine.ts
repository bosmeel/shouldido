type Input = {
  context: string | null;
  stage: string | null;
  last: string | null;
  delay: string | null;
  timing: string | null;
  intent: string | null;
  vibe: string | null;
};

export function getDecision(input: Input) {
  const { context, stage, last, delay, timing, intent, vibe } = input;

  // FORMAL
  if (context === "formal") {
    if (intent === "uncertain") {
      return {
        label: "WAIT",
        msg: "Uncertainty is not a reason to act.",
      };
    }

    if (intent === "impatient" && delay === "short") {
      return {
        label: "WAIT",
        msg: "You’re acting too quickly.",
      };
    }

    return {
      label: "TEXT",
      msg: "A follow-up is appropriate.",
    };
  }

  // RELATIONAL

  if (timing === "night" && intent !== "practical") {
    return {
      label: "WAIT",
      msg: "Wait until morning.",
    };
  }

  if (intent === "anxious") {
    return {
      label: "DON’T TEXT",
      msg: "You’re acting from anxiety.",
    };
  }

  if (last === "me" && delay === "short") {
    return {
      label: "DON’T TEXT",
      msg: "This is double texting.",
    };
  }

  if (stage === "new" && delay === "long") {
    return {
      label: "TEXT",
      msg: "It’s fine to reach out.",
    };
  }

  if (stage === "ongoing" && last === "them" && vibe === "good") {
    return {
      label: "TEXT",
      msg: "You’re good to text.",
    };
  }

  return {
    label: "WAIT",
    msg: "Give it more time.",
  };
}