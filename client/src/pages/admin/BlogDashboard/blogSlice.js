import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getBlogs = createAsyncThunk("blog/getBlogs", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "blog",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const postBlog = createAsyncThunk("blog/postBlog", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "blog", data });
  return res.data;
});
const patchBlog = createAsyncThunk("blog/patchBlog", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "blog", id, data });
  return res.data;
});
const deleteBlog = createAsyncThunk("blog/deleteBlog", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "blog", id });
  return res.data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((blog) => filter.push(blog._id));
      action.payload.forEach((blog) => {
        if (!filter.includes(blog._id)) {
          state.push(blog);
        }
      });
      return state;
    });
    builder.addCase(postBlog.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchBlog.fulfilled, (state, action) => {
      return state.map((blog) => (blog._id === action.payload._id ? action.payload : blog));
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      return state.filter((blog) => blog._id !== action.payload._id);
    });
  },
});

export { getBlogs, postBlog, patchBlog, deleteBlog };
export default blogSlice.reducer;
