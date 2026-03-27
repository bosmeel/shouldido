export default function SeoBlock({ title }: { title: string }) {
  return (
    <section className="mt-12 space-y-6">

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-gray-700">
        Timing matters. If the vibe is good and enough time has passed, texting can help move things forward. If not, waiting is usually the better choice.
      </p>

      <ul className="list-disc ml-5 text-gray-700">
        <li>Don’t text too soon</li>
        <li>Match their effort</li>
        <li>Avoid chasing</li>
        <li>Wait if unsure</li>
      </ul>

    </section>
  );
}