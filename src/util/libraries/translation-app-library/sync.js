export async function synchronizeAll() {
  try {
    require("@/util/libraries/translation-app-library/verses.js");
    require("@/util/libraries/translation-app-library/systematic_theology.js");
    return true;
  } catch (error) {
    error.message = `Error in src/util/libraries/translation-app-library/sync.js: ${error.message}`;
    throw error;
  }
}
