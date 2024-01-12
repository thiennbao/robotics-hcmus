import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getCourses = createAsyncThunk(
  "course/getCourses",
  async ({ skip, limit }) => {
    const res = await resourceApi.getResources({
      resource: "course",
      skip,
      limit,
    });
    return res.data;
  }
);
const postCourse = createAsyncThunk("course/postCourse", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "course", data });
  return res.data;
});

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {
    patchCourse: (state, action) => {
      resourceApi.patchResource({ resource: "course", ...action.payload });
      return state.map((course) =>
        course._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.data }
          : course
      );
    },
    deleteCourse: (state, action) => {
      resourceApi.deleteResource({ resource: "course", ...action.payload });
      return state.filter((course) => course._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((course) => {
          if (!filter.includes(course._id)) {
            filter.push(course._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(postCourse.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getCourses, postCourse };
export const { patchCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;
