"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { BRAND_TAGLINE, BUSINESS_NAME } from "@/lib/menuData";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-brand-sky/10 bg-cream-50/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍞</span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-brand-sky sm:text-lg">
              {BUSINESS_NAME}
            </span>
            <span className="text-xs font-medium text-toast-crust/50">{BRAND_TAGLINE}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-toast-crust sm:flex">
          <Link href="/menu" className="transition-colors hover:text-brand-sky">
            Order Now
          </Link>
          <Link href="/account" className="transition-colors hover:text-brand-sky">
            My Account
          </Link>
          <Link href="/login" className="transition-colors hover:text-brand-sky">
            Sign In
          </Link>
        </nav>

        <Link href="/cart" className="relative">
          <span className="btn-secondary !px-4 !py-2 text-sm">
            🛒 Cart
            {mounted && count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-ink"
              >
                {count}
              </motion.span>
            )}
          </span>
        </Link>
      </div>
    </motion.header>
  );
}
