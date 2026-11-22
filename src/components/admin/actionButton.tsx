"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={clsx("w-4 h-4 animate-spin shrink-0 motion-reduce:animate-none", className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V1C5.925 1 1 5.925 1 12h3zm2 5.291A7.962 7.962 0 014 12H1c0 3.042 1.135 5.824 3 7.938l2-2.647z"
    />
  </svg>
);

export type ActionButtonVariant = "primary" | "secondary" | "outline" | "danger" | "warning" | "success";
export type ActionButtonSize = "sm" | "md";

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

const VARIANT_CLASSES: Record<ActionButtonVariant, string> = {
  primary: "bg-sky-500 border border-sky-500 text-white hover:bg-sky-400 hover:border-sky-400",
  secondary: "bg-gray-700/80 border border-gray-600 text-gray-200 hover:bg-gray-600 hover:text-white",
  outline: "border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white",
  danger: "bg-red-500/15 border border-red-500/70 text-red-400 hover:bg-red-500 hover:text-white",
  warning: "border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white",
  success: "border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
};

const SIZE_CLASSES: Record<ActionButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-lg",
};

export const ActionButton = ({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  icon,
  disabled,
  className,
  children,
  ...props
}: ActionButtonProps) => {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium select-none",
        "transition-all duration-150 ease-[cubic-bezier(.2,.8,.2,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
        "motion-reduce:transform-none motion-reduce:transition-none",
        !isDisabled && "hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.985] cursor-pointer",
        isDisabled && "opacity-50 cursor-not-allowed translate-y-0 scale-100",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {loading ? <Spinner /> : icon}
      <span>{loading && loadingText ? loadingText : children}</span>
    </button>
  );
};

export const FormSubmitButton = ({
  children,
  ...props
}: Omit<ActionButtonProps, "loading" | "type">) => {
  const { pending } = useFormStatus();

  return (
    <ActionButton type="submit" loading={pending} {...props}>
      {children}
    </ActionButton>
  );
};
