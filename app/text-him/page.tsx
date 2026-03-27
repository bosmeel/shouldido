import DecisionTool from "../components/DecisionTool";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-10">

      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          Should I Text Him?
        </h1>

        <p className="text-gray-600 text-lg">
          Use this simple tool to decide if you should text him — or wait.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="space-y-6">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When should you text him?
          </h2>

          <p className="text-gray-700">
            You should text him if the conversation was positive, enough time has passed, and there is mutual interest. If you were the last to text and he hasn’t replied, waiting is usually the better move.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When you should NOT text him
          </h2>

          <ul className="list-disc ml-5 text-gray-700">
            <li>He didn’t reply to your last message</li>
            <li>You feel anxious or unsure</li>
            <li>The vibe was off</li>
            <li>It has only been a short time</li>
          </ul>
        </div>

      </section>

    </main>
  );
}