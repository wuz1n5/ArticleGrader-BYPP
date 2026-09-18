import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b-4 border-zinc-900 bg-white">
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        <Link
          href="/"
          className="font-serif text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl"
        >
          ArticleGrade
        </Link>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
          Science and technology news, leveled from Lv.1 to Lv.5 so you can
          read at a depth that matches what you already know.
        </p>
      </div>
    </header>
  );
}
