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
    return { prevState, response: { result: false, message: "Incorrect answer. Please try again." } };
  }
}


