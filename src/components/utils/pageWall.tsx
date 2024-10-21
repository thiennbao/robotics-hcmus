import { getFile } from "@/lib/storage";

const PageWall = async ({ title, image }: { title: string; image: string }) => {
  return (
    <section
      className="aspect-video lg:aspect-auto lg:h-[50vh] bg-gray-200 relative bg-cover bg-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url("${await getFile(image)}")`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-4xl text-white font-bold">{title}</h2>
      </div>
    </section>
  );
};

export default PageWall;
