import { getArticleDataWithBody } from "@/util/articles-functions";
export default async function GospelPage() {
  const article = await getArticleDataWithBody("gospel", "/src/content/pages-content");
  return (
    <>
      <h1 className="text-xl ">
        {article.title}
      </h1>
    </>
  )
}