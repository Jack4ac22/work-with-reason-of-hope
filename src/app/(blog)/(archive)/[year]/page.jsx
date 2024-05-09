'use client'
import { useParams } from "next/navigation";
import Link from 'next/link';
import { allArticlesData } from '@/util/updated-articles-functions';


export default function Page() {
  const params = useParams();
  const chosenYear = params.year;


  return (
    <div>
      <h1>Blog</h1>
      <ul>

      </ul>
    </div>
  )
}
