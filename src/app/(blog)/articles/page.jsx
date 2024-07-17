import { allArticlesData } from "@/utils/blog/updated-functions";
import ArticleCard from "@/components/blog-components/cards/single-card/article-card";
export default function Page() {
  const articles = allArticlesData();
  const article = articles[12];
  const book = articles[360];
  return (
    <>
      <div className="mb-20 flex justify-center">
        <div className="columns-1 sm:columns-2 lg:columns-4">
          <ArticleCard article={article} />
          <ArticleCard article={book} />
        </div>
      </div>
    </>
  );
}