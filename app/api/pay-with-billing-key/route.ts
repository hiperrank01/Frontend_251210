import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { billingKey, orderName, amount, currency, customer } =
    await req.json();

  const paymentId = `pay${crypto.randomUUID().replace(/-/g, "").slice(0, 36)}`;

  const res = await fetch(
    `https://api.portone.io/payments/${encodeURIComponent(paymentId)}/billing-key`,
    {
      method: "POST",
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billingKey,
        orderName,
        amount: { total: amount },
        currency: currency || "KRW",
        customer: {
          id: customer?.customerId,
          name: { full: customer?.fullName },
          email: customer?.email,
          phoneNumber: customer?.phoneNumber,
        },
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.message || "결제 실패", detail: data },
      { status: res.status },
    );
  }

  return NextResponse.json({ paymentId, ...data });
}
