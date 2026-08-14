import { BRAND_TAGLINE, BUSINESS_NAME, CONTACT_PHONE } from "@/lib/menuData";

export default function Footer() {
  return (
    <footer className="border-t border-brand-sky/10 bg-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-bold text-brand-sky">{BUSINESS_NAME}</h3>
            <p className="mt-2 text-sm text-toast-crust/80">{BRAND_TAGLINE}</p>
            <p className="mt-1 text-sm text-toast-crust/70">
              Fresh bread toast, popcorn &amp; ice cream, made to order.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-toast-crust">Contact</h4>
            <p className="mt-2 text-sm text-toast-crust/80">📞 {CONTACT_PHONE}</p>
            <p className="mt-1 text-sm text-toast-crust/80">💳 Card, transfer &amp; Moniepoint accepted</p>
          </div>
          <div>
            <h4 className="font-semibold text-toast-crust">Order</h4>
            <p className="mt-2 text-sm text-toast-crust/80">
              Order online for pickup or delivery — pay securely at checkout.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-toast-crust/50">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
