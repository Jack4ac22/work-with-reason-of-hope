import Link from "next/link";
import ResourcesIcons from "@/components/blog-components/cards/single-card/resources-icons";

export default function ArticleCardBody({ article }) {
  if (article.isBook) {
    return (
      // Book Body
      <>
        {/* <div className="absolute w-full top-2 bg-lightShade rounded-xl p-1
      animate-slideDownAndAppear delay-100 bg-opacity-50">
          <p className="text-lg text-center">{article.title}</p>
        </div> */}
        <div className="absolute w-full top-2 bg-lightShade rounded-xl p-3
      animate-slideDown bg-opacity-50 flex flex-col items-center justify-start">
          <p className="text-sm text-center">{article.description}</p>
          {/* seperator */}
          <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-4 mb-2"></span>
          <Link href={`/blog/${article.slug}`} className="inline-flex mt-1 text-white bg-mainBrand border-0 py-1 px-6 focus:outline-none hover:brightness-90 rounded">اقرأ المزيد</Link>

        </div>
      </>
    );
  } else {
    return (
      // articles Body
      <div className="">
        article
      </div>
    )
  }
}