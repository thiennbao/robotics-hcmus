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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
