import Link from "next/link";
import ArticleMeta from "@/components/ArticleMeta";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex flex-col gap-3 border-r border-b border-zinc-200 p-6">
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
        />
      </div>
    </article>
  );
}
