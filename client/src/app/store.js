import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
  },
});

export default store;
