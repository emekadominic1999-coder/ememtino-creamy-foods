"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BUSINESS_NAME } from "@/lib/menuData";
import MenuTicker from "@/components/MenuTicker";

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
      <section className="relative isolate overflow-hidden bg-brand-navy px-4 pb-16 pt-20 text-white sm:px-6 sm:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-gold backdrop-blur"
            >
              Fresh · Made to order · Delivered
            </motion.span>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl"
            >
              <span className="bg-gradient-to-r from-brand-sky to-brand-gold bg-clip-text text-transparent">
                {BUSINESS_NAME}
              </span>
              <span className="mt-2 block text-2xl text-brand-gold sm:text-3xl">
                Toast. Popcorn. Ice Cream.
              </span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="mt-4 max-w-md text-lg text-white/70">
              Build your perfect loaf, pick your extras, and order online — ready for pickup or
              delivery.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-primary">
                Order Now →
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-gold/50 hover:bg-brand-gold/10"
              >
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
            <div className="absolute inset-0 rounded-full bg-brand-gold/15 blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative text-[9rem] drop-shadow-[0_0_45px_rgba(255,204,0,0.4)] sm:text-[11rem]"
            >
              🍞
            </motion.div>
            <span className="absolute -right-2 top-4 animate-steam text-4xl opacity-70">〰️</span>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-sky">
            On the menu
          </p>
          <h2 className="mt-1 text-center font-display text-2xl font-semibold text-toast-crust sm:text-3xl">
            Today&apos;s picks, moving fast
          </h2>
          <div className="mt-8">
            <MenuTicker />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-accent pb-4 text-center font-display text-3xl font-bold text-toast-crust"
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
