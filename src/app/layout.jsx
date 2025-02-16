'use client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/common/google-analytics';
import { Markazi_Text, Roboto, Geist, Geist_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import { ThemeProvider } from 'next-themes'
import { LayoverGlobalProvider } from "@/context/layover/LayoverGlobalContext";
import { PreferencesGlobalProvider } from '@/context/preferences/PreferencesGlobalContext';
import MainFooter from "@/components/common/ui/main-footer";
import { useEffect } from "react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const markazi_text = Markazi_Text(
  {
    weight: ['400', '500', '600', '700'],
    subsets: ['arabic'],
    display: 'swap',
  }
);

const roboto = Roboto(
  {
    weight: ['100', '300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  }
);

// export const metadata = {
//   title: "Reason Of Hope | WWU",
//   description: "Together we provide what is needed to help people to access The Word of God and understand it for themselves.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={` scroll-smooth ${markazi_text.className} relative`}>
      <body className="uni-background transition-all duration-200">
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <PreferencesGlobalProvider>
            <LayoverGlobalProvider>
              {/* <div className="flex flex-col items-center justify-center min-h-[90vh]"> */}
              {/* <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
              {/* <LayOverSection /> */}
              {children}
              {/* </div> */}
              {/* </div> */}
            </LayoverGlobalProvider>
          </PreferencesGlobalProvider>
        </ThemeProvider>
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
        {/* <MainFooter /> */}
      </body>
    </html>
  );
}
