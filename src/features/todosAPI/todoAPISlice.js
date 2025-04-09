import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL_TODO } from "@/lib/constants/common";

const initialState = {
  list: [],
  loading: true,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};
// ✳️ 取得所有 todos
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const res = await fetch(API_URL_TODO);
  return await res.json();
});

// ✳️ 新增 todo
export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json(); // 回傳新增後的 todo
});

// ✳️ 更新 todo
export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const res = await fetch(`/api/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json(); // 回傳更新後的 todo
});

// ✳️ 刪除 todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  return id; // 回傳被刪除的 ID
});

export const searchTodo = createAsyncThunk(
  "todos/searchTodo",
  async (keyword) => {
    const res = await fetch(`/api/todos?search=${encodeURIComponent(keyword)}`);
    return await res.json();
  }
);

const todoSlice = createSlice({
  name: "todosAPI",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    // searchTodo: (state, action) => {
    //   const keyword = action.payload.toLowerCase();
    //   state.filtered = state.todos.filter((t) =>
    //     t.title.toLowerCase().includes(keyword)
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder

      // 取得 todos
      .addCase(getTodos.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // 新增 todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // 更新 todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((todo) => todo.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      })

      // 刪除 todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })

      .addCase(searchTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTodo.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(searchTodo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setTodos,
  // searchTodo
} = todoSlice.actions;

export default todoSlice.reducer;
