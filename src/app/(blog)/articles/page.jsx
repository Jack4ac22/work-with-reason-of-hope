import { allArticlesData } from "@/utils/blog/updated-functions"
export default function Page() {
  const articles = allArticlesData();
  console.log(articles.length)
  return (
    <div></div>
  );
}