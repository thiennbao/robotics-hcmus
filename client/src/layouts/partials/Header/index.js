import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "assets/logo.png";
import style from "./style.module.scss";

const NavLinks = ({ items }) => {
  return (
    <nav>
      <ul className="list-unstyled d-flex justify-content-end">
        {items.map((item, index) => (
          <li key={index} className="pe-4">
            <Link className={clsx(style.navLink, "p-2 position-relative")} to={item.to}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NavIcons = ({ items }) => {
  return (
    <ul className="list-unstyled d-flex justify-content-end">
      {items.map((item, index) => (
        <li key={index} className="ps-4">
          <a className={style.headerIcon} href="/">
            <i className={`bi bi-${item}`}></i>
          </a>
        </li>
      ))}
    </ul>
  );
};

const navItems = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "News", to: "/news" },
  { title: "Contact", to: "/contact" },
];

const navIcons = ["facebook", "telephone-fill", "envelope-fill"];

const Header = () => {
  return (
    <header className="fixed-top">
      <div className="container">
        <div className={clsx(style.header, "row align-items-center fw-bold")}>
          <div className="col-2">
            <Link to="/">
              <img src={logo} alt="Robotics & IoT - HCMUS" className={style.headerLogo} />
            </Link>
          </div>
          <div className="col-8">
            <NavLinks items={navItems} />
          </div>
          <div className="col-2">
            <NavIcons items={navIcons} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
