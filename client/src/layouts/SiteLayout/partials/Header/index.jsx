import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./Header.module.scss";
import { logo } from "assets";
import { resourceApi } from "api";

const Header = () => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "link", sort: "index" })
      .then((res) => setLinks(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "contactInfo" })
      .then((res) => {
        const contacts = res.data.filter((contact) =>
          ["facebook", "email", "phone"].includes(contact.key)
        );
        setContacts(contacts);
      })
      .catch((error) => console.log(error));
  }, []);

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
                {links.map((link, index) => (
                  <li key={index} className="pe-4">
                    <Link
                      className={clsx(style.link, path === link.content && style.current)}
                      to={link.content}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Contact */}
          <div className="col-lg-2 d-none d-lg-block">
            <ul className="list-unstyled d-flex justify-content-end">
              {contacts.map((contact, index) => (
                <li key={index} className="ps-4">
                  <a href={contact.content} target="_blank" rel="noreferrer">
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
                    {links.map((link, index) => (
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
