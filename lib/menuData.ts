import { AddOn, IceCreamOption, MenuItemOption, ToastCategory, ToastSize } from "./types";

export const BUSINESS_NAME = "Ememtino Creamy Foods Venture";
export const CONTACT_PHONE = "0906 124 1754";
export const CONTACT_PHONE_INTL = "2349061241754";

// Flat delivery fee — placeholder until the real amount is confirmed.
export const DELIVERY_FEE = 500;

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
  // Same lineup as Special Toast, with beef standing in for chicken. Priced
  // ₦400 above the matching Special Toast size since beef costs more than
  // chicken — placeholder premium until the real amount is confirmed.
  beef: {
    label: "Beef Toast",
    content: "Eggs, cream spread, sauce, beef and sausages",
    sizes: [
      { id: "full-4", label: "Full Loaf (4 eggs)", eggs: 4, price: 5000 },
      { id: "full-2", label: "Full Loaf (2 eggs)", eggs: 2, price: 4400 },
      { id: "twothirds-2", label: "2/3 Loaf (2 eggs)", eggs: 2, price: 3600 },
      { id: "half-1", label: "Half Loaf (1 egg)", eggs: 1, price: 2400 },
      { id: "third-1", label: "1/3 Loaf (1 egg)", eggs: 1, price: 2000 },
      { id: "quarter-1", label: "1/4 Loaf (1 egg)", eggs: 1, price: 1900 },
    ],
  },
};

// Extra chicken/sausage/egg prices are from the menu board photo. Sauce,
// cream spread and beef extras were added by request — placeholder prices
// until confirmed. Extra Beef is priced above Extra Chicken since beef
// costs more.
export const ADD_ONS: AddOn[] = [
  { id: "extra-egg", label: "Extra Egg", price: 400 },
  { id: "extra-chicken", label: "Extra Chicken", price: 500 },
  { id: "extra-beef", label: "Extra Beef", price: 700 },
  { id: "extra-sausage", label: "Extra Sausage", price: 400 },
  { id: "extra-sauce", label: "Extra Sauce", price: 300 },
  { id: "extra-cream-spread", label: "Extra Cream Spread", price: 300 },
];

// Popcorn is sold by amount, not fixed sizes — customer names their own price, ₦300 minimum.
export const POPCORN_MIN_PRICE = 300;
export const POPCORN_QUICK_AMOUNTS = [300, 500, 1000, 1500];

export const ICE_CREAM_OPTIONS: IceCreamOption[] = [
  { id: "icecream-small", label: "Small", price: 500 },
  { id: "icecream-medium", label: "Medium", price: 1000 },
  { id: "icecream-large", label: "Large", price: 1500 },
  { id: "icecream-xl", label: "Extra Large", price: 2000 },
];

// Placeholder lineup and prices — update once confirmed.
export const SHAWARMA_OPTIONS: MenuItemOption[] = [
  { id: "shawarma-regular", label: "Regular Shawarma", price: 1500 },
  { id: "shawarma-special", label: "Special Shawarma", price: 2000 },
];

// Placeholder lineup and prices — update once confirmed.
export const DRINK_OPTIONS: MenuItemOption[] = [
  { id: "drink-tigernut", label: "Tigernut Drink", price: 500, emoji: "🌰" },
  { id: "drink-zobo", label: "Zobo", price: 500, emoji: "🌺" },
  { id: "drink-soyamilk", label: "Soyamilk", price: 500, emoji: "🥛" },
  { id: "drink-nutrimilk", label: "Nutri Milk", price: 600, emoji: "🥛" },
  { id: "drink-nutriyo", label: "Nutri Yo", price: 600, emoji: "🥛" },
  { id: "drink-cola", label: "Coca-Cola", price: 400, emoji: "🥤" },
  { id: "drink-sprite", label: "Sprite", price: 400, emoji: "🥤" },
  { id: "drink-fanta", label: "Fanta", price: 400, emoji: "🥤" },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
