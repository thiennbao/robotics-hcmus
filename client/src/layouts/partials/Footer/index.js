import { Link } from "react-router-dom";
import clsx from "clsx";
import logo from "assets/logo.png";
import style from "./style.module.scss";

const FooterLinks = ({ items }) => {
  return (
    <ul className="list-unstyled row">
      {items.map((item, index) => (
        <li key={index} className="col-6 mt-2">
          <Link to={item.to}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

const FooterContactList = ({ items }) => {
  return (
    <ul className="list-unstyled">
      {items.map((item, index) => (
        <li className="mt-2">
          <i className={clsx(style.footerIcon, `bi bi-${item.icon}`)}></i> {item.title}
        </li>
      ))}
    </ul>
  );
};

const quickLinks = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Courses", to: "/courses" },
  { title: "News", to: "/news" },
  { title: "Contact", to: "/contact" },
];

const aboutUsLinks = [
  { title: "Our Team", to: "/" },
  { title: "Join us", to: "/" },
  { title: "Privacy Policy", to: "/" },
  { title: "Testimonial", to: "/" },
  { title: "Contat", to: "/" },
];

const contactList = [
  { title: "CLB Robotics & IoT, Room No.86, 8th Floor, I Building, University of Science, VNUHCM", icon: "house-fill" },
  { title: "Address: 227 Nguyen Van Cu, Phuong 4, Quan 5, Tp HCM", icon: "geo-alt-fill" },
  { title: "Phone: (028) 38 325 929", icon: "phone-fill" },
  { title: "Hotline/Zalo: 0366 399 748", icon: "telephone-fill" },
  { title: "Email: robotics@hcmus.edu.vn", icon: "envelope-fill" },
  { title: "Fanpage: facebook.com/RoboticsHCMUS", icon: "facebook" },
];

const Footer = () => {
  return (
    <footer>
      <div className="container p-5">
        <div className="row">
          <div className="col-3">
            <img className={clsx(style.footerLogo, "mb-4")} src={logo} alt="Logo" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="col-3">
            <h3 className={style.footerHeading}>Quick Links</h3>
            <FooterLinks items={quickLinks} />
          </div>
          <div className="col-3">
            <h3 className={style.footerHeading}>About Us</h3>
            <FooterLinks items={aboutUsLinks} />
          </div>
          <div className="col-3">
            <h3 className={style.footerHeading}>Contact</h3>
            <FooterContactList items={contactList} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
