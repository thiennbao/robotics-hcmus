import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import blogReducer from "pages/admin/BlogDashboard/blogSlice";
import contactReducer from "pages/admin/ContactDashboard/contactSlice";
import accountReducer from "pages/admin/AccountDashboard/accountSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    blog: blogReducer,
    contact: contactReducer,
    account: accountReducer,
  },
});

export default store;
