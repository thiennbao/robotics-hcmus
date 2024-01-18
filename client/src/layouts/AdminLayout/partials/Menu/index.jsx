import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import style from "./Menu.module.scss";
import { logo } from "assets";
import { useCookies } from "react-cookie";

const pages = [
  { title: "Banner", to: "/admin/banner", icon: "star-fill" },
  { title: "Course", to: "/admin/course", icon: "journal-album" },
  { title: "Blog", to: "/admin/blog", icon: "newspaper" },
  { title: "Contact", to: "/admin/contact", icon: "chat-dots-fill" },
  { title: "Account", to: "/admin/account", icon: "person-fill-gear" },
];

const Menu = () => {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const logoutHandle = () => {
    removeCookie("token");
    navigate("/auth");
  };

  const path = useLocation().pathname;

  return (
    <div className={style.menu}>
      <input
        type="checkbox"
        defaultChecked={window.innerWidth <= 992}
        id="toggle"
        className="d-none"
      />
      <div>
        <label htmlFor="toggle">
          <i className="bi bi-list"></i>
        </label>
        <div>
          <label htmlFor="toggle">
            <i className="bi bi-x-circle"></i>
          </label>
          <div>
            <Link to="/">
              <img src={logo} alt="Robotics & IoT - HCMUS" />
            </Link>
          </div>
          <div>
            <h2>DASHBOARDS</h2>
            <nav>
              <ul className="list-unstyled">
                {pages.map((page, index) => (
                  <li key={index}>
                    <Link
                      to={page.to}
                      className={clsx(path === page.to && style.current, style.button)}
                    >
                      <i className={`bi bi-${page.icon}`}></i>
                      {page.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <span className={style.button} onClick={logoutHandle}>
                    <i className="bi bi-box-arrow-left"></i> Log out
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
