import DecisionTool from "./components/DecisionTool";
import SeoBlock from "./components/SeoBlock";

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

      <section className="space-y-6">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            What this tool helps you decide
          </h2>

          <p className="text-gray-700">
            Not sure if you should text someone? This tool gives you a clear answer based on timing, context, and conversation dynamics. No guessing, no overthinking.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Situations this covers
          </h2>

          <ul className="list-disc ml-5 text-gray-700">
            <li>Should I text him?</li>
            <li>Should I text her?</li>
            <li>Should I double text?</li>
            <li>Should I reach out again?</li>
          </ul>
        </div>

      </section>

      <SeoBlock title="When should you text someone?" />

    </main>
  );
}