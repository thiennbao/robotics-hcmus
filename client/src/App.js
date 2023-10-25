import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import HomePage from "./pages/site/HomePage";
import CoursesPage from "./pages/site/CoursesPage";
import SingleCoursePage from "pages/site/CoursesPage/SingleCoursePage";
import NewsPage from "./pages/site/NewsPage";
import SingleNewsPage from "pages/site/NewsPage/SingleNewsPage";
import ContactPage from "./pages/site/ContactPage";
import AboutPage from "./pages/site/AboutPage";
import JoinUsPage from "pages/site/JoinUsPage";
import MemoryPage from "pages/site/MemoryPage";
import FaqPage from "pages/site/FaqPage";
import HomeDashboard from "pages/admin/HomeDashboard";
import CourseDashboard from "pages/admin/CourseDashboard";
import RegistrationDashboard from "pages/admin/RegistrationDashboard";
import EventDashboard from "pages/admin/EventDashboard";
import NewsDashboard from "pages/admin/NewsDashboard";
import ContactDashboard from "pages/admin/ContactDashboard";
import MemberDashboard from "pages/admin/MemberDashboard";
import ApplicationDashboard from "pages/admin/ApplicationDashboard";
import TimelineDashboard from "pages/admin/TimelineDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="/courses">
              <Route path="/courses/" element={<CoursesPage />} />
              <Route path="/courses/:slug" element={<SingleCoursePage />} />
            </Route>
            <Route path="/news">
              <Route path="/news/" element={<NewsPage />} />
              <Route path="/news/:slug" element={<SingleNewsPage />} />
            </Route>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/joinus" element={<JoinUsPage />} />
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Route>
          <Route path="/admin">
            <Route path="/admin/" element={<HomeDashboard />} />
            <Route path="/admin/course" element={<CourseDashboard />} />
            <Route path="/admin/registration" element={<RegistrationDashboard />} />
            <Route path="/admin/event" element={<EventDashboard />} />
            <Route path="/admin/news" element={<NewsDashboard />} />
            <Route path="/admin/contact" element={<ContactDashboard />} />
            <Route path="/admin/member" element={<MemberDashboard />} />
            <Route path="/admin/application" element={<ApplicationDashboard />} />
            <Route path="/admin/timeline" element={<TimelineDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
