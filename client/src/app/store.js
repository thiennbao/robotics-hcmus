import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import blogReducer from "pages/admin/BlogDashboard/blogSlice";
import contactReducer from "pages/admin/ContactDashboard/contactSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});

export default store;
