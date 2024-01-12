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
import CourseDashboard from "pages/admin/CourseDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses">
            <Route path="/courses/" element={<CoursePage />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
          </Route>
          <Route path="/blogs">
            <Route path="/blogs/" element={<BlogPage />} />
            <Route path="/blogs/search" element={<BlogPage />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/robocus" element={<h1>Robocus page</h1>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin">
            <Route path="/admin/" element={<HomeDashboard />} />
            <Route path="/admin/course" element={<CourseDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
