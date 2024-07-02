import Appear from "../utils/appear";
import News from "./news";
import { HTMLAttributes } from "react";

// Temp content
const newsContent = {
  _id: "01232456789",
  title: "Lorem Lmao",
  thumbnail: "/picsum-3.png",
  date: new Date().toDateString(),
};

const NewsArchive = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section {...props}>
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold before:content-['NEWS'] before:block before:text-primary before:text-[0.6em] before:font-normal">
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
            <News newsContent={newsContent} />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.2}>
            <News newsContent={newsContent} />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.3}>
            <News newsContent={newsContent} />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.1}>
            <News newsContent={newsContent} />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.2}>
            <News newsContent={newsContent} />
          </Appear>
          <Appear variant="up" viewOption={{ amount: 0.4 }} delay={0.3}>
            <News newsContent={newsContent} />
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default NewsArchive;
