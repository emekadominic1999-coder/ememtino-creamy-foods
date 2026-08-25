"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DRINK_OPTIONS, formatNaira, ICE_CREAM_OPTIONS, SHAWARMA_OPTIONS, TOAST_CATEGORIES } from "@/lib/menuData";
import { ToastCategory, ToastSize } from "@/lib/types";
import ToastCustomizer from "@/components/ToastCustomizer";
import SimpleItemGrid from "@/components/SimpleItemGrid";
import PopcornOrder from "@/components/PopcornOrder";

type Tab = "toast" | "popcorn" | "icecream" | "shawarma" | "drinks";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "toast", label: "Toast", emoji: "🍞" },
  { id: "popcorn", label: "Popcorn", emoji: "🍿" },
  { id: "icecream", label: "Ice Cream", emoji: "🍨" },
  { id: "shawarma", label: "Shawarma", emoji: "🌯" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
];

export default function MenuPage() {
  const [tab, setTab] = useState<Tab>("toast");
  const [category, setCategory] = useState<ToastCategory | null>(null);
  const [activeSize, setActiveSize] = useState<ToastSize | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="heading-accent pb-4 text-center font-display text-4xl font-bold text-toast-crust"
      >
        Build Your Order
      </motion.h1>
      <p className="mt-2 text-center text-toast-crust/60">Pick a category to get started</p>

      <div className="mt-8 flex justify-center gap-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setCategory(null);
            }}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "bg-brand-gold text-brand-ink shadow-md shadow-brand-gold/30"
                : "bg-cream-200 text-toast-crust border-2 border-toast-crust/10"
            }`}
          >
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "toast" && !category && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(TOAST_CATEGORIES) as ToastCategory[]).map((catId, i) => {
              const cat = TOAST_CATEGORIES[catId];
              return (
                <motion.button
                  key={catId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setCategory(catId)}
                  className="card p-8 text-left"
                >
                  <h3 className="font-display text-2xl font-bold text-toast-crust">{cat.label}</h3>
                  <p className="mt-2 text-sm text-toast-crust/70">{cat.content}</p>
                  <p className="mt-4 text-sm font-semibold text-brand-gold">
                    From {formatNaira(Math.min(...cat.sizes.map((s) => s.price)))}
                  </p>
                </motion.button>
              );
            })}
          </div>
        )}

        {tab === "toast" && category && (
          <div>
            <button
              onClick={() => setCategory(null)}
              className="mb-6 text-sm font-semibold text-brand-sky hover:underline"
            >
              ← Back to categories
            </button>
            <h3 className="font-display text-2xl font-bold text-toast-crust">
              {TOAST_CATEGORIES[category].label}
            </h3>
            <p className="text-sm text-toast-crust/60">{TOAST_CATEGORIES[category].content}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {TOAST_CATEGORIES[category].sizes.map((size, i) => (
                <motion.button
                  key={size.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveSize(size)}
                  className="card flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-toast-crust">{size.label}</span>
                  <span className="font-bold text-brand-gold">{formatNaira(size.price)}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {tab === "popcorn" && <PopcornOrder />}

        {tab === "icecream" && (
          <SimpleItemGrid kind="icecream" emoji="🍨" items={ICE_CREAM_OPTIONS} />
        )}

        {tab === "shawarma" && (
          <SimpleItemGrid kind="shawarma" emoji="🌯" items={SHAWARMA_OPTIONS} />
        )}

        {tab === "drinks" && (
          <SimpleItemGrid kind="drink" emoji="🥤" items={DRINK_OPTIONS} />
        )}
      </div>

      {activeSize && category && (
        <ToastCustomizer category={category} size={activeSize} onClose={() => setActiveSize(null)} />
      )}
    </div>
  );
}
