import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link href="/" className="text-3xl font-bold tracking-tight text-zinc-900">
          ArticleGrade
        </Link>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
          Science and technology news, leveled from Lv.1 to Lv.5 so you can
          read at a depth that matches what you already know.
        </p>
      </div>
    </header>
  );
}
