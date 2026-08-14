"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import PasswordInput from "@/components/PasswordInput";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError("Sign-in isn't set up yet — the site owner still needs to add Supabase keys.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/menu");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-md p-8"
      >
        <h1 className="font-display text-2xl font-bold text-toast-crust">Welcome Back! 👋</h1>
        <p className="mt-1 text-sm text-toast-crust/60">Sign in to continue your order.</p>

        <div className="mt-6">
          <GoogleSignInButton />
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-toast-crust/10" />
          <span className="text-xs font-semibold uppercase tracking-widest text-toast-crust/40">or</span>
          <div className="h-px flex-1 bg-toast-crust/10" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
          />
          <PasswordInput value={password} onChange={setPassword} required />

          {error && <p className="text-sm text-brand-red">{error}</p>}

          <div className="flex justify-end">
            <button type="button" className="text-xs font-semibold text-toast-crust/60 hover:text-brand-sky">
              Forgot Password?
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <Link href="/menu" className="btn-secondary mt-3 w-full">
          Continue as Guest
        </Link>

        <p className="mt-6 text-center text-sm text-toast-crust/60">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-brand-sky hover:underline">
            Get Started
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
