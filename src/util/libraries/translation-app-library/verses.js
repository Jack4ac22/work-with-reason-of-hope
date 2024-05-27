import sql from "better-sqlite3";

const db = new sql("local.db");

function initDb() {
  console.log("initDb from vss");
  // verses table.
  db.exec(`CREATE TABLE IF NOT EXISTS Verses (
    id TEXT PRIMARY KEY,
    osisRef TEXT,
    verseNum TEXT,
    verseText TEXT,
    book TEXT,
    eventsDescribed TEXT,
    people TEXT,
    yearNum INTEGER,
    chapter TEXT,
    status TEXT,
    mdText TEXT,
    richText TEXT,
    timeline TEXT,
    peopleCount INTEGER,
    placesCount INTEGER
);
`);
  // get the verses from the json file in assets/json-data-sets/verses.json
  const verses = require("@/assets/json-data-sets/verses.json");
  console.log(verses.length);
  // prepare the verses to match the insert statement
  const preparedVerses = verses.map((verse) => {
    return {
      id: verse.id,
      osisRef: verse.fields.osisRef,
      verseNum: verse.fields.verseNum,
      verseText: verse.fields.verseText,
      book: verse.fields.book ? verse.fields.book.join(";") : "",
      eventsDescribed: verse.fields.eventsDescribed
        ? verse.fields.eventsDescribed.join(";")
        : "",
      people: verse.fields.people ? verse.fields.people.join(";") : "",
      yearNum: verse.fields.yearNum,
      chapter: verse.fields.chapter ? verse.fields.chapter.join(";") : "",
      status: verse.fields.status,
      mdText: verse.fields.mdText,
      richText: verse.fields.richText,
      timeline: verse.fields.timeline ? verse.fields.timeline.join(";") : "",
      peopleCount: verse.fields.peopleCount,
      placesCount: verse.fields.placesCount,
    };
  });
  // check if the verses table is empty
  const count = db.prepare("SELECT count(*) as count FROM Verses").get();
  if (count.count > 0) {
    console.log("Verses already inserted");
  } else {
    // prepare the insert statement
    const insertVerse = db.prepare(
      "INSERT INTO Verses (id, osisRef, verseNum, verseText, book, eventsDescribed, people, yearNum, chapter, status, mdText, richText, timeline, peopleCount, placesCount) VALUES (@id, @osisRef, @verseNum, @verseText, @book, @eventsDescribed, @people, @yearNum, @chapter, @status, @mdText, @richText, @timeline, @peopleCount, @placesCount)"
    );
    const insertMany = db.transaction((verses) => {
      for (const verse of verses) {
        insertVerse.run(verse);
      }
    });
    insertMany(preparedVerses);
    console.log("Verses inserted");
  }
}
initDb();
