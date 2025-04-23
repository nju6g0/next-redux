// app/api/todos/[id]/route.ts
import { NextResponse } from "next/server";

let todos = [
  { id: 1, title: "買牛奶", completed: false },
  { id: 2, title: "寫作業", completed: true },
];

// 修改 todo
export async function PUT(req, { params }) {
  const body = await req.json();
  const id = Number(params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  todo.title = body.title ?? todo.title;
  todo.completed = body.completed ?? todo.completed;

  return NextResponse.json(todo);
}

// 刪除 todo
export async function DELETE(_, { params }) {
  const id = Number(params.id);
  todos = todos.filter((t) => t.id !== id);
  return NextResponse.json({ message: "刪除成功" });
}
