import { AddOn, IceCreamOption, PopcornOption, ToastCategory, ToastSize } from "./types";

export const BUSINESS_NAME = "Ememtino Creamy Foods Venture";
export const CONTACT_PHONE = "0906 124 1754";
export const CONTACT_PHONE_INTL = "2349061241754";

export const TOAST_CATEGORIES: Record<
  ToastCategory,
  { label: string; content: string; sizes: ToastSize[] }
> = {
  standard: {
    label: "Standard Toast",
    content: "Eggs, cream spread, sauce",
    sizes: [
      { id: "full-4", label: "Full Loaf (4 eggs)", eggs: 4, price: 3200 },
      { id: "full-2", label: "Full Loaf (2 eggs)", eggs: 2, price: 2400 },
      { id: "twothirds-4", label: "2/3 Loaf (4 eggs)", eggs: 4, price: 2600 },
      { id: "twothirds-2", label: "2/3 Loaf (2 eggs)", eggs: 2, price: 1800 },
      { id: "half-2", label: "Half Loaf (2 eggs)", eggs: 2, price: 1600 },
      { id: "half-1", label: "Half Loaf (1 egg)", eggs: 1, price: 1200 },
      { id: "third-1", label: "1/3 Loaf (1 egg)", eggs: 1, price: 900 },
      { id: "quarter-1", label: "1/4 Loaf (1 egg)", eggs: 1, price: 800 },
    ],
  },
  special: {
    label: "Special Toast",
    content: "Eggs, cream spread, sauce, chicken and sausages",
    sizes: [
      { id: "full-4", label: "Full Loaf (4 eggs)", eggs: 4, price: 4600 },
      { id: "full-2", label: "Full Loaf (2 eggs)", eggs: 2, price: 4000 },
      { id: "twothirds-2", label: "2/3 Loaf (2 eggs)", eggs: 2, price: 3200 },
      { id: "half-1", label: "Half Loaf (1 egg)", eggs: 1, price: 2000 },
      { id: "third-1", label: "1/3 Loaf (1 egg)", eggs: 1, price: 1600 },
      { id: "quarter-1", label: "1/4 Loaf (1 egg)", eggs: 1, price: 1500 },
    ],
  },
};

export const ADD_ONS: AddOn[] = [
  { id: "extra-chicken", label: "Extra Chicken", price: 500 },
  { id: "extra-sausage", label: "Extra Sausage", price: 400 },
  { id: "extra-egg", label: "Extra Egg", price: 400 },
];

// Popcorn flavours/prices from the menu board start at ₦300 — update sizes/prices
// once exact flavours are confirmed.
export const POPCORN_OPTIONS: PopcornOption[] = [
  { id: "popcorn-small", label: "Small Pack", price: 300 },
  { id: "popcorn-medium", label: "Medium Pack", price: 500 },
  { id: "popcorn-large", label: "Large Pack", price: 800 },
];

// Placeholder ice cream lineup — update flavours/prices to match what you actually stock.
export const ICE_CREAM_OPTIONS: IceCreamOption[] = [
  { id: "icecream-cup", label: "Regular Cup", price: 700 },
  { id: "icecream-double", label: "Double Scoop Cup", price: 1200 },
  { id: "icecream-cone", label: "Cone", price: 600 },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
