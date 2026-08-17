import type { Metadata } from "next";
import {
  Edu_TAS_Beginner,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const eduTasBeginner = Edu_TAS_Beginner({
  variable: "--font-edu-tas-beginner",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Yashika Mehndiratta — Frontend Developer",
  description: "Portfolio and frontend notes by Yashika Mehndiratta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${eduTasBeginner.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
