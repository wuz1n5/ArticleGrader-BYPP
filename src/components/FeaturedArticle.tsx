import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import SubfieldTags from "@/components/SubfieldTags";
import { getCategory } from "@/lib/categories";
import type { Article } from "@/types/article";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const categoryInfo = getCategory(article.category);

  return (
    <article
      className={`flex gap-5 border-b-2 border-zinc-900 p-6 sm:p-8 ${categoryInfo?.tintBgClass ?? ""}`}
    >
      <div className={`w-1.5 shrink-0 rounded-full ${categoryInfo?.barClass ?? "bg-zinc-900"}`} />
      <div className="flex flex-col gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
          Featured
        </p>
        <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl">
          <Link
            href={`/articles/${encodeURIComponent(article.id)}`}
            className="hover:underline"
          >
            {article.title}
          </Link>
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
          {article.summary}
        </p>
        <div className="mt-1 flex flex-col gap-2 border-t border-zinc-200 pt-4">
          <ArticleMeta
            category={article.category}
            difficulty={article.difficulty}
            source={article.source}
            publishedAt={article.publishedAt}
            size="large"
          />
          <SubfieldTags subfields={article.subfields} category={article.category} />
        </div>
      </div>
    </article>
  );
}
