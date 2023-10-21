import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import eventReducer from "pages/admin/EventDashboard/eventSlice";
import newsReducer from "pages/admin/NewsDashboard/newsSlice";
import memberReducer from "pages/admin/MemberDashboard/memberSlice";
import contactReducer from "pages/admin/ContactDashboard/contactSlice";
import applicationReducer from "pages/admin/ApplicationDashboard/applicationSlice";
import timelineReducer from "pages/admin/TimelineDashboard/timelineSlice";

const store = configureStore({
  reducer: {
    course: courseReducer,
    event: eventReducer,
    news: newsReducer,
    member: memberReducer,
    contact: contactReducer,
    application: applicationReducer,
    timeline: timelineReducer,
  },
});

export default store;
