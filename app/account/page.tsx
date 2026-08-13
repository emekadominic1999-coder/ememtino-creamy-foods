"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import { formatNaira } from "@/lib/menuData";

interface OrderRow {
  id: string;
  created_at: string;
  total: number;
  status: string;
  fulfillment: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user ?? null);
      if (data.user) {
        const { data: orderData } = await supabase
          .from("orders")
          .select("id, created_at, total, status, fulfillment")
          .eq("user_id", data.user.id)
          .order("created_at", { ascending: false });
        setOrders(orderData ?? []);
      }
      setLoading(false);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return <div className="px-6 py-16 text-center text-toast-crust/60">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-toast-crust">My Account</h1>
        <p className="mt-2 text-toast-crust/60">Sign in to view your order history.</p>
        <Link href="/login" className="btn-primary mt-6 inline-flex">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-toast-crust">My Account</h1>
          <p className="text-sm text-toast-crust/60">{user.email}</p>
        </div>
        <button onClick={handleSignOut} className="btn-secondary !py-2 text-sm">
          Sign Out
        </button>
      </div>

      <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-toast-crust/60">
        Order History
      </h2>
      {orders.length === 0 ? (
        <p className="mt-3 text-toast-crust/60">No orders yet.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold text-toast-crust">
                  {new Date(o.created_at).toLocaleString()}
                </p>
                <p className="text-xs capitalize text-toast-crust/60">
                  {o.fulfillment} · {o.status}
                </p>
              </div>
              <span className="font-bold text-brand-red">{formatNaira(o.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
