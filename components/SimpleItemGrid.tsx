"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatNaira } from "@/lib/menuData";
import { CartLineKind } from "@/lib/types";
import { useCartStore } from "@/lib/cartStore";

export default function SimpleItemGrid({
  kind,
  emoji,
  items,
}: {
  kind: CartLineKind;
  emoji: string;
  items: { id: string; label: string; price: number }[];
}) {
  const addLine = useCartStore((s) => s.addLine);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  function handleAdd(item: { id: string; label: string; price: number }) {
    addLine({
      kind,
      name: item.label,
      unitPrice: item.price,
      quantity: 1,
      breakdown: [`${item.label}: ${formatNaira(item.price)}`],
    });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 900);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -4 }}
          className="card flex flex-col items-center gap-3 p-6 text-center"
        >
          <span className="text-4xl">{emoji}</span>
          <h4 className="font-bold text-toast-crust">{item.label}</h4>
          <p className="text-sm font-semibold text-toast-crust/70">{formatNaira(item.price)}</p>
          <button onClick={() => handleAdd(item)} className="btn-secondary w-full !py-2 text-sm">
            {justAdded === item.id ? "Added ✓" : "Add to Cart"}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
