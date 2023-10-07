import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import eventReducer from "pages/admin/EventDashboard/eventSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    event: eventReducer,
  },
});

export default store;
