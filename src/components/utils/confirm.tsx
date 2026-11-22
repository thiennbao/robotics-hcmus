"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { PiCheckCircleFill, PiWarningFill } from "react-icons/pi";
import { Spinner } from "../admin/actionButton";

const Confirm = ({
  title,
  message,
  type,
  asSubmit,
  loadingText = "Đang xử lý...",
  close,
}: {
  title: string;
  message: string;
  type: "success" | "warning";
  asSubmit?: boolean;
  loadingText?: string;
  close?: () => void;
}) => {
  const { pending } = useFormStatus();
  const isSubmitting = Boolean(asSubmit && pending);

  return (
    <div className="[body:has(&)]:overflow-hidden">
      <div
        className={clsx(
          "fixed w-screen h-screen top-0 left-0 z-30 bg-black bg-opacity-90",
          isSubmitting ? "cursor-wait" : "cursor-pointer"
        )}
        onClick={isSubmitting ? undefined : close}
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
              "w-full p-2 border font-bold rounded-md inline-flex items-center justify-center gap-2 transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:text-gray-200 hover:-translate-y-[1px] active:scale-[0.985] cursor-pointer",
              {
                "border-emerald-400 text-emerald-400 hover:bg-emerald-400": type === "success" && !isSubmitting,
                "border-emerald-400 text-emerald-400": type === "success" && isSubmitting,
                "border-red-400 text-red-400 hover:bg-red-400": type === "warning" && !isSubmitting,
                "border-red-400 text-red-400": type === "warning" && isSubmitting,
              }
            )}
            disabled={isSubmitting}
            aria-busy={isSubmitting || undefined}
            onClick={asSubmit ? undefined : close}
            type={asSubmit ? "submit" : "button"}
          >
            {isSubmitting && <Spinner />}
            <span>{isSubmitting ? loadingText : "Xác nhận"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
