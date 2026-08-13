"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line) =>
        set((state) => ({
          lines: [
            ...state.lines,
            { ...line, lineId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
          ],
        })),
      removeLine: (lineId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.lineId !== lineId) })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.lineId === lineId ? { ...l, quantity: Math.max(1, quantity) } : l
          ),
        })),
      clear: () => set({ lines: [] }),
      total: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "creamy-delight-cart" }
  )
);
