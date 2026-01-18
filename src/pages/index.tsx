import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

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
    <div className={`${geistSans.className} ${geistMono.className}`} style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <img
        src="/background.svg"
        alt="Background"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
}
