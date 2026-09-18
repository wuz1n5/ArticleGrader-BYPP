import CategoryNav from "@/components/CategoryNav";
import DifficultySelector from "@/components/DifficultySelector";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleGrid from "@/components/ArticleGrid";
import { getHomeArticles } from "@/lib/articles";
import { isCategorySlug } from "@/lib/categories";
import { isDifficultyLevel } from "@/lib/difficulty";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;

  const categoryParam = typeof params.category === "string" ? params.category : undefined;
  const difficultyParam =
    typeof params.difficulty === "string" ? params.difficulty : undefined;

  const category = categoryParam && isCategorySlug(categoryParam) ? categoryParam : undefined;
  const difficultyNumber = difficultyParam ? Number(difficultyParam) : undefined;
  const difficulty =
    difficultyNumber !== undefined && isDifficultyLevel(difficultyNumber)
      ? difficultyNumber
      : undefined;

  const { featured, rest } = getHomeArticles({ category, difficulty });

  return (
    <>
      <CategoryNav activeCategory={category} difficultyParam={difficultyParam} />
      <DifficultySelector activeDifficulty={difficulty} categoryParam={categoryParam} />
      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {featured && (
          <section className="mb-14">
            <FeaturedArticle article={featured} />
          </section>
        )}
        <section>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-zinc-900">
            Recently Published
          </h2>
          <ArticleGrid articles={rest} />
        </section>
      </main>
    </>
  );
}
