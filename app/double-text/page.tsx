import DecisionTool from "../components/DecisionTool";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-10">

      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          Should I Double Text?
        </h1>

        <p className="text-gray-600 text-lg">
          Thinking about sending another message? Use this tool to decide.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="space-y-6">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            What is double texting?
          </h2>

          <p className="text-gray-700">
            Double texting means sending a second message before getting a reply to your first one. It can be harmless in some situations, but often lowers your position if done too quickly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When double texting is okay
          </h2>

          <ul className="list-disc ml-5 text-gray-700">
            <li>Enough time has passed (at least a day)</li>
            <li>You have a clear reason to follow up</li>
            <li>The previous conversation was positive</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When you should NOT double text
          </h2>

          <ul className="list-disc ml-5 text-gray-700">
            <li>It has only been a few hours</li>
            <li>You feel anxious or impatient</li>
            <li>The other person is pulling away</li>
            <li>You already sent multiple messages</li>
          </ul>
        </div>

      </section>

    </main>
  );
}