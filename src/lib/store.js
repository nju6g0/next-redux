import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/features/todo/todoSlice";
import postReducer from "@/features/post/postSlice";
import cartReducer from "@/features/cart/cartSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      todos: todoReducer,
      posts: postReducer,
      cart: cartReducer,
    },
  });

export default makeStore;
