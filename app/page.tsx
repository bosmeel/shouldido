import DecisionTool from "./components/DecisionTool";
import SeoBlock from "./components/SeoBlock";
import Nav from "./components/Nav";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-8">

      <Nav />

      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          Should I Text Them?
        </h1>

        <p className="text-gray-600 text-lg">
          Stop overthinking. Get a clear answer in seconds.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="text-center text-sm text-gray-500">
        Also try:{" "}
        <a href="/text-him" className="underline">
          Should I text him?
        </a>{" "}
        ·{" "}
        <a href="/text-her" className="underline">
          Should I text her?
        </a>
      </section>

      <SeoBlock title="When should you text someone?" />

    </main>
  );
}