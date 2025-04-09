import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/features/todo/todoSlice";
import todoAPIReducer from "@/features/todosAPI/todoAPISlice";

const makeStore = () =>
  configureStore({
    reducer: {
      todos: todoReducer,
      todosAPI: todoAPIReducer,
    },
  });

export default makeStore;
