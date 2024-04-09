import { configureStore } from "@reduxjs/toolkit";
import linkReducer from "pages/admin/LinkDashboard/linkSlice";
import bannerReducer from "pages/admin/BannerDashboard/bannerSlice";
import testimonialReducer from "pages/admin/TestimonialDashboard/testimonialSlice";
import contactInfoReducer from "pages/admin/ContactInfoDashboard/contactInfoSlice";
import faqReducer from "pages/admin/FaqDashboard/faqSlice";
import courseReducer from "pages/admin/CourseDashboard/courseSlice";
import blogReducer from "pages/admin/BlogDashboard/blogSlice";
import contactReducer from "pages/admin/ContactDashboard/contactSlice";
import accountReducer from "pages/admin/AccountDashboard/accountSlice";

const store = configureStore({
  reducer: {
    link: linkReducer,
    banner: bannerReducer,
    testimonial: testimonialReducer,
    contactInfo: contactInfoReducer,
    faq: faqReducer,
    course: courseReducer,
    blog: blogReducer,
    contact: contactReducer,
    account: accountReducer,
  },
});

export default store;
