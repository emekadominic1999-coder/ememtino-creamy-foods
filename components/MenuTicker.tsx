import { formatNaira, ICE_CREAM_OPTIONS, POPCORN_MIN_PRICE, TOAST_CATEGORIES } from "@/lib/menuData";

interface TickerItem {
  emoji: string;
  label: string;
  price: number;
}

const ROW_A: TickerItem[] = [
  { emoji: "🍞", label: "Standard Toast — Full Loaf (4 eggs)", price: TOAST_CATEGORIES.standard.sizes[0].price },
  { emoji: "🍞", label: "Special Toast — Full Loaf (4 eggs)", price: TOAST_CATEGORIES.special.sizes[0].price },
  { emoji: "🍞", label: "Beef Toast — Full Loaf (4 eggs)", price: TOAST_CATEGORIES.beef.sizes[0].price },
  { emoji: "🍞", label: "Standard Toast — Half Loaf (1 egg)", price: TOAST_CATEGORIES.standard.sizes[5].price },
  { emoji: "🍿", label: "Popcorn — Name Your Price", price: POPCORN_MIN_PRICE },
];

const ROW_B: TickerItem[] = [
  { emoji: "🍞", label: "Special Toast — Half Loaf (1 egg)", price: TOAST_CATEGORIES.special.sizes[3].price },
  { emoji: "🍞", label: "Beef Toast — Half Loaf (1 egg)", price: TOAST_CATEGORIES.beef.sizes[3].price },
  { emoji: "🍞", label: "Standard Toast — 1/4 Loaf (1 egg)", price: TOAST_CATEGORIES.standard.sizes[7].price },
  ...ICE_CREAM_OPTIONS.map((i) => ({ emoji: "🍨", label: i.label, price: i.price })),
  { emoji: "🍞", label: "Special Toast — 1/3 Loaf (1 egg)", price: TOAST_CATEGORIES.special.sizes[4].price },
];

function TickerCard({ item }: { item: TickerItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-toast-crust/10 bg-cream-200 px-5 py-3 shadow-sm">
      <span className="text-2xl">{item.emoji}</span>
      <div>
        <p className="text-sm font-semibold text-toast-crust">{item.label}</p>
        <p className="text-xs font-bold text-brand-gold">{formatNaira(item.price)}</p>
      </div>
    </div>
  );
}

function TickerRow({ items, reverse }: { items: TickerItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
      {doubled.map((item, i) => (
        <TickerCard key={`${item.label}-${i}`} item={item} />
      ))}
    </div>
  );
}

export default function MenuTicker() {
  return (
    <div className="space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <TickerRow items={ROW_A} />
      <TickerRow items={ROW_B} reverse />
    </div>
  );
}
