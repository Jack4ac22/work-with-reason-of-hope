'use client'
import { useParams } from "next/navigation";
import allArticles from '@/content/articles.json'
import Link from 'next/link';
export default function Page() {
  const params = useParams();
  const chosenYear = params.year;
  const years = allArticles.map((article) => article.date.split('-')[0])
  const uniqueYears = [...new Set(years)]
  uniqueYears.sort((a, b) => b - a)
  let articlesOfChosenYear = []
  let months = []
  let uniqueMonths = []
  if (chosenYear & uniqueYears.includes(chosenYear.toString())) {
    // get the months of the year
    months = allArticles.filter((article) => article.date.split('-')[0] === chosenYear.toString()).map((article) => article.date.split('-')[1])
    uniqueMonths = [...new Set(months)]
    uniqueMonths.sort((a, b) => b - a)
    console.log(uniqueMonths)
    // get the articles of the year
    articlesOfChosenYear = allArticles.filter((article) => article.date.split('-')[0] === chosenYear.toString())
    console.log(articlesOfChosenYear.length)
  } else {
    // display all years and error message
  }



  return (
    <div>
      {chosenYear ? (articlesOfChosenYear.length > 0 ? (<div>
        <h1>Blog</h1>
        <h2>{chosenYear}</h2>
        <ul>
          {uniqueMonths.map((month) => (
            <li key={month}>
              <Link href={`/blog/${chosenYear}/${month}`} >
                {month}
              </Link></li>
          ))}
        </ul>
        <ul>
          {articlesOfChosenYear.map((article) => (
            <li key={article.slug}>
              <Link href={`/blog/${article.date.split('-').join('/')}/${article.slug.split('/')[1]}`} >
                {article.title}
              </Link></li>
          ))}
        </ul>
      </div>) : (<div>
        <h1>Blog</h1>
        <h2>{chosenYear}</h2>
        <p>No articles found for this year</p>
      </div>)) : (
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
        </div>
      )

      }
    </div>
  );
}