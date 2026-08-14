import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { BUSINESS_NAME } from "@/lib/menuData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: BUSINESS_NAME,
  description:
    "Order fresh bread toast, popcorn and ice cream online from Ememtino Creamy Foods Venture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fredoka.variable}>
      <body className="flex min-h-screen flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
