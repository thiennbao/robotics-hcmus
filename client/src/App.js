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
import BannerList from "pages/admin/BannerDashboard/BannerList";
import BannerEditor from "pages/admin/BannerDashboard/BannerEditor";
import CourseList from "pages/admin/CourseDashboard/CourseList";
import CourseEditor from "pages/admin/CourseDashboard/CourseEditor";
import BlogList from "pages/admin/BlogDashboard/BlogList";
import BlogEditor from "pages/admin/BlogDashboard/BlogEditor";
import ContactList from "pages/admin/ContactDashboard/ContactList";
import ContactEditor from "pages/admin/ContactDashboard/ContactEditor";
import AccountList from "pages/admin/AccountDashboard/AccountList";
import AccountEditor from "pages/admin/AccountDashboard/AccountEditor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses/" element={<CoursePage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/blogs/" element={<BlogPage />} />
          <Route path="/blogs/search" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/robocus" element={<h1>Robocus page</h1>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/" element={<HomeDashboard />} />
          <Route path="/admin/banner" element={<BannerList />} />
          <Route path="/admin/banner/:id" element={<BannerEditor />} />
          <Route path="/admin/course" element={<CourseList />} />
          <Route path="/admin/course/:id" element={<CourseEditor />} />
          <Route path="/admin/blog" element={<BlogList />} />
          <Route path="/admin/blog/:id" element={<BlogEditor />} />
          <Route path="/admin/contact" element={<ContactList />} />
          <Route path="/admin/contact/:id" element={<ContactEditor />} />
          <Route path="/admin/account" element={<AccountList />} />
          <Route path="/admin/account/:id" element={<AccountEditor />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
