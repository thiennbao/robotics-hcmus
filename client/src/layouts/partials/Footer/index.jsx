import { Link } from "react-router-dom";
import logo from "assets/general/logo.png";
import style from "./Footer.module.scss";

const quickLinks = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "News", to: "/news" },
  { title: "Contact", to: "/contact" },
  { title: "Join us", to: "/joinus" },
];

const contactInfos = [
  {
    title: "CLB Robotics & IoT, Room No.86, 8th Floor, I Building, University of Science, VNUHCM",
    icon: "house-fill",
  },
  { title: "Address: 227 Nguyen Van Cu, Phuong 4, Quan 5, Tp HCM", icon: "geo-alt-fill" },
  { title: "Phone: (028) 38 325 929", icon: "phone-fill" },
  { title: "Hotline/Zalo: 0366 399 748", icon: "telephone-fill" },
  { title: "Email: robotics@hcmus.edu.vn", icon: "envelope-fill" },
  { title: "Fanpage: facebook.com/RoboticsHCMUS", icon: "facebook" },
];

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <img src={logo} alt="Logo" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Quick Links</h3>
            <ul className="list-unstyled row">
              {quickLinks.map((item, index) => (
                <li key={index} className="col-6 mt-2">
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Empty column</h3>
            <p>Add something later</p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3>Contact</h3>
            <ul className="list-unstyled">
              {contactInfos.map((item, index) => (
                <li key={index} className="mt-2">
                  <i className={`bi bi-${item.icon}`}></i> {item.title}
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
