import ReCaptcha from "@/components/common/captcha/captcha";
import { Suspense } from 'react'

import { verifyCaptcha } from "@/lib/actions/other/captcha-actions";
export default function Home() {
  return (
    <div>
      Main Page
        <ReCaptcha action={verifyCaptcha} onVerified={ console.log("verified")} />
    </div>
  );
}
