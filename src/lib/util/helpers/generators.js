/**
 * Generates a string of random digits.
 *
 * @param {number} [length=6] - The number of digits to generate.
 * @returns {string} A string consisting of randomly generated digits.
 *
 * @example
 * // Generates a string like "482931"
 * const randomDigits = generateRandomDigits();
 *
 * @example
 * // Generates a string with 8 random digits, e.g., "84736210"
 * const randomDigits8 = generateRandomDigits(8);
 */
function generateRandomDigits(length = 6) {
  let digits = "";
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
}

export { generateRandomDigits };