"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError("Sign-up isn't set up yet — the site owner still needs to add Supabase keys.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-md p-8"
      >
        <h1 className="font-display text-2xl font-bold text-toast-crust">Create Your Account</h1>
        <p className="mt-1 text-sm text-toast-crust/60">
          Sign up to save your details and track your orders.
        </p>

        {done ? (
          <p className="mt-6 rounded-2xl bg-brand-green/10 p-4 text-sm text-brand-green">
            Account created! Check your email to confirm, then sign in.
          </p>
        ) : (
          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border-2 border-toast-crust/10 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-toast-crust/10 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-toast-crust/10 px-4 py-3 text-sm outline-none focus:border-brand-red/50"
            />

            {error && <p className="text-sm text-brand-red">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account…" : "Get Started"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-toast-crust/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-red hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
