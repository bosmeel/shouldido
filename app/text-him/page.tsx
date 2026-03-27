"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-semibold text-center">
        Should I Text Him?
      </h1>

      <p className="text-center text-gray-600">
        Not sure if you should text him? Get a clear answer instantly.
      </p>

      <div className="text-center">
        <Link href="/" className="underline">
          Use the decision tool →
        </Link>
      </div>

      <section className="mt-8 space-y-6">

        <div>
          <h2 className="text-xl font-semibold">When should you text him?</h2>
          <p className="text-gray-700">
            You should text him if enough time has passed, the conversation ended well, and there is clear mutual interest. If you were the last to text and he hasn’t replied, it’s usually better to wait.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Signs you should NOT text him</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>He didn’t reply to your last message</li>
            <li>You feel anxious or unsure</li>
            <li>It has only been a few hours</li>
            <li>The vibe was negative</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Signs you should text him</h2>
          <ul className="list-disc ml-5 text-gray-700">
            <li>He texted you last</li>
            <li>The conversation was positive</li>
            <li>It has been at least a day</li>
            <li>You have a clear reason</li>
          </ul>
        </div>

      </section>

    </main>
  );
}