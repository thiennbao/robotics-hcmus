import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseAPI } from "api";

const getCourses = createAsyncThunk("course/getCourses", async ({ skip, limit }) => {
  const res = await courseAPI.getCourses(skip, limit);
  return res.data;
});
const createCourse = createAsyncThunk("course/createCourse", async (data) => {
  const res = await courseAPI.createCourse(data);
  return res.data;
});

const courseSlice = createSlice({
  name: "course",
  initialState: [],
  reducers: {
    editCourse: (state, action) => {
      courseAPI.editCourse(action.payload.id, action.payload.data);
      return state.map((course) =>
        course._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.data }
          : course
      );
    },
    deleteCourse: (state, action) => {
      courseAPI.deleteCourse(action.payload);
      return state.filter((course) => course._id !== action.payload);
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
      .addCase(createCourse.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getCourses, createCourse };
export const { editCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;
