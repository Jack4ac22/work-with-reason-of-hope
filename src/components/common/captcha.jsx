"use client";
import { useState, useEffect } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
// Import number icons from react-icons/tb (assuming these exist)
import {
  TbNumber0,
  TbNumber1,
  TbNumber2,
  TbNumber3,
  TbNumber4,
  TbNumber5,
  TbNumber6,
  TbNumber7,
  TbNumber8,
  TbNumber9,
  TbNumber10,
  TbNumber11,
  TbNumber12,
  TbNumber13,
  TbNumber14,
  TbNumber15,
  TbNumber16,
  TbNumber17,
  TbNumber18,
  TbNumber19,
  TbNumber20,
  TbNumber21,
  TbNumber22,
  TbNumber23,
  TbNumber24,
  TbNumber25,
  TbNumber26,
  TbNumber27,
  TbNumber28,
  TbNumber29,
  TbNumber30
} from "react-icons/tb";

// Create a mapping for numbers from 0 to 30
const numberIconMap = {
  0: TbNumber0,
  1: TbNumber1,
  2: TbNumber2,
  3: TbNumber3,
  4: TbNumber4,
  5: TbNumber5,
  6: TbNumber6,
  7: TbNumber7,
  8: TbNumber8,
  9: TbNumber9,
  10: TbNumber10,
  11: TbNumber11,
  12: TbNumber12,
  13: TbNumber13,
  14: TbNumber14,
  15: TbNumber15,
  16: TbNumber16,
  17: TbNumber17,
  18: TbNumber18,
  19: TbNumber19,
  20: TbNumber20,
  21: TbNumber21,
  22: TbNumber22,
  23: TbNumber23,
  24: TbNumber24,
  25: TbNumber25,
  26: TbNumber26,
  27: TbNumber27,
  28: TbNumber28,
  29: TbNumber29,
  30: TbNumber30,
};

export default function ReCaptcha({ onVerified }) {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  // Generate captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    // First number between 5 and 20
    const first = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    // Second number between 0 and first - 1 (ensuring it's lower than first)
    const second = Math.floor(Math.random() * first);
    // Randomly choose operator: '+' or '-'
    const op = Math.random() < 0.5 ? "+" : "-";
    setFirstNumber(first);
    setSecondNumber(second);
    setOperator(op);
    setUserAnswer("");
    setVerified(false);
    setError(null);
  };

  // Calculate correct answer based on operator
  const correctAnswer = () => {
    return operator === "+" ? firstNumber + secondNumber : firstNumber - secondNumber;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = parseInt(userAnswer, 10);
    if (answer === correctAnswer()) {
      setVerified(true);
      if (onVerified) onVerified();
    } else {
      setError("Incorrect answer. Please try again.");
      generateCaptcha();
    }
  };

  if (firstNumber === null || secondNumber === null || operator === null) {
    return null; // Or show a loader if preferred.
  }

  // Get icon components for the first and second numbers
  const FirstNumberIcon = numberIconMap[firstNumber] || (() => <span>{firstNumber}</span>);
  const SecondNumberIcon = numberIconMap[secondNumber] || (() => <span>{secondNumber}</span>);

  return (
    <div className="captcha-container">
      <p>Verify you're human:</p>
      <form onSubmit={handleSubmit}>
        <div className="captcha-problem" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "2rem" }}>
          {/* Display the first number as an icon */}
          <FirstNumberIcon />
          {/* Display the operator icon */}
          {operator === "+" ? <TbPlus /> : <TbMinus />}
          {/* Display the second number as an icon */}
          <SecondNumberIcon />
          {/* Display equals sign as text (or use an icon if desired) */}
          <span>=</span>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Answer"
            required
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Verify
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {verified && <p style={{ color: "green", marginTop: "1rem" }}>Captcha verified!</p>}
    </div>
  );
}
