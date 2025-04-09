import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL_POST } from "@/lib/constants/common";

const initialState = {
  initialPosts: [],
  list: [],
  loading: true,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  pageSize: 12,
  endPoint: 0,
};
// ✳️ 取得所有 Posts
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await fetch(`${API_URL_POST}`);
  return await res.json();
});

// ✳️ 新增 Post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ title, body }) => {
    const newPost = {
      title,
      body,
      userId: 1,
    };
    const res = await fetch(API_URL_POST, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json(); // 回傳新增後的 Post
  }
);

// ✳️ 更新 Post
export const updatePost = createAsyncThunk("posts/updatePost", async (Post) => {
  // {
  //   id: 1,
  //   title: 'foo',
  //   body: 'bar',
  //   userId: 1,
  // }
  const res = await fetch(`${API_URL_POST}/${Post.id}`, {
    method: "PUT",
    body: JSON.stringify(Post),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json(); // 回傳更新後的 Post
});

// ✳️ 刪除 Post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${API_URL_POST}/${id}`, { method: "DELETE" });
  return id; // 回傳被刪除的 ID
});

// export const searchPost = createAsyncThunk(
//   "posts/searchPost",
//   async (keyword) => {
//     const res = await fetch(`${API_URL_POST}?search=${encodeURIComponent(keyword)}`);
//     return await res.json();
//   }
// );

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.initialPosts = action.payload;
      state.list = action.payload;
      state.loading = false;
    },
    setEndPoint: (state, action) => {
      state.endPoint = action.payload;
    },
    searchPost: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.list = state.initialPosts.filter(
        (t) => t.title.toLowerCase().includes(keyword) // ||
        // t.body.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder

      // 取得 Posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 新增 Post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 更新 Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.list.findIndex((Post) => Post.id === updated.id);
        if (index !== -1) {
          state.list[index] = updated;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 刪除 Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((Post) => Post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // 搜尋 Post
    // .addCase(searchPost.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(searchPost.fulfilled, (state, action) => {
    //   state.list = action.payload;
    //   state.loading = false;
    // })
    // .addCase(searchPost.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

export const { setPosts, setEndPoint, searchPost } = postSlice.actions;

export default postSlice.reducer;
