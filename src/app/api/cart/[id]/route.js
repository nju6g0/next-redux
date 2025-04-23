// app/api/cart/[id]/route.ts
import { NextResponse } from "next/server";

import { cartItems } from "@/lib/data";

// 修改 cart
export async function PUT(req, { params }) {
  const body = await req.json();
  const id = Number(params.id);
  const item = cartItems.find((t) => t.id === id);
  if (!item)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  item.id = body.id;
  item.title = body.title;
  item.description = body.description;
  item.price = body.price;
  item.count = body.count;
  item.imgUrl = body.imgUrl;
  item.subtotal = body.count * body.price;
  item.inStock = true;

  return NextResponse.json(item);
}

// 刪除 cart
export async function DELETE(_, { params }) {
  // try {
  //   const id = Number(params.id);
  //   const index = cartItems.findIndex((t) => t.id === id);

  //   if (index === -1) {
  //     return NextResponse.json({ message: "找不到此項目" }, { status: 404 });
  //   }

  //   cartItems.splice(index, 1); // 直接修改原陣列，不要重新賦值
  //   return NextResponse.json({ message: "刪除成功" });
  // } catch (error) {
  //   console.error("刪除錯誤：", error);
  //   return NextResponse.json({ message: "刪除失敗" }, { status: 500 });
  // }
  return NextResponse.json({ message: "刪除成功" });
}
