import { getAllBlogArticles } from "@/utils/blog/updated-functions";
import Image from 'next/image';
export default function Home() {
  const articles = getAllBlogArticles().slice(0, 6);
  return (
    <>
      <h1>Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      justify-center 
      p-2 m-2 gap-2 md:gap-3 lg:gap-4">
        {articles.map((article) => (
          <>
            <div key={article.index} className="group flex flex-col items-center cont p-2 border-2 rounded-xl hover:shadow-lg w-80 h-128 hover:overflow-y-auto">
              <div className="roundeds-xl w-72 ">
                <Image src={`/blog_images/${article.coverImage}`} alt={`Cover Image for: ${article.slug}`}
                  className="object-cover w-full h-48 rounded-t-xl mb-2"
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority={true}
                />
                <data className="m-2 p-1 border-b border-r rounded-md text-sm font-thin">{new Intl.DateTimeFormat('ar-SY', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  timeZone: 'Asia/Damascus'
                }).format(new Date(article.date))}</data>
              </div>
              <h1 className="my-4 font-bold text-center">{article.title}</h1>
              <p className="text-md text-justify">{article.description}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
