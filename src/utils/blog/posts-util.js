import path from "path";
import fs from "fs";

export const getListOfPosts = () => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);
  return files.filter((file) => file.endsWith(".md"));
};
