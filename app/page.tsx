import DecisionTool from "./components/DecisionTool";
import SeoBlock from "./components/SeoBlock";
import Nav from "./components/Nav";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">

      <Nav />

      <h1 className="text-3xl font-semibold text-center">
        Should I Text Them?
      </h1>

      <p className="text-center text-gray-600">
        Get a clear answer in seconds. No overthinking.
      </p>

      <DecisionTool />

      <div className="text-center text-sm text-gray-500">
        Also try:{" "}
        <a href="/text-him" className="underline">
          Should I text him?
        </a>
      </div>

      <SeoBlock title="When should you text someone?" />

    </main>
  );
}