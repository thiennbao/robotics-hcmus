import Appear from "@/components/appear";
import Course from "./course";
import { HTMLAttributes } from "react";

// Temp content
const courseContent = {
  _id: "01232456789",
  name: "Lorem Lmao",
  thumbnail: "/picsum-2.png",
  description:
    "Le passage latin classique qui ne vieillit jamais, apprécie autant (ou aussi peu) le lorem ipsum que vous pouvez manipuler avec notre générateur de texte de remplissage facile à utiliser.",
};

const CourseArchive = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold before:content-['COURSE'] before:block before:text-primary before:text-[0.6em] before:font-normal">
            Archives
          </h2>
          <div className="lg:w-3/4 xl:w-1/2 mx-auto mt-12 mb-16">
            <input
              placeholder="Search ..."
              className="w-full h-12 px-4 outline-none bg-gray-100 border transition focus:border-primary"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.1}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.2}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.3}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.1}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.2}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.3}>
            <Course courseContent={courseContent} className="shadow-[gray_0_0_4px]" />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default CourseArchive;
