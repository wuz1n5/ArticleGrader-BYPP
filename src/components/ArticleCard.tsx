import ArticleMeta from "@/components/ArticleMeta";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex flex-col gap-3 border-b border-zinc-200 pb-6">
      <ArticleMeta
        category={article.category}
        difficulty={article.difficulty}
        source={article.source}
        publishedAt={article.publishedAt}
      />
      <h3 className="text-lg font-semibold leading-snug text-zinc-900">
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600">{article.summary}</p>
    </article>
  );
}
