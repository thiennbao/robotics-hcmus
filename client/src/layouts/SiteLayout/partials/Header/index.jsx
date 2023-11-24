import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./Header.module.scss";
import { logo } from "assets";

const pages = [
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "Blog", to: "/blog" },
  { title: "Contact", to: "/contact" },
  { title: "Robocus", to: "/robocus" },
];
const contacts = [
  { icon: "facebook", to: "https://www.facebook.com/RoboticsHCMUS" },
  { icon: "telephone-fill", to: "tel:0366 399 748" },
  { icon: "envelope-fill", to: "mailto:robotics@hcmus.edu.vn" },
];

const Header = () => {
  const [isShrink, setIsShrink] = useState(window.scrollY !== 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrink(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isShrink]);

  const path = useLocation().pathname;

  return (
    <header className={clsx(style.header, isShrink && style.shrink, "fixed-top d-flex")}>
      <div className="container d-flex">
        <div className="flex-grow-1 row align-items-center justify-content-between fw-bold">
          {/* Logo */}
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/">
              <img src={logo} className={style.logo} alt="Robotics & IoT - HCMUS" />
            </Link>
          </div>
          {/* Pages */}
          <div className="col-8 d-none d-md-block">
            <nav>
              <ul className="list-unstyled d-flex justify-content-end">
                {/* First 4 pages */}
                {pages.slice(0, 4).map((link, index) => (
                  <li key={index} className="pe-4">
                    <Link
                      className={clsx(style.link, path === link.to && style.current)}
                      to={link.to}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                {/* Remaining pages go to More */}
                <li className={style.more}>
                  <div className="position-relative">
                    <span>
                      More <i className="bi bi-caret-down-fill ps-2"></i>
                    </span>
                    <ul className="list-unstyled position-absolute start-50 translate-middle-x px-3 pb-3">
                      {pages.slice(4).map((link, index) => (
                        <li key={index}>
                          <Link
                            className={clsx(style.link, path === link.to && style.current)}
                            to={link.to}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          {/* Contact */}
          <div className="col-lg-2 d-none d-lg-block">
            <ul className="list-unstyled d-flex justify-content-end">
              {contacts.map((contact, index) => (
                <li key={index} className="ps-4">
                  <a href={contact.to} target="_blank" rel="noreferrer">
                    <i className={clsx(style.icon, `bi bi-${contact.icon}`)}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Mobile side menu */}
          <div className="col-2 d-md-none">
            <input type="checkbox" id="toggle" className={clsx(style.sideMenuToggle, "d-none")} />
            <label htmlFor="toggle">
              <i className="bi bi-list fs-2"></i>
              <div className={style.overlay}></div>
            </label>
            <div className={clsx(style.sideMenu, "px-4 py-3")}>
              <div className="d-flex justify-content-end">
                <label htmlFor="toggle">
                  <i className="bi bi-x-square fs-5"></i>
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/">
                  <img src={logo} alt="Robotics & IoT - HCMUS" className={style.logo} />
                </Link>
              </div>
              <div className={style.sideLinkWrapper}>
                <nav>
                  <ul className="list-unstyled">
                    {pages.map((link, index) => (
                      <li key={index} className="my-3">
                        <Link to={link.to} className={clsx(path === link.to && style.current)}>
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
