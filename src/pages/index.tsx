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
    <div className={`${geistSans.className} ${geistMono.className} relative min-h-screen w-full overflow-hidden`}>
      <Image
        src="/background.svg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
    </div>
  );
}
