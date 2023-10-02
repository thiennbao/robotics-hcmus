import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "pages/FaqPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
