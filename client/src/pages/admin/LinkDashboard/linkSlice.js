import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getLinks = createAsyncThunk("link/getLinks", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "link",
    skip,
    limit,
    sort: "index",
    order: "asc",
  });
  return res.data;
});
const postLink = createAsyncThunk("link/postLink", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "link", data });
  return res.data;
});
const patchLink = createAsyncThunk("link/patchLink", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "link", id, data });
  return res.data;
});
const deleteLink = createAsyncThunk("link/deleteLink", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "link", id });
  return res.data;
});

const linkSlice = createSlice({
  name: "link",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getLinks.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((link) => filter.push(link._id));
      action.payload.forEach((link) => {
        if (!filter.includes(link._id)) {
          state.push(link);
        }
      });
      return state;
    });
    builder.addCase(postLink.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchLink.fulfilled, (state, action) => {
      return state.map((link) => (link._id === action.payload._id ? action.payload : link));
    });
    builder.addCase(deleteLink.fulfilled, (state, action) => {
      return state.filter((link) => link._id !== action.payload._id);
    });
  },
});

export { getLinks, postLink, patchLink, deleteLink };
export default linkSlice.reducer;
