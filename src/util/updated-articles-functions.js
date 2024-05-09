

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectoryPath = [
  "creation",
  "logic",
  "objections",
  "publications",
  "word",
  "biblical-studies",
];

export function getArticleFiles(articlesDirectoryPath) {
  const articlesDirectory = path.join(process.cwd(), articlesDirectoryPath);
  return fs.readdirSync(articlesDirectory);
}

export function getArticleData(articleIdentifier, articlesDirectoryPath) {
  const articleSlug = articleIdentifier.replace(/\.md$/, "");
  const filePath = path.join(
    process.cwd(),
    articlesDirectoryPath,
    `${articleSlug}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const dateInformations = data.date.split("-");
  const articleDateInformations = {
    year: dateInformations[0],
    month: dateInformations[1],
    day: dateInformations[2],
  };
  const articleData = {
    slug: articleSlug,
    year: articleDateInformations.year,
    month: articleDateInformations.month,
    day: articleDateInformations.day,
    ...data,
    content: content,
  };
  return articleData;
}

export async function allArticlesData() {
  const jsonFilePath = path.join(process.cwd(), "/src/assets/articles.json");
  // check if the file exists or if its date is one month old, its json and it has a field with the key "lastUpdate"
  if (!fs.existsSync(jsonFilePath)) {
    let articlesInJson = [];
    const articles = articlesDirectoryPath.map((directory) => {
      const articleFiles = getArticleFiles(`/src/content/${directory}`);
      const articles = articleFiles.map((articleFile) => {
        return getArticleData(articleFile, `/src/content/${directory}`);
      });
      articlesInJson = [...articlesInJson, ...articles];
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(articlesInJson));
    return articlesInJson;
  } else {
    // read  the file and return its content
    const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
    const articlesInJson = JSON.parse(fileContent);
    return articlesInJson;
  }
}
export async function yearData(year) {}
export async function monthData(year, month) {}
export async function dayData(year, month, day) {}
export async function articleData(slug) {}
export async function fullPathData(year = "", month = "", day = "", slug = "") {
  let articles = await allArticlesData();
  articles = articles.filter(
    (article) =>
      article.year === year &&
      article.month === month &&
      article.day === day &&
      article.slugtoLowerCase() === slug.toLowerCase()
  );
}
