"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "../admin/actionButton";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
  submitting?: boolean;
}

const SubmitButton = ({
  children,
  loadingText = "ĐANG XỬ LÝ...",
  submitting,
  className,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isLoading = pending || Boolean(submitting);

  return (
    <button
      {...props}
      type="submit"
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={clsx(
        "col-span-2 border-2 border-gray-300 text-gray-300 p-4 transition outline-none rounded flex items-center justify-center gap-2 font-bold",
        isLoading
          ? "opacity-50 cursor-not-allowed bg-transparent"
          : "hover:text-black hover:bg-gray-300 cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      {isLoading && <Spinner className="w-5 h-5 text-current" />}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
};

export default SubmitButton;
