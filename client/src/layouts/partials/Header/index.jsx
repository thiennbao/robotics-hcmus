import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "assets/general/logo.png";
import style from "./Header.module.scss";
import { useEffect, useState } from "react";

const links = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "News", to: "/news" },
  { title: "Contact", to: "/contact" },
];
const icons = ["facebook", "telephone-fill", "envelope-fill"];

const Header = () => {
  const [page, setPage] = useState(0);
  const [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrink(window.scrollY !== 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isShrink]);

  return (
    <header className={clsx(style.header, isShrink && style.shrink, "fixed-top")}>
      <div className="container">
        <div className="row align-items-center justify-content-between fw-bold">
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/">
              <img src={logo} alt="Robotics & IoT - HCMUS" />
            </Link>
          </div>
          <div className="col-8 d-none d-md-block">
            <nav>
              <ul className="list-unstyled d-flex justify-content-end">
                {links.map((link, index) => (
                  <li key={index} className="pe-4">
                    <Link
                      className={clsx(
                        page === index && style.current,
                        style.link,
                        "p-2 position-relative"
                      )}
                      to={link.to}
                      onClick={() => setPage(index)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-lg-2 d-none d-lg-block">
            <ul className="list-unstyled d-flex justify-content-end">
              {icons.map((icon, index) => (
                <li key={index} className="ps-4">
                  <a className={style.icon} href="/">
                    <i className={`bi bi-${icon}`}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-2 d-md-none">
            <input type="checkbox" id="toggle" className="d-none"></input>
            <label htmlFor="toggle">
              <i className="bi bi-list text-white"></i>
              <div className={style.overlay}></div>
            </label>
            <div className={clsx("px-4 py-2", style.sideMenu)}>
              <div className="d-flex justify-content-end">
                <label htmlFor="toggle">
                  <i className="bi bi-x-square fs-5"></i>
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/">
                  <img src={logo} alt="Robotics & IoT - HCMUS" />
                </Link>
              </div>
              <div>
                <nav>
                  <ul className="list-unstyled">
                    {links.map((link, index) => (
                      <li key={index} className="my-3">
                        <Link
                          to={link.to}
                          onClick={() => setPage(index)}
                          className={clsx(page === index && style.current)}
                        >
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
