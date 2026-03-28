import DecisionTool from "./components/DecisionTool";

export default function Page() {
  return (
    <main className="min-h-screen">

      {/* 🔥 CHAOTIC HERO */}
      <section className="text-center py-16 px-6 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white">

        <h1 className="text-5xl font-extrabold leading-tight">
          SHOULD I TEXT THEM?
        </h1>

        <p className="mt-4 text-lg opacity-90">
          a scientifically questionable decision tool
        </p>

      </section>

      {/* 🧠 TOOL */}
      <section className="max-w-xl mx-auto px-6 py-12">

        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <DecisionTool />

        </div>

      </section>

      {/* 🪶 SUBTEXT */}
      <p className="text-center text-xs text-gray-400 pb-10">
        built for overthinkers
      </p>

    </main>
  );
}