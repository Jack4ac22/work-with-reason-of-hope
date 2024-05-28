"use server";
import { synchronizeAll } from "@/util/libraries/translation-app-library/sync";
export async function synchronizaAllData() {
  await synchronizeAll();
}
