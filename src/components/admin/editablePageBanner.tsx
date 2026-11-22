"use client";

import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Spinner } from "./actionButton";

const MAX_BANNER_BYTES = 10 * 1024 * 1024;

interface EditablePageBannerProps {
  title: string;
  image: string;
  isDirty?: boolean;
  disabled?: boolean;
  error?: string;
  onImageSelect: (dataUrl: string) => void;
  onError?: (message: string) => void;
  className?: string;
}

export const EditablePageBanner = ({
  title,
  image,
  isDirty = false,
  disabled = false,
  error,
  onImageSelect,
  onError,
  className,
}: EditablePageBannerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError?.("Chỉ hỗ trợ tệp hình ảnh.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_BANNER_BYTES) {
      onError?.("Dung lượng ảnh tối đa 10MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onError?.("");
        onImageSelect(reader.result);
      }
    };
    reader.onerror = () => {
      onError?.("Không thể đọc tệp hình ảnh. Vui lòng thử lại.");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <div className={clsx("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        hidden
      />
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Thay đổi banner ${title}`}
        aria-disabled={disabled || undefined}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        className={clsx(
          "w-full aspect-video lg:aspect-auto lg:h-[50vh] relative rounded-xl overflow-hidden",
          "border border-gray-600/70 bg-gray-800 select-none group",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
          disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className={clsx(
            "absolute inset-0 w-full h-full object-cover",
            "transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transform-none",
            !disabled && "group-hover:scale-[1.02]"
          )}
        />
        <div
          className={clsx(
            "absolute inset-0 bg-black/75 transition-colors duration-200",
            !disabled && "group-hover:bg-black/80 group-focus-visible:bg-black/80"
          )}
        />

        {isDirty && !disabled && (
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-900/90 border border-gray-600/80 text-xs font-medium text-gray-200">
            <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
            <span>Xem trước · Chưa lưu</span>
          </div>
        )}

        {!disabled && (
          <div className="hidden [@media(hover:none)]:inline-flex absolute bottom-3 right-3 z-10 items-center gap-1.5 px-3 py-1 rounded-md bg-gray-900/90 border border-gray-600/80 text-xs font-medium text-gray-200">
            <LuImagePlus className="text-sky-400" />
            <span>Chạm để đổi ảnh</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          {disabled ? (
            <div className="inline-flex items-center gap-3 text-xl md:text-2xl font-bold text-white">
              <Spinner className="w-6 h-6 text-sky-400" />
              <span>Đang lưu...</span>
            </div>
          ) : (
            <div className="relative flex items-center justify-center min-h-[3rem] w-full">
              <span
                className={clsx(
                  "text-3xl md:text-4xl font-bold text-white tracking-tight",
                  "transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none",
                  "group-hover:opacity-0 group-hover:-translate-y-1",
                  "group-focus-visible:opacity-0 group-focus-visible:-translate-y-1"
                )}
              >
                {title}
              </span>
              <span
                className={clsx(
                  "absolute inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-white tracking-tight",
                  "opacity-0 translate-y-1 transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none",
                  "group-hover:opacity-100 group-hover:translate-y-0",
                  "group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                )}
              >
                <LuImagePlus className="text-sky-400" aria-hidden="true" />
                <span>Import</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
