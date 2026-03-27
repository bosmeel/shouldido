import DecisionTool from "./components/DecisionTool";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-10">

      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          Should I Text Them?
        </h1>

        <p className="text-gray-600 text-lg">
          A simple tool to decide if you should text — or wait.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="space-y-6 text-gray-700">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            What this tool actually does
          </h2>

          <p>
            This tool looks at timing, conversation flow, and your intent to give you a clear answer. It helps you avoid overthinking and prevents you from texting too soon or chasing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When this tool is useful
          </h2>

          <ul className="list-disc ml-5">
            <li>Should I text him or her?</li>
            <li>Should I double text?</li>
            <li>Should I reach out again?</li>
          </ul>
        </div>

      </section>

    </main>
  );
}