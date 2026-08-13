"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

interface PaystackButtonProps {
  email: string;
  amountKobo: number;
  disabled?: boolean;
  onSuccess: (reference: string) => void;
  label: string;
}

export default function PaystackButton({
  email,
  amountKobo,
  disabled,
  onSuccess,
  label,
}: PaystackButtonProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  function handlePay() {
    if (!publicKey) {
      alert("Online payment isn't configured yet — the site owner still needs to add a Paystack key.");
      return;
    }
    if (!window.PaystackPop) return;

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amountKobo,
      currency: "NGN",
      callback: (response: { reference: string }) => {
        onSuccess(response.reference);
      },
      onClose: () => {},
    });
    handler.openIframe();
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <button
        onClick={handlePay}
        disabled={disabled || !scriptReady}
        className="btn-primary w-full text-base"
      >
        {label}
      </button>
    </>
  );
}
