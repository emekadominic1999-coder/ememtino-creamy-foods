"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { formatNaira } from "@/lib/menuData";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const removeLine = useCartStore((s) => s.removeLine);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.total());

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-toast-crust">Your Cart</h1>

      {lines.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-5xl">🛒</p>
          <p className="mt-4 text-toast-crust/60">Your cart is empty.</p>
          <Link href="/menu" className="btn-primary mt-6 inline-flex">
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            <AnimatePresence>
              {lines.map((line) => (
                <motion.div
                  key={line.lineId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-bold text-toast-crust">{line.name}</h3>
                    <ul className="mt-1 text-xs text-toast-crust/60">
                      {line.breakdown.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {line.notes && (
                      <p className="mt-1 text-xs italic text-toast-crust/50">Note: {line.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-toast-crust/20 font-bold text-toast-crust"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-semibold">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-toast-crust/20 font-bold text-toast-crust"
                      >
                        +
                      </button>
                    </div>
                    <span className="w-20 text-right font-bold text-brand-red">
                      {formatNaira(line.unitPrice * line.quantity)}
                    </span>
                    <button
                      onClick={() => removeLine(line.lineId)}
                      className="text-toast-crust/40 hover:text-brand-red"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="card mt-8 flex items-center justify-between p-6">
            <span className="text-lg font-bold text-toast-crust">Total</span>
            <span className="text-2xl font-bold text-brand-red">{formatNaira(total)}</span>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link href="/menu" className="btn-secondary">
              ← Add More Items
            </Link>
            <Link href="/checkout" className="btn-primary">
              Proceed to Checkout →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
