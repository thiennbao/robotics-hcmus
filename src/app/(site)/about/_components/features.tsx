import Appear from "@/components/appear";
import Image from "next/image";
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
              Des yeux qui font baisser les miens un rire qui se perd sur sa
              bouche voilà le portrait sans retouche de l&apos;homme auquel
              j&apos;appartiens.
            </p>
            <div>
              <Appear variant="right">
                <Feature
                  title="Lorem ipsum"
                  content="Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens."
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Lorem ipsum"
                  content="Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens."
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Lorem ipsum"
                  content="Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens."
                />
              </Appear>
              <Appear variant="right">
                <Feature
                  title="Lorem ipsum"
                  content="Des yeux qui font baisser les miens un rire qui se perd sur sa bouche voilà le portrait sans retouche de l'homme auquel j'appartiens."
                />
              </Appear>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 xl:w-1/2 overflow-hidden">
          <Appear
            variant="left"
            viewOption={{ amount: 0.4 }}
            className="h-72 lg:h-full"
          >
            <Image
              src="/picsum-1.png"
              alt="Feature image"
              width={1600}
              height={900}
              className="h-full object-cover"
            />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Features;
