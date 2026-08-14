import type { Metadata } from "next";
import "./globals.css";
import { BUSINESS_NAME } from "@/lib/menuData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: BUSINESS_NAME,
  description:
    "Order fresh bread toast, popcorn and ice cream online from Ememtino Creamy Foods Venture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
