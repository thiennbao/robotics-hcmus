import Appear from "@/components/appear";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  news: {
    title: string;
    thumbnail: string;
    content: string;
    photos: string[];
  };
}

const NewsDetail = ({ news, ...props }: Props) => {
  return (
    <section {...props}>
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-8">
        <div className="col-span-2">
          <h2 className="mb-8 text-3xl font-bold before:content-['NEWS_DETAIL'] before:block before:text-primary before:text-[0.6em] before:font-normal">
            {news.title}
          </h2>
          <div>{news.content}</div>
        </div>
        <div>
          <input
            placeholder="Search ..."
            className="w-full h-12 px-4 bg-bg-primary outline-none border-[0.5px] border-slate-500 focus:border-primary"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-8 mt-8 overflow-hidden">
            <Appear variant="left">
              <Link href="/news/${id}" className="flex h-20 items-center gap-4">
                <div className="w-20">
                  <Image
                    src="/picsum-3.png"
                    alt="{title}"
                    width={900}
                    height={900}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div>
                  <p className="text-primary text-xl mb-2">Lorem ipsum</p>
                  <p>{new Date().toDateString()}</p>
                </div>
              </Link>
            </Appear>
            <Appear variant="left">
              <Link href="/news/${id}" className="flex h-20 items-center gap-4">
                <div className="w-20">
                  <Image
                    src="/picsum-3.png"
                    alt="{title}"
                    width={900}
                    height={900}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div>
                  <p className="text-primary text-xl mb-2">Lorem ipsum</p>
                  <p>{new Date().toDateString()}</p>
                </div>
              </Link>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
