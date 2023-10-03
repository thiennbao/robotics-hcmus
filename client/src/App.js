import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/site/HomePage";
import CoursesPage from "./pages/site/CoursesPage";
import NewsPage from "./pages/site/NewsPage";
import ContactPage from "./pages/site/ContactPage";
import AboutPage from "./pages/site/AboutPage";
import JoinUsPage from "pages/site/JoinUsPage";
import MemoryPage from "pages/site/MemoryPage";
import FaqPage from "pages/site/FaqPage";
import ClassDashboard from "pages/admin/ClassDashboard";
import CourseDashboard from "pages/admin/CourseDashboard";
import NewsDashboard from "pages/admin/NewsDashboard";
import MemberDashboard from "pages/admin/MemberDashboard";
import ContactDashboard from "pages/admin/ContactDashboard";
import ApplicationDashboard from "pages/admin/ApplicationDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/joinus" element={<JoinUsPage />} />
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Route>
          <Route path="/admin">
            <Route path="/admin/class" element={<ClassDashboard />} />
            <Route path="/admin/course" element={<CourseDashboard />} />
            <Route path="/admin/news" element={<NewsDashboard />} />
            <Route path="/admin/member" element={<MemberDashboard />} />
            <Route path="/admin/contact" element={<ContactDashboard />} />
            <Route path="/admin/application" element={<ApplicationDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
