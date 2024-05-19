import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  newsContent: {
    _id: string;
    title: string;
    thumbnail: string;
    date: string;
  };
}

const News = ({ newsContent, className, ...props }: Props) => {
  return (
    <div className={`${className} h-full flex flex-col`} {...props}>
      <Link href={`/news/${newsContent._id}`}>
        <Image src={newsContent.thumbnail} alt={newsContent.title} width={1600} height={900} className="aspect-square object-cover" />
        <div className="py-4">
          <p className="text-xl text-primary font-bold mb-2">{newsContent.title}</p>
          <p className="text-slate-400">{new Date(newsContent.date).toDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default News;
