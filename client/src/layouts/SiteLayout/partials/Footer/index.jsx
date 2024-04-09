import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./Footer.module.scss";
import { logo } from "assets";
import { useEffect, useState } from "react";
import { resourceApi } from "api";

const Footer = () => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "link" })
      .then((res) => setLinks([{ title: "Home", content: "/" }, ...res.data]))
      .catch((error) => console.log(error));
  }, []);

  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    resourceApi
      .getResources({ resource: "contactInfo" })
      .then((res) => setContacts(res.data))
      .catch((error) => console.log(error));
  }, []);

  const path = useLocation().pathname;

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="row gx-5 gy-lg-0 gy-4">
          <div className="col-lg-4">
            <Link to={"/"}>
              <img src={logo} alt="Robotics & IoT - HCMUS" className={style.logo} />
            </Link>
            <p className="me-5 mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col-lg-4">
            <h3 className="fs-5">QUICK LINKS</h3>
            <ul className="list-unstyled row">
              {links.map((link, index) => (
                <li key={index} className="col-6 mt-2">
                  <Link
                    to={link.content}
                    className={clsx(style.link, path === link.content && style.current)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <h3 className="fs-5">CONTACT</h3>
            <ul className="list-unstyled">
              {contacts.map((item, index) => (
                <li key={index} className="mt-2">
                  <Link to={item.to} className={style.link}>
                    <i className={clsx(style.icon, `bi bi-${item.icon}`)}></i>{" "}
                    {item.key[0].toUpperCase() + item.key.slice(1)}: {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
