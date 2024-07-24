import Image from "next/image";
import Appear from "../utils/appear";
import { HTMLAttributes } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Feature = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex items-center gap-6 my-2">
      <div>
        <FaCheckCircle className="text-2xl text-primary" />
      </div>
      <div>
        <p className="text-xl">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
};

const Features = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container flex flex-wrap gap-y-8">
        <div className="lg:w-3/5 xl:w-1/2 flex items-center">
          <div className="lg:mr-20">
            <h2 className="mb-4 text-3xl font-bold before:content-['OUR_SPECIAL'] before:block before:text-primary before:text-[0.6em] before:font-normal">
              Features
            </h2>
            <p className="mb-8">
              Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le
              portrait sans retouche de l&apos;homme auquel j&apos;appartiens.
            </p>
            <div>
              <Appear variant="right">
                <Feature
                  title="Lorem ipsum"
                  content="In tellus integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor morbi non arcu"
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Facilisis mauris"
                  content="Morbi leo urna molestie at elementum eu facilisis sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing"
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Adipiscing elit"
                  content="Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget"
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Nec ullamcorper"
                  content="Nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat"
                />
              </Appear>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 xl:w-1/2 overflow-hidden">
          <Appear variant="left" viewOption={{ amount: 0.4 }} className="h-72 lg:h-full">
            <Image
              src="/about-features.png"
              alt="Feature image"
              width={1200}
              height={1200}
              className="w-auto h-full object-cover rounded-lg"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Features;
