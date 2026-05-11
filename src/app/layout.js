import { Geist, Geist_Mono, Newsreader, Fraunces } from "next/font/google";
import "./globals.css";
import CustomStyles from '../components/common/CustomStyles.js';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-editorial-serif",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "maanasgopi.com",
  description: "Maanas Gopi - CS + Econ + Phil @ UMD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
