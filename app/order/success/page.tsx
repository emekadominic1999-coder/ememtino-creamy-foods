"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT_PHONE } from "@/lib/menuData";

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md px-4 py-20 text-center sm:px-6"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.6 }}
        className="text-6xl"
      >
        ✅
      </motion.div>
      <h1 className="mt-6 font-display text-3xl font-bold text-toast-crust">Order Confirmed!</h1>
      <p className="mt-2 text-toast-crust/70">
        Thanks for your order — we&apos;re getting it ready. You&apos;ll be contacted at the phone
        number you provided.
      </p>
      {ref && <p className="mt-4 text-xs text-toast-crust/50">Reference: {ref}</p>}
      <p className="mt-2 text-sm text-toast-crust/60">
        Questions? Call/WhatsApp us on {CONTACT_PHONE}.
      </p>
      <Link href="/menu" className="btn-primary mt-8 inline-flex">
        Order Again
      </Link>
    </motion.div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
