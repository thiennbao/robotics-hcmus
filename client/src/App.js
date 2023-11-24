import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import CoursesPage from "./pages/site/CoursesPage";
import BlogPage from "./pages/site/BlogPage";
import SingleBlog from "pages/site/BlogPage/SingleBlog";
import ContactPage from "./pages/site/ContactPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="/courses">
              <Route path="/courses/" element={<CoursesPage />} />
            </Route>
            <Route path="/blog">
              <Route path="/blog/" element={<BlogPage />} />
              <Route path="/blog/search" element={<BlogPage/>} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
            </Route>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
