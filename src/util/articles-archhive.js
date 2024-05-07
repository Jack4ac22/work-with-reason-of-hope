import allArticles from "@/content/articles.json";

// TODO: make the articles creation conditional to the existance to the file or the date of last creation of the file. the file should be createdo only on deployement. maybe it can be hosted on other servers.
export function getArticles(
  year = "all",
  month = "all",
  day = "all",
  slug = "all"
) {
  const archiveYears = [
    ...new Set(allArticles.map((article) => article.date.split("-")[0])),
  ];
  console.log(archiveYears);
  if (year === "all") {
    return allArticles;
  }
  if (!archiveYears.includes(year.toString())) {
    new Error(`Year ${year} not found in archive`);
    console.log(`Year ${year} not found in archive`);
    return [];
  }
  const monthsOfChosenYear = [
    ...new Set(
      allArticles
        .filter((article) => article.date.split("-")[0] === year.toString())
        .map((article) => article.date.split("-")[1])
    ),
  ];
  console.log(monthsOfChosenYear);
  if (month === "all") {
    const articles = allArticles.filter(
      (article) => article.date.split("-")[0] === year.toString()
    );
    console.log(articles.length);
    return articles;
  }
  if (!monthsOfChosenYear.includes(month.toString())) {
    new Error(`Month ${month} not found in archive`);
    console.log(`Month ${month} not found in archive`);
    return [];
  }
  const daysOfChosenMonth = [
    ...new Set(
      allArticles
        .filter(
          (article) =>
            article.date.split("-")[0] === year.toString() &&
            article.date.split("-")[1] === month.toString()
        )
        .map((article) => article.date.split("-")[2])
    ),
  ];
  console.log(daysOfChosenMonth);
  if (day === "all") {
    const articles = allArticles
      .filter(
        (article) =>
          article.date.split("-")[0] === year.toString() &&
          article.date.split("-")[1] === month.toString()
      )
      .sort((a, b) => {
        const dayA = parseInt(a.date.split("-")[2]);
        const dayB = parseInt(b.date.split("-")[2]);
        return dayB - dayA;
      });
    console.log(articles.length);
    return articles;
  }
  if (!daysOfChosenMonth.includes(day.toString())) {
    new Error(`Day ${day} not found in archive`);
    console.log(`Day ${day} not found in archive`);
    return [];
  }
  const SlugsOfChosenDay = [
    ...new Set(
      allArticles
        .filter(
          (article) =>
            article.date.split("-")[0] === year.toString() &&
            article.date.split("-")[1] === month.toString() &&
            article.date.split("-")[2] === day.toString()
        )
        .map((article) => article.slug)
    ),
  ];
  console.log(SlugsOfChosenDay);
  if (slug === "all") {
    const articles = allArticles.filter(
      (article) =>
        article.date.split("-")[0] === year.toString() &&
        article.date.split("-")[1] === month.toString() &&
        article.date.split("-")[2] === day.toString()
    );
    console.log(articles.length);
    return articles;
  }
  if (!SlugsOfChosenDay.includes(slug.toString())) {
    new Error(`Slug ${slug} not found in archive`);
    console.log(`Slug ${slug} not found in archive`);
    return [];
  }

}
