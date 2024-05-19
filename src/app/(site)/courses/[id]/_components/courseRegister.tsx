const CourseRegister = () => {
  return (
    <section className="h-screen flex justify-center items-center bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/picsum-2.png)] bg-center bg-cover">
      <div className="w-full md:w-3/4 lg:w-1/2 p-8 mx-8 backdrop-blur-sm shadow-[white_0_0_0.5px]">
        <h2 className="text-center mb-8 text-3xl font-bold before:content-['See_interesting'] before:block before:text-primary before:text-[0.6em] before:font-normal">
          Register this course
        </h2>
        <form className="grid grid-cols-2 gap-4 *:p-4 *:transition *:bg-transparent *:outline-none *:border-2 focus:*:border-primary *:shadow-[white_0_0_0.5px]">
          <input
            placeholder="Name"
            className="col-span-2 md:col-span-1 border-transparent"
          />
          <input
            placeholder="Phone"
            className="col-span-2 md:col-span-1 border-transparent"
          />
          <input
            placeholder="Email"
            className="col-span-2 border-transparent"
          />
          <textarea
            placeholder="Message"
            className="col-span-2 border-transparent h-40 resize-none"
          />
          <button className="col-span-2 border-primary text-primary hover:text-white hover:bg-primary">
            RIGISTER
          </button>
        </form>
      </div>
    </section>
  );
};

export default CourseRegister;
