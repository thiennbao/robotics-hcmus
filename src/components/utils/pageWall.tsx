const PageWall = ({ title, image }: { title: string; image: string }) => {
  return (
    <section
      className="relative h-[50vh] bg-cover bg-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${image})`,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl text-light font-bold">{title}</h2>
      </div>
    </section>
  );
};

export default PageWall;
