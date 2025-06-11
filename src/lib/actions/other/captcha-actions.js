"use server";
export async function verifyCaptcha(prevState, formData) {
  const firstNumber = +formData.get("firstNumber");
  const secondNumber = +formData.get("secondNumber");
  const operation = formData.get("operation");
  const answer = +formData.get("userAnswer");

  const correctAnswer = operation === "+" ? firstNumber + secondNumber : firstNumber - secondNumber;

  if (answer === correctAnswer) {
    return { prevState, response: { result: true, message: "Captcha verified successfully!" } };
  } else {
    const errors = [{ name: "userAnswer", message: "Incorrect answer. Please try again." }];
    return { prevState, errors };
  }
}

export async function generateCaptcha() {
  const firstNumber = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
  const secondNumber = Math.floor(Math.random() * firstNumber);
  const operation = Math.random() < 0.5 ? "+" : "-";

  return { firstNumber, secondNumber, operation };
}

