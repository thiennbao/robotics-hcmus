import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  courseContent: {
    _id: string;
    name: string;
    thumbnail: string;
    description: string;
  };
}

const Course = ({ courseContent, className, ...props }: Props) => {
  return (
    <div className={clsx(className, "h-full flex flex-col")} {...props}>
      <div>
        <Image src={courseContent.thumbnail} alt={courseContent.name} width={800} height={450} />
      </div>
      <div className="flex-grow flex flex-col justify-between gap-6 p-6">
        <div>
          <p className="text-xl text-primary font-bold mb-2">{courseContent.name}</p>
          <p>
            {courseContent.description.length > 200
              ? `${courseContent.description.slice(0, 200)}...`
              : courseContent.description}
          </p>
        </div>
        <div>
          <Link href={`/courses/${courseContent._id}`}>
            <button className="w-32 h-10 border-2 border-primary text-primary transition hover:bg-primary hover:text-white">
              See details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
