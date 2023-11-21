import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import CoursesPage from "./pages/site/CoursesPage";
import NewsPage from "./pages/site/NewsPage";
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
            <Route path="/news">
              <Route path="/news/" element={<NewsPage />} />
              <Route path="/news/search" element={<NewsPage/>} />
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
