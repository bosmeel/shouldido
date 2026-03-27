import SeoBlock from "../components/SeoBlock";
import Nav from "../components/Nav";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">

      <Nav />

      <h1 className="text-3xl font-semibold text-center">
        Should I Text Her?
      </h1>

      <p className="text-center text-gray-600">
        Not sure if you should text her? Get a clear answer instantly.
      </p>

      <div className="text-center">
        <Link href="/" className="underline">
          Use the decision tool →
        </Link>
      </div>

      <SeoBlock title="When should you text her?" />

      <section className="space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold">Signs you should NOT text her</h2>
        <ul className="list-disc ml-5">
          <li>She didn’t reply to your last message</li>
          <li>The conversation felt forced</li>
          <li>You feel anxious or unsure</li>
          <li>It has only been a short time</li>
        </ul>

        <h2 className="text-xl font-semibold">Signs you should text her</h2>
        <ul className="list-disc ml-5">
          <li>She texted you last</li>
          <li>The vibe was positive</li>
          <li>It has been at least a day</li>
          <li>You have a clear reason to reach out</li>
        </ul>
      </section>

    </main>
  );
}