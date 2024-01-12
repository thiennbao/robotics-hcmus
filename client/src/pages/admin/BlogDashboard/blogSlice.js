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

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    patchBlog: (state, action) => {
      resourceApi.patchResource({ resource: "blog", ...action.payload });
      return state.map((blog) =>
        blog._id === action.payload.id
          ? { ...blog, _id: action.payload.id, ...action.payload.data }
          : blog
      );
    },
    deleteBlog: (state, action) => {
      resourceApi.deleteResource({ resource: "blog", ...action.payload });
      return state.filter((blog) => blog._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((blog) => {
          if (!filter.includes(blog._id)) {
            filter.push(blog._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getBlogs, postBlog };
export const { patchBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
