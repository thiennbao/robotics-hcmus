import { HTMLAttributes } from "react";
import Carousel from "../utils/carousel";
import db from "@/lib/db";
import Image from "next/image";

const Activity = async (props: HTMLAttributes<HTMLDivElement>) => {
  const activities = await db.activity.findMany({ orderBy: { order: "asc" } });

  return (
    <section {...props}>
      <div className="container">
        <h2 className="mb-4 text-3xl text-primary font-bold text-center">HOẠT ĐỘNG NỔI BẬT</h2>
        <Carousel auto={4000} withPrevNext itemsOnScreen={{ df: 1, md: 2, xl: 3 }} className="-mx-4">
          {activities.map((item) => (
            <div key={item.image} className="p-[6px]">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={450}
                className="h-full w-full aspect-video object-cover rounded-md"
              />
              <p className="text-center p-2 w-3/4 m-auto italic text-sm">{item.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Activity;
