import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
///import BirthChartForm from "../components/BirthChartForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className}`}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <BirthChartForm /> */}
      </main>
    </div>
  );
}
