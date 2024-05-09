import { allArticlesData } from '@/util/updated-articles-functions';
import Link from 'next/link';
export default async function Page() {
  const allArticles = await allArticlesData()
  const years = allArticles.map((article) => article.date.split('-')[0])
  const uniqueYears = [...new Set(years)]
  uniqueYears.sort((a, b) => b - a)

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