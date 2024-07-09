import { getAllBlogArticles } from "@/utils/blog/updated-functions";
import { ArticleCard } from "@/components/blog-components/general-compenents/cards-list/article-card";
import Image from 'next/image';
export default function Home() {
  const articles = getAllBlogArticles();
  return (
    <>
      <h1>Home Page</h1>
      {articles.map((article) => (
        <>
          <div key={article.title}>
            <h1>{article.title}</h1>
            {/* <DynamicImageComponent imageName={article.coverImage} /> */}
            <Image src={`/blog_images/${article.coverImage}`} alt={`Cover Image for: ${article.slug}`} width={860} height={360} loading="lazy" />
          </div></>

      ))}
    </>
  );
}
