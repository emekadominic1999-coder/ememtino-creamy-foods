import { BUSINESS_NAME, CONTACT_PHONE, CONTACT_PHONE_INTL } from "@/lib/menuData";

export default function Footer() {
  return (
    <footer className="border-t border-brand-sky/10 bg-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-sky">
          Get in touch
        </p>
        <h2 className="mt-1 text-center font-display text-2xl font-semibold text-toast-crust sm:text-3xl">
          We&apos;re ready when you are
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-toast-crust/10 bg-cream-200 p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-toast-crust">Order Online</h3>
            <p className="mt-1 text-sm text-toast-crust/60">Pickup or delivery — your choice at checkout.</p>
            <p className="mt-3 text-sm text-toast-crust/80">💳 Card, transfer &amp; Moniepoint accepted</p>
            <p className="mt-1 text-sm text-toast-crust/80">🕒 Fresh, made to order — every time</p>
          </div>

          <div className="rounded-2xl border border-toast-crust/10 bg-cream-200 p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-toast-crust">Contact Us</h3>
            <p className="mt-1 text-sm text-toast-crust/60">Questions about your order? Reach out anytime.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="rounded-full border border-toast-crust/10 bg-white px-4 py-1.5 text-sm font-semibold text-toast-crust transition-colors hover:border-brand-sky/40"
              >
                📞 {CONTACT_PHONE}
              </a>
              <a
                href={`https://wa.me/${CONTACT_PHONE_INTL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-1.5 text-sm font-semibold text-brand-green transition-colors hover:border-brand-green/40"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-toast-crust/10 pt-8 text-center">
          <h3 className="font-display text-lg font-bold text-brand-sky">{BUSINESS_NAME}</h3>
          <p className="text-sm text-toast-crust/60">Fresh bread toast, popcorn &amp; ice cream, made to order.</p>
          <p className="mt-4 text-xs text-toast-crust/40">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
