import path from "path";
export const baseDir = process.env.NODE_ENV === "development"
  ? path.join(process.cwd(), "src/assets/sqlite/development/")
  : path.join(process.cwd(), ".next/");
