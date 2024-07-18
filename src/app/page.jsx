import { allArticlesData } from "@/utils/blog/updated-functions";
import Image from 'next/image';
import Link from "next/link";
import ArticleCard from "@/components/blog-components/cards/single-card/article-card";
function PillBadge(props) {
  return (
    <Link href={`${props.link}`} key={props.key}>
      <span className={`tracking-wider px-4 py-1 text-sm rounded leading-loose mx-2 font-semibold bg-${props.bg} dark:bg-${props.dark_pd}`} title="">
        {props.title}
      </span>
    </Link>
  )
};
export default function Home() {
  const articles = allArticlesData().slice(15, 45);
  return (
    <>
      <h1>Home Page</h1>
      <div className="flex flex-3 flex-wrap justify-center items-center content-center
      p-2 m-2 gap-2 md:gap-3 lg:gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div >
    </>
  );
}
