import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filtered: [],
  loading: false,
};

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
