import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b-4 border-zinc-900 bg-white">
      <div className="mx-auto flex max-w-5xl items-start justify-between gap-4 px-6 pt-10 pb-6">
        <div>
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
        {/* Utility link, not a category — deliberately styled apart from
            CategoryNav's tabs below. */}
        <Link
          href="/saved"
          className="mt-2 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
            <path
              d="M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75v17.5l-6-4.5-6 4.5V3.75Z"
              strokeLinejoin="round"
            />
          </svg>
          Saved
        </Link>
      </div>
    </header>
  );
}
