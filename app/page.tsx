"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND_NAME } from "@/lib/menuData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const HIGHLIGHTS = [
  {
    emoji: "🍞",
    title: "Standard & Special Toast",
    desc: "Eggs, cream spread and sauce — or go special with chicken and sausages.",
  },
  { emoji: "🍿", title: "Popcorn", desc: "Freshly popped, from ₦300." },
  { emoji: "🍨", title: "Ice Cream", desc: "Cool down with a cup or cone." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-block rounded-full bg-brand-gold/20 px-4 py-1 text-sm font-semibold text-brand-gold"
            >
              Fresh · Made to order · Delivered
            </motion.span>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-4 font-display text-4xl font-bold leading-tight text-toast-crust sm:text-5xl"
            >
              {BRAND_NAME}
              <span className="block text-brand-red">Toast. Popcorn. Ice Cream.</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="mt-4 max-w-md text-lg text-toast-crust/70">
              Build your perfect loaf, pick your extras, and order online — ready for pickup or
              delivery.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-primary">
                Order Now →
              </Link>
              <Link href="/menu" className="btn-secondary">
                View Menu
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
          >
            <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-3xl" />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative text-[9rem] sm:text-[11rem]">
              🍞
            </motion.div>
            <span className="absolute -right-2 top-4 animate-steam text-4xl opacity-70">〰️</span>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-3xl font-bold text-toast-crust"
          >
            What we serve
          </motion.h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="card p-8 text-center"
              >
                <div className="text-5xl">{h.emoji}</div>
                <h3 className="mt-4 text-lg font-bold text-toast-crust">{h.title}</h3>
                <p className="mt-2 text-sm text-toast-crust/70">{h.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/menu" className="btn-primary">
              Start Your Order →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
