import ArticleMeta from "@/components/ArticleMeta";
import type { Article } from "@/types/article";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className="flex flex-col gap-4 border-b border-zinc-200 pb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Featured
      </p>
      <ArticleMeta
        category={article.category}
        difficulty={article.difficulty}
        source={article.source}
        publishedAt={article.publishedAt}
      />
      <h2 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
        {article.title}
      </h2>
      <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
        {article.summary}
      </p>
    </article>
  );
}
