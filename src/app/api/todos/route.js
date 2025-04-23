// app/api/todos/route.ts
import { NextResponse } from "next/server";

let todos = [
  { id: 1, title: "買牛奶", completed: false },
  { id: 2, title: "寫作業", completed: true },
];

// 取得 todos
export async function GET() {
  return NextResponse.json(todos);
}

// 新增 todo
export async function POST(req) {
  const body = await req.json();
  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
