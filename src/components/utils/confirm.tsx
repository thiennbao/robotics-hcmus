import clsx from "clsx";
import { PiCheckCircleFill, PiWarningFill } from "react-icons/pi";

const Confirm = ({
  title,
  message,
  type,
  asSubmit,
  close,
}: {
  title: string;
  message: string;
  type: "success" | "warning";
  asSubmit?: boolean;
  close?: () => void;
}) => {
  return (
    <div className="[body:has(&)]:overflow-hidden">
      <div
        className="fixed w-screen h-screen top-0 left-0 z-30 bg-black bg-opacity-90 cursor-pointer"
        onClick={close}
      />
      <div className="max-w-[80vw] w-[28rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gray-800 rounded-lg divide-y divide-gray-700 text-sm text-gray-200 *:p-4">
        <div className="font-bold">
          <p>{title}</p>
        </div>
        <div>
          {type === "success" && (
            <PiCheckCircleFill className="mx-auto mb-2 text-5xl text-emerald-400" />
          )}
          {type === "warning" && <PiWarningFill className="mx-auto mb-2 text-5xl text-red-400" />}
          <div className="text-center">{message}</div>
        </div>
        <div>
          <button
            className={clsx(
              "w-full p-2 border font-bold  hover:text-gray-200 transition rounded-md",
              {
                "border-emerald-400 text-emerald-400 hover:bg-emerald-400": type === "success",
                "border-red-400 text-red-400 hover:bg-red-400": type === "warning",
              }
            )}
            onClick={asSubmit ? undefined : close}
            type={asSubmit ? "submit" : "button"}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
