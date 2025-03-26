"use client";
import { useState, useEffect } from "react";
import { TbPlus, TbMinus, TbEquals } from "react-icons/tb";
import { useActionState } from "react";
import {
  TbNumber0Small,
  TbNumber1Small,
  TbNumber2Small,
  TbNumber3Small,
  TbNumber4Small,
  TbNumber5Small,
  TbNumber6Small,
  TbNumber7Small,
  TbNumber8Small,
  TbNumber9Small,
  TbNumber10Small,
  TbNumber11Small,
  TbNumber12Small,
  TbNumber13Small,
  TbNumber14Small,
  TbNumber15Small,
  TbNumber16Small,
  TbNumber17Small,
  TbNumber18Small,
  TbNumber19Small,
  TbNumber20Small
} from "react-icons/tb";
const numberIconMap = {
  0: TbNumber0Small,
  1: TbNumber1Small,
  2: TbNumber2Small,
  3: TbNumber3Small,
  4: TbNumber4Small,
  5: TbNumber5Small,
  6: TbNumber6Small,
  7: TbNumber7Small,
  8: TbNumber8Small,
  9: TbNumber9Small,
  10: TbNumber10Small,
  11: TbNumber11Small,
  12: TbNumber12Small,
  13: TbNumber13Small,
  14: TbNumber14Small,
  15: TbNumber15Small,
  16: TbNumber16Small,
  17: TbNumber17Small,
  18: TbNumber18Small,
  19: TbNumber19Small,
  20: TbNumber20Small,
};
export default function ReCaptcha({ onVerified, action }) {
  const [state, formAction] = useActionState(action, {});
  const labels = {};
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


  if (firstNumber === null || secondNumber === null || operator === null) {
    return (<><div>Loading</div></>);
  }

  // Get icon components for the first and second numbers
  const FirstNumberIcon = numberIconMap[firstNumber] || (() => <span>{firstNumber}</span>);
  const SecondNumberIcon = numberIconMap[secondNumber] || (() => <span>{secondNumber}</span>);
  console.log(firstNumber, SecondNumberIcon, operator, userAnswer);
  return (
    <div className="captcha-container p-4 border rounded shadow">
      <p className="mb-4 font-semibold">Verify you're human:</p>
      <form action={formAction}>
        <div className="captcha-problem" >
          <input type="hidden" name="firstNumber" value={firstNumber} />
          <input type="hidden" name="secondNumber" value={secondNumber} />
          <input type="hidden" name="operation" value={operator} />
          {/* Display the first number as an icon */}
          <FirstNumberIcon />
          {/* Display the operator icon */}
          {operator === "+" ? <TbPlus /> : <TbMinus />}
          {/* Display the second number as an icon */}
          <SecondNumberIcon />
          {/* Display equals sign as text (or use an icon if desired) */}
          <span>=</span>
        </div>
        <div className="mt-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Answer"
            required
            className="p-2 text-base border rounded w-full"
          />
        </div>
        <div className="mt-4">
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">
            Verify
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {verified && <p style={{ color: "green", marginTop: "1rem" }}>Captcha verified!</p>}
    </div>
  );
}
