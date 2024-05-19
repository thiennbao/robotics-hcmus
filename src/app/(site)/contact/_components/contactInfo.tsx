import Appear from "@/components/appear";
import { HTMLAttributes } from "react";
import {
  BsEnvelopeFill,
  BsFacebook,
  BsGeoAltFill,
  BsTelephoneFill,
} from "react-icons/bs";

const ContactInfo = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div className="lg:mr-20">
            <h2 className="mb-8 text-3xl font-bold before:content-['COURSE_DETAILS'] before:block before:text-primary before:text-[0.6em] before:font-normal">
              Contact Information
            </h2>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsGeoAltFill className="text-2xl text-primary" />
              </div>
              <div>
                Location: Robotics & IoT Lab, Room No.86, University of Science,
                227 Nguyen Van Cu, Phuong 4, Quan 5, Tp HCM
              </div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsFacebook className="text-2xl text-primary" />
              </div>
              <div>Facebook: RoboticsHCMUS</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsEnvelopeFill className="text-2xl text-primary" />
              </div>
              <div>Email: robotics@hcmus.edu.vn</div>
            </Appear>
            <Appear variant="right" className="flex items-center gap-6 my-6">
              <div>
                <BsTelephoneFill className="text-2xl text-primary" />
              </div>
              <div>Phone: 0366 399 748</div>
            </Appear>
          </div>
        </div>
        <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
          <Appear variant="left" className="w-full h-full">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6317113141718!2d106.67990747460313!3d10.76284085944506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1696159391564!5m2!1svi!2s"
              className="w-full h-full"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
