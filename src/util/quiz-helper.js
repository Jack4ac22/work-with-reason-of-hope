import fs from "fs";
import path from "path";

export function getSourceQuestions() {
  const sourcefilePath = path.join(process.cwd(), "/src/assets/questions.json");
  const sourceQuestionsData = fs.readFileSync(sourcefilePath, "utf8");
  const sourceQuestions = JSON.parse(sourceQuestionsData);
  let questions = [];
  questions = sourceQuestions;
  return questions.length;
}
