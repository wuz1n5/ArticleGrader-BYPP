import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:underline">
        ← Back to ArticleGrade
      </Link>
      <div className="mt-6 flex flex-col gap-2">
        <h1 className="font-serif text-3xl text-zinc-900">Article not found</h1>
        <p className="text-base text-zinc-600">
          This article may no longer be available, or the link is incorrect.
        </p>
      </div>
    </main>
  );
}
