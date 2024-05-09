import Link from 'next/link';

export default async function Page() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {
          allArticles.map((article) => (
            <li key={article.slug}>
              <Link href={`/blog/${article.slug}`} >
                {article.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div >
  );
}