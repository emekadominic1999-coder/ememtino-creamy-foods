export type ToastCategory = "standard" | "special";

export interface ToastSize {
  id: string;
  label: string;
  eggs: number;
  price: number;
}

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export interface PopcornOption {
  id: string;
  label: string;
  price: number;
}

export interface IceCreamOption {
  id: string;
  label: string;
  price: number;
}

export type CartLineKind = "toast" | "popcorn" | "icecream";

export interface CartLine {
  lineId: string;
  kind: CartLineKind;
  name: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
  breakdown: string[];
}
