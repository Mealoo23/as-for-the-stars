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
  const starButton = (
    <button>
      <img src="/star-button.png" alt="Star Button" />
    </button>
  );

  const buttons = Array.from({length: 5}, (_, index) => (
    <div key={index} className="fixed right-4 top-{index * 50}px">
      {starButton}
    </div>
  ));

  return (
    <div className={`${geistSans.className} ${geistMono.className}`}>
      <img
        src="/background1.png"
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24 relative z-10">
        {buttons}
      </main>
    </div>
  );
}