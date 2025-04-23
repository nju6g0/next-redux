import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todosFromServer: [],
  filtered: [],
  loading: false,
};

// ✳️ 取得所有 Todos
export const fetchTodos = createAsyncThunk("todo/getTodos", async () => {
  const res = await fetch(`/api/todos`);
  return await res.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.filtered = action.payload;
    },
    getTodos: (state) => {
      state.filtered = state.todos;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.unshift(newTodo);
      state.filtered = state.todos;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      state.filtered = state.todos;
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        if (action.payload.title !== undefined)
          todo.title = action.payload.title;
        if (action.payload.completed !== undefined)
          todo.completed = action.payload.completed;
      }
      state.filtered = state.todos;
    },
    searchTodo: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.filtered = state.todos.filter((t) =>
        t.title.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // 取得 Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todosFromServer = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setTodos,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  searchTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
