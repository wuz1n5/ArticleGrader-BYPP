import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/types/article";

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <p className="border border-zinc-200 py-12 text-center text-sm text-zinc-500">
        No articles match this filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 border-t border-l border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
