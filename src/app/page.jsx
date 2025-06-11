"use client";
import ReCaptcha from "@/components/common/captcha/captcha";
import { verifyCaptcha } from "@/lib/actions/other/captcha-actions";

export default function Home() {
  const handleVerified = () => {
    console.log("verified");
    // You can also update local state here.
  };

  return (
    <div>
      Main Page
      <ReCaptcha action={verifyCaptcha} onVerified={handleVerified} />
    </div>
  );
}
