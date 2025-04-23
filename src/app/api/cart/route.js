// app/api/cart/route.ts
import { NextResponse } from "next/server";

import { cartItems } from "@/lib/data";

// 取得 cart items
export async function GET() {
  return NextResponse.json(cartItems);
}

// 新增 item
export async function POST(req) {
  const body = await req.json();
  const newItem = {
    id: Date.now(),
    title: body.title,
    description: body.description,
    price: body.price,
    count: body.count,
    imgUrl: body.imgUrl,
    subtotal: body.count * body.price,
    inStock: true,
  };
  cartItems.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}
