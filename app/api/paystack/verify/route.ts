import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface OrderLinePayload {
  name: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
}

interface VerifyPayload {
  reference: string;
  customerName: string;
  phone: string;
  email: string;
  fulfillment: "pickup" | "delivery";
  address?: string;
  notes?: string;
  lines: OrderLinePayload[];
  total: number;
  userId?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as VerifyPayload;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack secret key not configured on server." }, { status: 500 });
  }

  const verifyRes = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(body.reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );
  const verifyData = await verifyRes.json();

  if (!verifyRes.ok || verifyData?.data?.status !== "success") {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const paidKobo = verifyData.data.amount as number;
  if (paidKobo < Math.round(body.total * 100)) {
    return NextResponse.json({ error: "Paid amount does not match order total." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ reference: body.reference, saved: false });
  }

  const admin = createClient(supabaseUrl, serviceKey);

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: body.userId ?? null,
      customer_name: body.customerName,
      phone: body.phone,
      email: body.email,
      fulfillment: body.fulfillment,
      address: body.address ?? null,
      notes: body.notes ?? null,
      total: body.total,
      status: "paid",
      payment_reference: body.reference,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  const itemRows = body.lines.map((line) => ({
    order_id: order.id,
    name: line.name,
    unit_price: line.unitPrice,
    quantity: line.quantity,
    notes: line.notes ?? null,
  }));

  await admin.from("order_items").insert(itemRows);

  return NextResponse.json({ reference: body.reference, saved: true, orderId: order.id });
}
