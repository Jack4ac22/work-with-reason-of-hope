import { getAllBlogArticles } from "@/utils/blog/updated-functions";
import Image from 'next/image';
export default function Home() {
  const articles = getAllBlogArticles();
  return (
    <>
      <h1>Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 m-2 gap-2 md:gap-3 lg:gap-4">
        {articles.map((article) => (
          <>
            <div key={article.title} className="flex flex-col items-center cont max-w-sm p-2 border-2 rounded-xl hover:shadow-lg h-128 hover:overflow-y-auto">
              <div className="roundeds-xl">
                <Image src={`/blog_images/${article.coverImage}`} alt={`Cover Image for: ${article.slug}`} width={860} height={360} loading="lazy" 
                className="rounded-t-xl object-contain"/>
              </div>

              <h1 className="font-bold center">{article.title}</h1>
              <p className="text-md">{article.description}</p>
            </div></>

        ))}
      </div>
    </>
  );
}
