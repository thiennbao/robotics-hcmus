import { Link } from "react-router-dom";
import clsx from "clsx";
import Appear from "components/Appear";
import style from "./ContactInfo.module.scss";

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

const ContactInfo = () => {
  return (
    <section className={style.contactInfo}>
      <div className="container d-flex">
        <div className="row gy-5 justify-content-between flex-grow-1">
          <div className="col-xl-5 col-lg-6 my-auto">
            <h2>Contact Infomation</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <ul className="list-unstyled">
              {contacts.map((item, index) => (
                <li key={index} className="mt-2">
                  <Appear variant="right">
                    <Link to={item.to}>
                      <div className="d-flex align-items-center">
                        <i className={clsx(style.icon, `bi bi-${item.icon}`)}></i>
                        <span className={style.info}>{item.title}</span>
                      </div>
                    </Link>
                  </Appear>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-6 d-flex">
            <div className={style.map}>
              <Appear variant="left">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141718!2d106.67990747460313!3d10.76284085944506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1696159391564!5m2!1svi!2s"
                ></iframe>
              </Appear>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
