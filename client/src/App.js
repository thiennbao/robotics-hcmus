import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import CoursePage from "./pages/site/CoursePage";
import CourseDetail from "pages/site/CoursePage/CourseDetail";
import BlogPage from "./pages/site/BlogPage";
import BlogDetail from "pages/site/BlogPage/BlogDetail";
import ContactPage from "./pages/site/ContactPage";
import AuthPage from "pages/auth";
import HomeDashboard from "pages/admin/HomeDashboard";
import CourseList from "pages/admin/CourseDashboard/CourseList";
import CourseEditor from "pages/admin/CourseDashboard/CourseEditor";
import BlogList from "pages/admin/BlogDashboard/BlogList";
import BlogEditor from "pages/admin/BlogDashboard/BlogEditor";
import ContactList from "pages/admin/ContactDashboard/ContactList";
import ContactEditor from "pages/admin/ContactDashboard/ContactEditor";
import AccountList from "pages/admin/AccountDashboard/AccountList";
import AccountEditor from "pages/admin/AccountDashboard/AccountEditor";
import LinkList from "pages/admin/LinkDashboard/LinkList";
import LinkEditor from "pages/admin/LinkDashboard/LinkEditor";
import BannerList from "pages/admin/BannerDashboard/BannerList";
import BannerEditor from "pages/admin/BannerDashboard/BannerEditor";
import TestimonialList from "pages/admin/TestimonialDashboard/TestimonialList";
import TestimonialEditor from "pages/admin/TestimonialDashboard/TestimonialEditor";
import ContactInfoList from "pages/admin/ContactInfoDashboard/ContactInfoList";
import ContactInfoEditor from "pages/admin/ContactInfoDashboard/ContactInfoEditor";
import FaqList from "pages/admin/FaqDashboard/FaqList";
import FaqEditor from "pages/admin/FaqDashboard/FaqEditor";
import ErrorPage from "pages/error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/search" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/auth" element={<AuthPage />} />

          <Route path="/admin" element={<HomeDashboard />} />
          <Route path="/admin/course" element={<CourseList />} />
          <Route path="/admin/course/:id" element={<CourseEditor />} />
          <Route path="/admin/blog" element={<BlogList />} />
          <Route path="/admin/blog/:id" element={<BlogEditor />} />
          <Route path="/admin/contact" element={<ContactList />} />
          <Route path="/admin/contact/:id" element={<ContactEditor />} />
          <Route path="/admin/account" element={<AccountList />} />
          <Route path="/admin/account/:id" element={<AccountEditor />} />

          <Route path="/admin/link" element={<LinkList />} />
          <Route path="/admin/link/:id" element={<LinkEditor />} />
          <Route path="/admin/banner" element={<BannerList />} />
          <Route path="/admin/banner/:id" element={<BannerEditor />} />
          <Route path="/admin/testimonial" element={<TestimonialList />} />
          <Route path="/admin/testimonial/:id" element={<TestimonialEditor />} />
          <Route path="/admin/contactinfo" element={<ContactInfoList />} />
          <Route path="/admin/contactinfo/:id" element={<ContactInfoEditor />} />
          <Route path="/admin/faq" element={<FaqList />} />
          <Route path="/admin/faq/:id" element={<FaqEditor />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
