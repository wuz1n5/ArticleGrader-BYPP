import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleMeta from "@/components/ArticleMeta";
import ArticleAnalysis from "@/components/ArticleAnalysis";
import { getArticleById } from "@/lib/articles";
import { getArticleAnalysis } from "@/lib/analysis";
import { getCategory } from "@/lib/categories";

export default async function ArticlePage({ params }: PageProps<"/articles/[id]">) {
  const { id } = await params;
  const article = await getArticleById(decodeURIComponent(id));

  if (!article) {
    notFound();
  }

  const analysis = await getArticleAnalysis(article);
  const categoryInfo = getCategory(article.category);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:underline">
        ← Back to ArticleGrade
      </Link>
      <article className="mt-6 flex flex-col gap-6">
        <div className={`h-1.5 w-16 rounded-full ${categoryInfo?.barClass ?? "bg-zinc-900"}`} />
        <h1 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl">
          {article.title}
        </h1>
        <ArticleMeta
          category={article.category}
          difficulty={analysis?.difficulty ?? article.difficulty}
          source={article.source}
          publishedAt={article.publishedAt}
          size="large"
        />
        <p className="text-lg leading-relaxed text-zinc-700">{article.summary}</p>
        <ArticleAnalysis analysis={analysis} />
        {article.originalUrl && (
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm font-semibold text-zinc-900 hover:underline"
          >
            Read the original article on {article.source} →
          </a>
        )}
      </article>
    </main>
  );
}
