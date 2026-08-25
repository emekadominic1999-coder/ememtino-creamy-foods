"use client";

import { useState } from "react";
import { formatNaira, POPCORN_MIN_PRICE, POPCORN_QUICK_AMOUNTS } from "@/lib/menuData";
import { useCartStore } from "@/lib/cartStore";

export default function PopcornOrder() {
  const [amount, setAmount] = useState<number>(POPCORN_MIN_PRICE);
  const [added, setAdded] = useState(false);
  const addLine = useCartStore((s) => s.addLine);

  const valid = amount >= POPCORN_MIN_PRICE;

  function handleAdd() {
    if (!valid) return;
    addLine({
      kind: "popcorn",
      name: `Popcorn (${formatNaira(amount)})`,
      unitPrice: amount,
      quantity: 1,
      breakdown: [`Popcorn: ${formatNaira(amount)}`],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }

  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <span className="text-5xl">🍿</span>
      <h3 className="mt-4 text-lg font-bold text-toast-crust">Name Your Popcorn</h3>
      <p className="mt-1 text-sm text-toast-crust/60">
        Order as much or as little as you like — {formatNaira(POPCORN_MIN_PRICE)} minimum.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {POPCORN_QUICK_AMOUNTS.map((quick) => (
          <button
            key={quick}
            type="button"
            onClick={() => setAmount(quick)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              amount === quick
                ? "border-brand-sky bg-brand-sky/10 text-brand-sky"
                : "border-toast-crust/10 text-toast-crust"
            }`}
          >
            {formatNaira(quick)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-widest text-toast-crust/50">
          Or enter a custom amount
        </label>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-toast-crust">₦</span>
          <input
            type="number"
            min={POPCORN_MIN_PRICE}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-32 rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-2 text-center text-lg font-bold text-toast-crust outline-none focus:border-brand-sky/50"
          />
        </div>
        {!valid && (
          <p className="mt-2 text-xs text-brand-red">Minimum order is {formatNaira(POPCORN_MIN_PRICE)}.</p>
        )}
      </div>

      <button onClick={handleAdd} disabled={!valid} className="btn-primary mt-6 w-full">
        {added ? "Added ✓" : `Add to Cart — ${formatNaira(valid ? amount : POPCORN_MIN_PRICE)}`}
      </button>
    </div>
  );
}
