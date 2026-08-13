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
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const addLine = useCartStore((s) => s.addLine);

  const addOnsTotal = useMemo(
    () => ADD_ONS.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  );
  const unitPrice = size.price + addOnsTotal;
  const total = unitPrice * quantity;

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleAddToCart() {
    const chosenAddOns = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
    addLine({
      kind: "toast",
      name: `${TOAST_CATEGORIES[category].label} — ${size.label}`,
      unitPrice,
      quantity,
      notes: notes.trim() || undefined,
      breakdown: [
        `Base: ${formatNaira(size.price)}`,
        ...chosenAddOns.map((a) => `${a.label}: +${formatNaira(a.price)}`),
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
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-gold">{TOAST_CATEGORIES[category].label}</p>
              <h3 className="font-display text-2xl font-bold text-toast-crust">{size.label}</h3>
              <p className="text-sm text-toast-crust/60">{formatNaira(size.price)} base</p>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-toast-crust/50 hover:bg-cream-200">
              ✕
            </button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">
              Add extras
            </h4>
            <div className="mt-3 space-y-2">
              {ADD_ONS.map((addOn) => {
                const checked = selectedAddOns.includes(addOn.id);
                return (
                  <label
                    key={addOn.id}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-4 py-3 transition-colors ${
                      checked ? "border-brand-red bg-brand-red/5" : "border-toast-crust/10"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="h-5 w-5 accent-brand-red"
                      />
                      <span className="font-medium text-toast-crust">{addOn.label}</span>
                    </span>
                    <span className="text-sm font-semibold text-toast-crust/70">
                      +{formatNaira(addOn.price)}
                    </span>
                  </label>
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
              className="mt-2 w-full rounded-2xl border-2 border-toast-crust/10 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
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
