import allArticles from '@/content/articles.json'
import Link from 'next/link';
import { getArticles } from '@/util/articles-archhive'
export default function Page() {
  const articles = getArticles('2020', '02', '06','all'
  )
  const years = allArticles.map((article) => article.date.split('-')[0])
  const uniqueYears = [...new Set(years)]
  uniqueYears.sort((a, b) => b - a)
  // console.log(uniqueYears)
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {uniqueYears.map((year) => (
          <li key={year}>
            <Link href={`/blog/${year}`} >
              {year}
            </Link></li>
        ))}
      </ul>
    </div >
  );
}