"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import PasswordInput from "@/components/PasswordInput";
import GoogleSignInButton from "@/components/GoogleSignInButton";

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
          <>
            <div className="mt-6">
              <GoogleSignInButton />
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-toast-crust/10" />
              <span className="text-xs font-semibold uppercase tracking-widest text-toast-crust/40">or</span>
              <div className="h-px flex-1 bg-toast-crust/10" />
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm text-toast-crust outline-none placeholder:text-toast-crust/40 focus:border-brand-sky/50"
              />
              <PasswordInput value={password} onChange={setPassword} required minLength={6} />

              {error && <p className="text-sm text-brand-red">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Creating account…" : "Get Started"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-toast-crust/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-sky hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
