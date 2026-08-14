"use client";

import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSupabaseConfigured) {
      alert("Google sign-in isn't set up yet — the site owner still needs to add Supabase keys.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/menu` },
    });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-toast-crust/10 bg-cream-100 px-4 py-3 text-sm font-semibold text-toast-crust transition-colors hover:border-brand-sky/40 disabled:opacity-60"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5Z" />
        <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.5 0-13.9 4.2-17.2 10.4l-.5.3Z" />
        <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.7 34.3 27 35 24 35c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.9 39.6 16.4 44 24 44Z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.8l6.6 5.6C41.4 36.4 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5Z" />
      </svg>
      {loading ? "Connecting…" : "Sign in with Google"}
    </button>
  );
}
