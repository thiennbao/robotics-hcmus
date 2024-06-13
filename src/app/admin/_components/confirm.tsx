import { HTMLAttributes } from "react";
import { PiWarningFill } from "react-icons/pi";

const Confirm = ({
  title,
  children,
  ...props
}: { title: string } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <div className="max-w-[80vw] w-[28rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg divide-y divide-gray-700 text-sm *:p-4">
        <div className="font-bold">
          <p>{title}</p>
        </div>
        <div>
          <PiWarningFill className="mx-auto mb-2 text-5xl text-red-400" />
          <div className="text-center">{children}</div>
        </div>
        <div>
          <button className="w-full p-2 border border-red-400 font-bold text-red-400 hover:bg-red-400 hover:text-white transition rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
