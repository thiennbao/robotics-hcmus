import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import News from "./pages/News";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
