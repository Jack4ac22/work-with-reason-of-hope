import {getAllBlogArticles} from "@/utils/blog/updated-functions";
import {ArticleCard} from "@/components/blog-components/general-compenents/cards-list/article-card";
export default function Home() {
  const articles = getAllBlogArticles();
  return (
    <>
    <h1>Home Page</h1>
    { articles.map((article) => (
     
     <>
     <div key={article.title}>
      <h1>{article.title}</h1>
      </div></>

            ))}
    </>
  );
}
