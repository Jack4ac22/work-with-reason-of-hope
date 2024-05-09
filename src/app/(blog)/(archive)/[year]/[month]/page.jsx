'use client'
import { useParams } from "next/navigation";
import { allArticlesData } from '@/util/updated-articles-functions';
import Link from 'next/link';
export default function Page() {
  const params = useParams();
  const chosenYear = params.year;
  const chosenMonth = params.month;
  //  check if the year is valid and there are articles for the year
  // check if the month is valid and there are articles for the month
  // get the articles of the month
  
  

  console.log(params);
  return (
  <>
    <h1>Blog</h1>
    <h2>{chosenYear}</h2>
    <h2>{chosenMonth}</h2>
  </>
  );
}