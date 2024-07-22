import { allArticlesData } from "@/utils/blog/updated-functions";

export default function Page({ params }) {
  const article = allArticlesData()[params.index]
  return (
    <>
      <h1>{article.title}</h1>
    </>
  )
}