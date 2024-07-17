import { allArticlesData } from "@/utils/blog/updated-functions";
import Image from 'next/image';
import Link from "next/link";

function PillBadge(props) {
  return (
    <Link href={`${props.link}`} key={props.key}>
      <span class={`tracking-wider px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold bg-${props.bg} dark:bg-${props.dark_pd}`} title="">
        {props.title}
      </span>
    </Link>
  )
};
export default function Home() {
  const articles = allArticlesData().slice(15, 25);
  return (
    <>
      <h1>Home Page</h1>
      <div className="flex flex-3 flex-wrap justify-center items-center content-center
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
              {/* Read more button */}
              <a href={`/blog/${article.slug}`} className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Read More</a>
              {/* Categories and tags section */}
              <div className="flex flex-row flex-wrap border rounded-md p-2 overflow-x-scroll">
                {article.categories.map((category) => (
                  <Link key={category} href={`/blog/categories/${category}`}>
                    <span key={category} className="bg-lightShade dark:bg-darkShade text-darkShade dark:text-lightShade rounded-md m-1">{category}</span>
                  </Link>
                ))}
                {article.tags.map((tag) => (
                  <Link key={tag} href={`/blog/categories/${tag}`}>
                    <span key={tag} className="bg-lightShade dark:bg-darkShade text-darkShade dark:text-lightShade rounded-md m-1">{tag}</span>
                  </Link>
                ))}
              </div>


            </div >
          </>
        ))}
      </div >
    </>
  );
}
