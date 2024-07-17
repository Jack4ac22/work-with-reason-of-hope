import Link from "next/link";

export default function ArticleCardFooter({ article }) {
  const categoriesList = article.categories.map((category, index) => {
    return {
      "title": category,
      "link": `/categories/${category}`
    }
  });
  const tagsList = article.tags.map((tag, index) => {
    return {
      "title": tag,
      "link": `/tags/${tag}`
    }
  });
  const combinedList = [...categoriesList, ...tagsList];
  return (
    <div className="absolute bottom-0 flex flex-nowrap overflow-x-scroll w-full my-2 bg-lightShade bg-opacity-15 group">
      {
        combinedList.map((item, index) => {
          return (
            <Link href={item.link} key={`${index}_${item.title}`} className="group-hover: bg-darkShade group">
              <span className="mx-2 p-2 text-nowrap text-lightShade group-hover:brightness-100 rounded-xl bg-darkAccent">
                {item.title.replace(/-/g, ' ')}
              </span>
            </Link>
          )
        })}
    </div>
  );
}