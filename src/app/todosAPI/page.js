import { API_URL_TODO } from "@/lib/constants/common";

import TodoClient from "./todoAPIClient";

async function fetchTodos() {
  const res = await fetch(
    // SSG(在 build time 生成 HTML 檔與 json): next.js 預設的 render 方式，只要不 cache 就會是 SSG
    // 若設定 no-store，則會在每次請求時都會重新 fetch 資料 => SSR
    API_URL_TODO,
    {
      cache: "no-store",
      // ISR: 在 build time 生成 HTML 檔與 json，並在 request 之後一段時間重新生成。
      next: { revalidate: 10 }, // User request 到來的 10 秒後重新 build 一次這個頁面，並且在這 10 秒內的所有 request 都會用 cache 的資料，直到超過 10 秒後才會用新的資料
    }
  );
  return res.json();
}

export default async function TodoPage() {
  const todos = await fetchTodos();

  return <TodoClient initialTodos={todos} />;
}
