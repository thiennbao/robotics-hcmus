import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getTestimonials = createAsyncThunk("testimonial/getTestimonials", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "testimonial",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const postTestimonial = createAsyncThunk("testimonial/postTestimonial", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "testimonial", data });
  return res.data;
});
const patchTestimonial = createAsyncThunk("testimonial/patchTestimonial", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "testimonial", id, data });
  return res.data;
});
const deleteTestimonial = createAsyncThunk("testimonial/deleteTestimonial", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "testimonial", id });
  return res.data;
});

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getTestimonials.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((testimonial) => filter.push(testimonial._id));
      action.payload.forEach((testimonial) => {
        if (!filter.includes(testimonial._id)) {
          state.push(testimonial);
        }
      });
      return state;
    });
    builder.addCase(postTestimonial.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchTestimonial.fulfilled, (state, action) => {
      return state.map((testimonial) => (testimonial._id === action.payload._id ? action.payload : testimonial));
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      return state.filter((testimonial) => testimonial._id !== action.payload._id);
    });
  },
});

export { getTestimonials, postTestimonial, patchTestimonial, deleteTestimonial };
export default testimonialSlice.reducer;
