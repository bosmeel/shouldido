import DecisionTool from "../components/DecisionTool";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto px-6 py-10 space-y-10">

      <header className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          Should I Text Her?
        </h1>

        <p className="text-gray-600 text-lg">
          Not sure if you should text her? Use this tool to decide clearly.
        </p>
      </header>

      <section className="border rounded-2xl p-6 shadow-sm">
        <DecisionTool />
      </section>

      <section className="space-y-6">

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When should you text her?
          </h2>

          <p className="text-gray-700">
            Text her when the interaction felt natural, enough time has passed, and she showed interest. If she hasn’t replied to your last message, it’s usually better to wait.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            When you should NOT text her
          </h2>

          <ul className="list-disc ml-5 text-gray-700">
            <li>She didn’t respond to your last message</li>
            <li>You feel uncertain or anxious</li>
            <li>The conversation lacked energy</li>
            <li>It has only been a short time</li>
          </ul>
        </div>

      </section>

    </main>
  );
}