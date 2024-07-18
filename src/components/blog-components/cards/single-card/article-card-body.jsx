import Link from "next/link";

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
      animate-slideDown bg-opacity-50 ">
          <p className="text-sm text-center">{article.description}</p>
        </div>
        {/* <Link href={`/blog/${article.slug}`} className="m-2 absolute top-56">المزيد</Link> */}
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