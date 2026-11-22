import { getAboutBrief } from "@/lib/pageConfig";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import Appear from "../utils/appear";

const Brief = async (props: HTMLAttributes<HTMLDivElement>) => {
  const { paragraphs, image } = await getAboutBrief();
  const canUseNextImage =
    image.startsWith("/") ||
    image.includes("res.cloudinary.com") ||
    image.includes("firebasestorage.googleapis.com");

  return (
    <section {...props}>
      <div className="container flex flex-wrap justify-between gap-y-8">
        <div className="lg:w-1/2 flex items-center">
          <div>
            <h2 className="mb-4 text-3xl text-primary font-bold">
              <Link href="/about">GIỚI THIỆU</Link>
            </h2>
            {paragraphs.map((paragraph, index) => (
              <Appear key={index} variant="right">
                <p className="mt-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
              </Appear>
            ))}
            <Appear variant="right" className="flex justify-end">
              <Link href="/about">
                <button className="w-32 h-10 mt-8 border-2 border-primary text-primary transition rounded hover:bg-primary hover:text-white">
                  Xem thêm
                </button>
              </Link>
            </Appear>
          </div>
        </div>
        <div className="lg:w-5/12 overflow-hidden">
          <Appear variant="left" className="h-full">
            {canUseNextImage ? (
              <Image
                src={image}
                alt="Robotics & IoT HCMUS"
                width={900}
                height={900}
                className="w-full h-full aspect-video object-cover rounded-lg"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="Robotics & IoT HCMUS"
                className="w-full h-full aspect-video object-cover rounded-lg"
              />
            )}
          </Appear>
        </div>
      </div>
    </section>
  );
};

export default Brief;
