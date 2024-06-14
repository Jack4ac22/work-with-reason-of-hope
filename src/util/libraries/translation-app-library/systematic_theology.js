import sql from "better-sqlite3";

const db = new sql("local.db");

function initDb() {
  console.log("initDb from systematic theology");
  // systematic theology table.
  db.exec(`CREATE TABLE IF NOT EXISTS SystematicTheology (
    id TEXT PRIMARY KEY,
    title TEXT,
    title_ar TEXT,
    alternative_title TEXT,
    alternative_title_ar TEXT,
    description TEXT,
    description_ar TEXT,
    short_description TEXT,
    short_description_ar TEXT,
    main_category TEXT default '',
    other_categories TEXT,
    sub_categories TEXT,
    key_verses TEXT,
    additional_verses TEXT,
    other_subjects TEXT,
    recommended_resources TEXT
  );
  `);

  // check if the systematic theology table is empty
  const count = db
    .prepare("SELECT count(*) as count FROM SystematicTheology")
    .get();
  if (count.count > 0) {
    console.log("SystematicTheology already inserted");
  } else {
    const systematicTheology = require("@/assets/json-data-sets/systematic_theology.json");

    console.log("Inserting SystematicTheology", systematicTheology.length);
    // prepare the verses to match the insert statement
    const preparedSystematicTheology = systematicTheology.map((systematic) => {
      return {
        id: systematic._id,
        ...systematic.fields,
      };
    });

    console.log(preparedSystematicTheology[10]);

    // rewrite the arrays to strings in other_categories, sub_categories, key_verses, additional_verses, other_subjects, recommended_resources after checking the existance of the field
    const updatedSystematicTheology = preparedSystematicTheology.map(
      (systematic) => {
        return {
          ...systematic,
          other_categories: Array.isArray(systematic.other_categories)
            ? systematic.other_categories.join(";")
            : "",
          sub_categories: systematic.sub_categories
            ? systematic.sub_categories.join(";")
            : "",
          key_verses: systematic.key_verses
            ? systematic.key_verses.join(";")
            : "",
          additional_verses: systematic.additional_verses
            ? systematic.additional_verses.join(";")
            : "",
          other_subjects: systematic.other_subjects
            ? systematic.other_subjects.join(";")
            : "",
          recommended_resources: systematic.recommended_resources
            ? systematic.recommended_resources.join(";")
            : "",
        };
      }
    );
    console.log(updatedSystematicTheology[10]);

    // prepare the insert statement
    const insertItem = db.prepare(
      "INSERT INTO SystematicTheology (id, title, title_ar, alternative_title, alternative_title_ar, description, description_ar, short_description, short_description_ar, main_category, other_categories, sub_categories, key_verses, additional_verses, other_subjects, recommended_resources) VALUES (@id, @title, @title_ar, @alternative_title, @alternative_title_ar, @description, @description_ar, @short_description, @short_description_ar, @main_category, @other_categories, @sub_categories, @key_verses, @additional_verses, @other_subjects, @recommended_resources)"
    );
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertItem.run(item);
      }
    });
    insertMany(updatedSystematicTheology);
    console.log("systematic theology inserted");
  }
}
initDb();
