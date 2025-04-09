import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/features/todo/todoSlice";
import postReducer from "@/features/post/postSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      todos: todoReducer,
      posts: postReducer,
    },
  });

export default makeStore;
