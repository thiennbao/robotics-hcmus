import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getCourses = createAsyncThunk("course/getCourses", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "course",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const postCourse = createAsyncThunk("course/postCourse", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "course", data });
  return res.data;
});
const patchCourse = createAsyncThunk("course/patchCourse", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "course", id, data });
  return res.data;
});
const deleteCourse = createAsyncThunk("course/deleteCourse", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "course", id });
  return res.data;
});

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((course) => filter.push(course._id));
      action.payload.forEach((course) => {
        if (!filter.includes(course._id)) {
          state.push(course);
        }
      });
      return state;
    });
    builder.addCase(postCourse.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchCourse.fulfilled, (state, action) => {
      return state.map((course) => (course._id === action.payload._id ? action.payload : course));
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      return state.filter((course) => course._id !== action.payload._id);
    });
  },
});

export { getCourses, postCourse, patchCourse, deleteCourse };
export default courseSlice.reducer;
