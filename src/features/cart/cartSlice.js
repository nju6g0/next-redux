import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
};

// ✳️ 取得所有 cart items
export const fetchItems = createAsyncThunk("cart/getItems", async () => {
  const res = await fetch(`/api/cart`);
  return await res.json();
});

const todoSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      // 取得 Todos
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
