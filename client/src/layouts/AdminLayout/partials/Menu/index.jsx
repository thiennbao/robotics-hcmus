import { Link } from "react-router-dom";
import clsx from "clsx";
import style from "./Menu.module.scss";
import logo from "assets/general/logo.png";

const pages = [
  { title: "Classes", to: "/admin/class", icon: "book" },
  { title: "Courses", to: "/admin/course", icon: "journal" },
  { title: "News", to: "/admin/news", icon: "newspaper" },
  { title: "Members", to: "/admin/member", icon: "people" },
  { title: "Contacts", to: "/admin/contact", icon: "chat" },
  { title: "Applications", to: "/admin/application", icon: "person-bounding-box" },
];

const Menu = () => {
  const path = window.location.pathname;

  return (
    <div className={style.menu}>
      <input type="checkbox" id="toggle" className="d-none" />
      <div>
        <label htmlFor="toggle">
          <i className="bi bi-list"></i>
        </label>
        <div>
          <label htmlFor="toggle">
            <i className="bi bi-x-circle"></i>
          </label>
          <div>
            <img src={logo} alt="Robotics & IoT - HCMUS" />
          </div>
          <div>
            <h2>DASHBOARDS</h2>
            <nav>
              <ul className="list-unstyled">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link to={page.to} className={clsx(path === page.to && style.current)}>
                      <i className={`bi bi-${page.icon}`}></i>
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
