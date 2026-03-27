import Link from "next/link";

export default function Nav() {
  return (
    <nav className="text-sm text-center space-x-4 text-gray-500">
      <Link href="/">Text Tool</Link>
      <Link href="/text-him">Text Him</Link>
      <Link href="/text-her">Text Her</Link>
      <Link href="/double-text">Double Text</Link>
    </nav>
  );
}