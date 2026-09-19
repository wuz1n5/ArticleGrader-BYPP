import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import SubfieldTags from "@/components/SubfieldTags";
import { getCategory } from "@/lib/categories";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const categoryInfo = getCategory(article.category);

  return (
    <article className="group relative flex flex-col gap-3 border-r border-b border-zinc-200 p-6 transition-colors hover:bg-zinc-50/60">
      <div
        className={`absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity group-hover:opacity-100 ${categoryInfo?.barClass ?? "bg-zinc-300"}`}
      />
      <div className="flex flex-col gap-2">
        <ArticleMeta
          category={article.category}
          difficulty={article.difficulty}
          source={article.source}
          publishedAt={article.publishedAt}
          parts={["category"]}
        />
        <SubfieldTags subfields={article.subfields} category={article.category} />
      </div>
      <h3 className="font-serif text-xl leading-snug text-zinc-900 hover:underline">
        <Link href={`/articles/${encodeURIComponent(article.id)}`}>{article.title}</Link>
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
        {article.summary}
      </p>
      <div className="mt-auto border-t border-zinc-100 pt-3">
        <ArticleMeta
          category={article.category}
          difficulty={article.difficulty}
          source={article.source}
          publishedAt={article.publishedAt}
          parts={["difficulty", "source"]}
        />
      </div>
    </article>
  );
}
