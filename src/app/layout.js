import { Inter } from "next/font/google";
import "./globals.css";
import DarkModeSwitch from "@/components/design/ui/dark-mode-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reason Of Hope",
  description: "A blog about hope and faith in Jesus Christ.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <DarkModeSwitch>{children}</DarkModeSwitch>
      </body>
    </html>
  );
}
