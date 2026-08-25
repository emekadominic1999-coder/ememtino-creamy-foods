"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ADD_ONS, formatNaira, TOAST_CATEGORIES } from "@/lib/menuData";
import { ToastCategory, ToastSize } from "@/lib/types";
import { useCartStore } from "@/lib/cartStore";

export default function ToastCustomizer({
  category,
  size,
  onClose,
}: {
  category: ToastCategory;
  size: ToastSize;
  onClose: () => void;
}) {
  const [addOnQuantities, setAddOnQuantities] = useState<Record<string, number>>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const addLine = useCartStore((s) => s.addLine);

  const addOnsTotal = useMemo(
    () => ADD_ONS.reduce((sum, a) => sum + (addOnQuantities[a.id] ?? 0) * a.price, 0),
    [addOnQuantities]
  );
  const unitPrice = size.price + addOnsTotal;
  const total = unitPrice * quantity;

  function setAddOnQuantity(id: string, qty: number) {
    setAddOnQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  }

  function handleAddToCart() {
    const chosenAddOns = ADD_ONS.filter((a) => (addOnQuantities[a.id] ?? 0) > 0);
    addLine({
      kind: "toast",
      name: `${TOAST_CATEGORIES[category].label} — ${size.label}`,
      unitPrice,
      quantity,
      notes: notes.trim() || undefined,
      breakdown: [
        `Base: ${formatNaira(size.price)}`,
        ...chosenAddOns.map((a) => {
          const qty = addOnQuantities[a.id] ?? 0;
          return `${a.label} x${qty}: +${formatNaira(a.price * qty)}`;
        }),
      ],
    });
    setAdded(true);
    setTimeout(onClose, 700);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-toast-crust/10 bg-cream-200 p-6 shadow-2xl sm:rounded-3xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-sky">{TOAST_CATEGORIES[category].label}</p>
              <h3 className="font-display text-2xl font-bold text-toast-crust">{size.label}</h3>
              <p className="text-sm text-toast-crust/60">{formatNaira(size.price)} base</p>
              <p className="mt-1 text-sm text-toast-crust/70">
                Includes: {TOAST_CATEGORIES[category].content}
              </p>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-toast-crust/50 hover:bg-toast-crust/10">
              ✕
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">
              Add extras
            </h4>
            <p className="mt-1 text-xs text-toast-crust/50">
              Your base already includes {TOAST_CATEGORIES[category].content.toLowerCase()} — these add
              more on top.
            </p>
            <div className="mt-3 space-y-2">
              {ADD_ONS.map((addOn) => {
                const qty = addOnQuantities[addOn.id] ?? 0;
                return (
                  <div
                    key={addOn.id}
                    className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 transition-colors ${
                      qty > 0 ? "border-brand-sky bg-brand-sky/5" : "border-toast-crust/10"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-toast-crust">{addOn.label}</p>
                      <p className="text-xs text-toast-crust/50">+{formatNaira(addOn.price)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAddOnQuantity(addOn.id, qty - 1)}
                        disabled={qty === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-toast-crust/20 text-lg font-bold text-toast-crust disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-bold text-toast-crust">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setAddOnQuantity(addOn.id, qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-toast-crust/20 text-lg font-bold text-toast-crust"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">
              Special instructions
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. no sauce, extra spicy"
              rows={2}
              className="mt-2 w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">Quantity</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-toast-crust/20 text-lg font-bold text-toast-crust"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-toast-crust">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-toast-crust/20 text-lg font-bold text-toast-crust"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className="btn-primary mt-8 w-full text-base"
          >
            {added ? "Added! ✓" : `Add to Cart — ${formatNaira(total)}`}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
