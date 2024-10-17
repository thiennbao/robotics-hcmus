import { HTMLAttributes } from "react";
import Appear from "../utils/appear";
import Image from "next/image";
import { Competition } from "@prisma/client";
import db from "@/lib/db";
import clsx from "clsx";
import Link from "next/link";

const Item = ({ competition, isReverse }: { competition: Competition; isReverse: boolean }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 -mx-6 *:p-6">
      <div className={clsx("overflow-hidden", isReverse && "lg:order-1")}>
        <Appear variant={isReverse ? "left" : "right"}>
          <h2 className="mb-4 text-3xl text-primary font-bold">
            <Link href={competition.address}>{competition.title}</Link>
          </h2>
        </Appear>
        <Appear variant={isReverse ? "left" : "right"}>
          <div dangerouslySetInnerHTML={{ __html: competition.description }} />
        </Appear>
        <Appear variant={isReverse ? "left" : "right"} className="flex justify-end">
          <Link href={competition.address}>
            <button className="w-32 h-10 mt-8 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white">
              Xem thêm
            </button>
          </Link>
        </Appear>
      </div>
      <div className="overflow-hidden">
        <Appear variant={isReverse ? "right" : "left"} className="h-full">
          <Image
            src={competition.thumbnail}
            alt={competition.title}
            width={900}
            height={900}
            className="h-full object-cover rounded-lg"
          />
        </Appear>
      </div>
    </div>
  );
};

const Competitions = async (props: HTMLAttributes<HTMLDivElement>) => {
  const competitions = await db.competition.findMany({ orderBy: { order: "asc" } });

  return (
    <section {...props}>
      <div className="container -my-6">
        {competitions.map((competition, index) => (
          <Item key={competition.title} competition={competition} isReverse={!!(index % 2)} />
        ))}
      </div>
    </section>
  );
};

export default Competitions;
