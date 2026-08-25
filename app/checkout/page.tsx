"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { DELIVERY_FEE, formatNaira } from "@/lib/menuData";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import PaystackButton from "@/components/PaystackButton";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.total());

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (isSupabaseConfigured) {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user?.email) setEmail(data.user.email);
      });
    }
  }, []);

  const formValid = customerName.trim() && phone.trim() && email.trim() && (fulfillment === "pickup" || address.trim());

  async function handlePaymentSuccess(reference: string) {
    setSubmitting(true);
    setError(null);
    try {
      const { data } = isSupabaseConfigured ? await supabase.auth.getUser() : { data: { user: null } };
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          customerName,
          phone,
          email,
          fulfillment,
          address: fulfillment === "delivery" ? address : undefined,
          notes: notes || undefined,
          lines: [
            ...lines.map((l) => ({
              name: l.name,
              unitPrice: l.unitPrice,
              quantity: l.quantity,
              notes: l.notes,
            })),
            ...(deliveryFee > 0 ? [{ name: "Delivery fee", unitPrice: deliveryFee, quantity: 1 }] : []),
          ],
          total,
          userId: data.user?.id,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error ?? "Something went wrong confirming your order.");
        setSubmitting(false);
        return;
      }
      useCartStore.getState().clear();
      router.push(`/order/success?ref=${reference}`);
    } catch {
      setError("Network error while confirming your order. Your payment succeeded — please contact us with your reference.");
      setSubmitting(false);
    }
  }

  if (!mounted) return null;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <p className="text-5xl">🧺</p>
        <p className="mt-4 text-toast-crust/60">Your cart is empty.</p>
        <Link href="/menu" className="btn-primary mt-6 inline-flex">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl font-bold text-toast-crust"
      >
        Checkout
      </motion.h1>

      <div className="card mt-6 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">Order Summary</h2>
        <div className="mt-3 space-y-2">
          {lines.map((l) => (
            <div key={l.lineId} className="flex justify-between text-sm">
              <span className="text-toast-crust/80">
                {l.quantity}× {l.name}
              </span>
              <span className="font-semibold text-toast-crust">{formatNaira(l.unitPrice * l.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm">
            <span className="text-toast-crust/80">Subtotal</span>
            <span className="font-semibold text-toast-crust">{formatNaira(subtotal)}</span>
          </div>
          {fulfillment === "delivery" && (
            <div className="flex justify-between text-sm">
              <span className="text-toast-crust/80">Delivery fee</span>
              <span className="font-semibold text-toast-crust">{formatNaira(deliveryFee)}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between border-t border-toast-crust/10 pt-4">
          <span className="font-bold text-toast-crust">Total</span>
          <span className="text-xl font-bold text-brand-gold">{formatNaira(total)}</span>
        </div>
      </div>

      <form className="card mt-6 space-y-4 p-6" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-sm font-bold uppercase tracking-wide text-toast-crust/60">Your Details</h2>
        <input
          required
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
        />
        <input
          required
          placeholder="WhatsApp / Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFulfillment("pickup")}
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-semibold ${
              fulfillment === "pickup" ? "border-brand-sky bg-brand-sky/10 text-brand-sky" : "border-toast-crust/10 text-toast-crust"
            }`}
          >
            Pickup
          </button>
          <button
            type="button"
            onClick={() => setFulfillment("delivery")}
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-semibold ${
              fulfillment === "delivery" ? "border-brand-sky bg-brand-sky/10 text-brand-sky" : "border-toast-crust/10 text-toast-crust"
            }`}
          >
            Delivery <span className="text-xs font-normal opacity-70">(+{formatNaira(DELIVERY_FEE)})</span>
          </button>
        </div>

        {fulfillment === "delivery" && (
          <input
            required
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
          />
        )}

        <textarea
          placeholder="Order notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
        />

        {error && <p className="text-sm text-brand-red">{error}</p>}

        <PaystackButton
          email={email}
          amountKobo={Math.round(total * 100)}
          disabled={!formValid || submitting}
          onSuccess={handlePaymentSuccess}
          label={submitting ? "Confirming order…" : `Pay ${formatNaira(total)}`}
        />
      </form>
    </div>
  );
}
