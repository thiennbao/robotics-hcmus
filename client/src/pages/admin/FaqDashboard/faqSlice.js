import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getFaqs = createAsyncThunk("faq/getFaqs", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "faq",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const postFaq = createAsyncThunk("faq/postFaq", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "faq", data });
  return res.data;
});
const patchFaq = createAsyncThunk("faq/patchFaq", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "faq", id, data });
  return res.data;
});
const deleteFaq = createAsyncThunk("faq/deleteFaq", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "faq", id });
  return res.data;
});

const faqSlice = createSlice({
  name: "faq",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getFaqs.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((faq) => filter.push(faq._id));
      action.payload.forEach((faq) => {
        if (!filter.includes(faq._id)) {
          state.push(faq);
        }
      });
      return state;
    });
    builder.addCase(postFaq.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchFaq.fulfilled, (state, action) => {
      return state.map((faq) => (faq._id === action.payload._id ? action.payload : faq));
    });
    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      return state.filter((faq) => faq._id !== action.payload._id);
    });
  },
});

export { getFaqs, postFaq, patchFaq, deleteFaq };
export default faqSlice.reducer;
