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

// ✳️ 新增 Item
export const addItem = createAsyncThunk("cart/addItem", async () => {
  const newItem = {
    id: Date.now(),
    title: "國讀然不考法",
    description:
      "加創汽企變稱情世，生起光北？次經直電計影不世成得數。民一產，回極乎上著向，演方合：造星就動無。個美者前親是統國時資媽是樣失流止。它兒無。",
    price: 999,
    count: 1,
    imgUrl: "https://picsum.photos/id/${randomImgID}/200/300",
    subtotal: 999,
    inStock: true,
  };
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(newItem),
    headers: { "Content-Type": "application/json" },
  });

  return await res.json(); // 回傳新增後的 Post
});

// ✳️ 刪除 Item
export const deleteItem = createAsyncThunk("cart/deleteItem", async (id) => {
  const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
  return id; // 回傳被刪除的 ID
});

const todoSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      // 取得 所有 cart items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      })
      // 新增 cart item
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
