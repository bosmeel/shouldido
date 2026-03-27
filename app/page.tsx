import DecisionTool from "./components/DecisionTool";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-12 space-y-12">

      <header className="text-center space-y-4">
        <h1 className="text-4xl font-semibold">
          Should I Text Them?
        </h1>

        <p className="text-gray-600 text-lg">
          A simple tool that helps you decide if you should text — based on timing, context, and human behavior.
        </p>

        <p className="text-sm text-gray-400">
          Built to reduce overthinking. Not to encourage it.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="space-y-8 text-gray-700">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Why this works
          </h2>

          <p>
            Most people don’t struggle with what to say — they struggle with when to say it. This tool helps you step back and look at the situation more objectively, so you don’t act on impulse, anxiety, or overthinking.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            What this tool takes into account
          </h2>

          <ul className="list-disc ml-5 space-y-1">
            <li>The type of situation (personal or formal)</li>
            <li>Where you are in the interaction</li>
            <li>Who texted last</li>
            <li>How much time has passed</li>
            <li>Your actual motivation</li>
            <li>Emotional vs rational timing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When to use it
          </h2>

          <ul className="list-disc ml-5 space-y-1">
            <li>When you feel unsure or hesitant</li>
            <li>When you’re about to send a second message</li>
            <li>When you’re overthinking a situation</li>
            <li>When you want to avoid coming across as too eager</li>
          </ul>
        </div>

      </section>

    </main>
  );
}