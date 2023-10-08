import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import eventReducer from "pages/admin/EventDashboard/eventSlice";
import newsReducer from "pages/admin/NewsDashboard/newsSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    event: eventReducer,
    news: newsReducer,
  },
});

export default store;
