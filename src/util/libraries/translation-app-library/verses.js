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
    placesCount INTEGER,
    avd TEXT,
    etr TEXT,
    kat TEXT,
    sat TEXT,
    sharif TEXT
);
`);

  function getFlattenedVerses(avd_verses) {
    const falttened_avd_books = avd_verses.osis[0].osisText[0].div;
    const avd_books = falttened_avd_books.map((book) => {
      book;
    });
    console.log(avd_books.length);

    const flattenedVerses = falttened_avd_books
      .map((book) => {
        return book.chapter.map((chapter) => {
          return chapter.verse.map((verse) => {
            return {
              bookOsisID: book.osisID._value,
              chapterNumber: chapter.cnumber,
              verseNumber: verse.vnumber,
              verseOsisID: verse.osisID._value,
              verseText: verse._text,
            };
          });
        });
      })
      .flat(2);
    console.log(flattenedVerses.length);
    return flattenedVerses;
  }

  function findVerseText(OsisRef, verses) {
    const verse = verses.find((v) => v.verseOsisID === OsisRef);
    return verse ? verse.verseText : null;
  }

  // check if the verses table is empty
  const count = db.prepare("SELECT count(*) as count FROM Verses").get();
  if (count.count > 0) {
    console.log("Verses already inserted");
  } else {
    // import the json bibles array
    const verses = require("@/assets/json-data-sets/verses.json");
    const avd_verses = require("@/assets/json-data-sets/bibles/AVD.json");
    const etr_verses = require("@/assets/json-data-sets/bibles/ETR.json");
    const kat_verses = require("@/assets/json-data-sets/bibles/KAT.json");
    const sat_verses = require("@/assets/json-data-sets/bibles/SAT.json");
    const sherif_verses = require("@/assets/json-data-sets/bibles/Sharif.json");

    // get the verses from the bibles
    const vanDyke = getFlattenedVerses(avd_verses);
    console.log("vanDyke", vanDyke.length);
    const etr = getFlattenedVerses(etr_verses);
    console.log("etr", etr.length);
    const kat = getFlattenedVerses(kat_verses);
    console.log("kat", kat.length);
    const sat = getFlattenedVerses(sat_verses);
    console.log("sat", sat.length);
    const sharif = getFlattenedVerses(sherif_verses);
    console.log("sharif", sharif.length);

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
        avd: findVerseText(verse.fields.osisRef, vanDyke),
        etr: findVerseText(verse.fields.osisRef, etr),
        kat: findVerseText(verse.fields.osisRef, kat),
        sat: findVerseText(verse.fields.osisRef, sat),
        sharif: findVerseText(verse.fields.osisRef, sharif),
      };
    });

    // prepare the insert statement
    const insertVerse = db.prepare(
      "INSERT INTO Verses (id, osisRef, verseNum, verseText, book, eventsDescribed, people, yearNum, chapter, status, mdText, richText, timeline, peopleCount, placesCount, avd, etr, kat, sat, sharif) VALUES (@id, @osisRef, @verseNum, @verseText, @book, @eventsDescribed, @people, @yearNum, @chapter, @status, @mdText, @richText, @timeline, @peopleCount, @placesCount, @avd, @etr, @kat, @sat, @sharif)"
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
