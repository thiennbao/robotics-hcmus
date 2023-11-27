import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import style from "./Footer.module.scss";
import { logo } from "assets";

const pages = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "Blogs", to: "/blogs" },
  { title: "Contact", to: "/contact" },
  { title: "Robocus", to: "/robocus" },
];

const contacts = [
  {
    title:
      "Robotics & IoT Lab, Room No.86, University of Science, 227 Nguyen Van Cu, Phuong 4, Quan 5, Tp HCM",
    icon: "geo-alt-fill",
    to: "https://maps.app.goo.gl/zg6WypHivDsz9hzH9",
  },
  {
    title: "Phone: (028) 38 325 929",
    icon: "phone-fill",
    to: "tel:(028) 38 325 929",
  },
  {
    title: "Hotline/Zalo: 0366 399 748",
    icon: "telephone-fill",
    to: "tel:0366 399 748",
  },
  {
    title: "Email: robotics@hcmus.edu.vn",
    icon: "envelope-fill",
    to: "mailto:robotics@hcmus.edu.vn",
  },
  {
    title: "Fanpage: RoboticsHCMUS",
    icon: "facebook",
    to: "https://www.facebook.com/RoboticsHCMUS",
  },
];

const Footer = () => {
  const path = useLocation().pathname;

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="row gx-5 gy-lg-0 gy-4">
          <div className="col-lg-4">
            <img src={logo} alt="Robotics & IoT - HCMUS" className={style.logo} />
            <p className="me-5 mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col-lg-4">
            <h3 className="fs-5">QUICK LINKS</h3>
            <ul className="list-unstyled row">
              {pages.map((link, index) => (
                <li key={index} className="col-6 mt-2">
                  <Link
                    to={link.to}
                    className={clsx(style.link, path === link.to && style.current)}
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
                    <i className={clsx(style.icon, `bi bi-${item.icon}`)}></i> {item.title}
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
