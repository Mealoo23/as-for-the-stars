import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import BirthChartForm from "@/components/BirthChartForm";

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
    <div className={`${geistSans.className} ${geistMono.className} relative min-h-screen`}>
      <img
        src="/background.png"
        alt="Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <BirthChartForm />
    </div>
  );
}
