"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IoChevronUp, IoClose } from "react-icons/io5";
import { PiCheckCircleFill, PiWarningFill } from "react-icons/pi";
import { ActionButton } from "./actionButton";

export type UndoTarget = "all" | "banner" | "content";

export interface ChangeToastProps {
  mode: "dirty" | "confirm-undo" | "feedback" | null;
  undoTarget?: UndoTarget;
  isBannerDirty?: boolean;
  isContentDirty?: boolean;
  isSaving?: boolean;
  feedback?: { type: "success" | "error"; message: string } | null;
  onRequestUndo?: (target: UndoTarget) => void;
  onConfirmUndo?: () => void;
  onCancelUndo?: () => void;
  onSave?: () => void;
  onDismissFeedback?: () => void;
}

const UNDO_SCOPE_DESCRIPTION: Record<UndoTarget, string> = {
  all: "Toàn bộ banner và nội dung sẽ trở về mốc ban đầu.",
  banner: "Ảnh banner sẽ trở về mốc ban đầu.",
  content: "Nội dung trang sẽ trở về mốc ban đầu.",
};

export const ChangeToast = ({
  mode,
  undoTarget = "all",
  isBannerDirty = false,
  isContentDirty = false,
  isSaving = false,
  feedback,
  onRequestUndo,
  onConfirmUndo,
  onCancelUndo,
  onSave,
  onDismissFeedback,
}: ChangeToastProps) => {
  const [dropupOpen, setDropupOpen] = useState(false);
  const splitGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "dirty" || isSaving) {
      setDropupOpen(false);
    }
  }, [mode, isSaving]);

  useEffect(() => {
    if (mode !== "confirm-undo") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancelUndo?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, onCancelUndo]);

  useEffect(() => {
    if (!dropupOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (splitGroupRef.current && !splitGroupRef.current.contains(event.target as Node)) {
        setDropupOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dropupOpen]);

  useEffect(() => {
    if (mode !== "feedback" || feedback?.type !== "success") return;
    const timer = window.setTimeout(() => {
      onDismissFeedback?.();
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [mode, feedback, onDismissFeedback]);

  if (!mode) return null;

  return (
    <aside
      role={mode === "confirm-undo" ? "alertdialog" : "status"}
      aria-live="polite"
      className={clsx(
        "fixed bottom-6 right-6 z-50 w-[min(25rem,calc(100vw-2rem))]",
        "rounded-xl bg-gray-800 border border-gray-600/80 shadow-2xl p-4 text-gray-100",
        "transition-all duration-150 ease-[cubic-bezier(.2,.8,.2,1)]"
      )}
    >
      {mode === "dirty" && (
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-gray-100">Có thay đổi mới.</p>
          </div>
          {feedback?.type === "error" && (
            <div
              role="alert"
              className="mb-3 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
            >
              <PiWarningFill className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="flex-1 break-words">{feedback.message}</span>
              {onDismissFeedback && (
                <button
                  type="button"
                  aria-label="Đóng thông báo lỗi"
                  onClick={onDismissFeedback}
                  className="text-red-300/80 hover:text-red-200 transition-colors"
                >
                  <IoClose className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <div
              ref={splitGroupRef}
              className="relative w-full min-w-0 inline-flex items-stretch rounded-lg border border-gray-600 bg-gray-700/70 text-gray-100"
            >
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  setDropupOpen(false);
                  onRequestUndo?.("all");
                }}
                className={clsx(
                  "flex-1 min-w-0 px-2.5 py-2 text-sm font-medium text-center whitespace-nowrap rounded-l-lg",
                  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                  isSaving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-600/80 active:bg-gray-600 cursor-pointer"
                )}
              >
                Hoàn tác toàn bộ
              </button>

              <span className="w-px self-stretch my-1.5 bg-gray-500/80 shrink-0" aria-hidden="true" />

              <div
                className="relative flex items-stretch"
                onMouseEnter={() => {
                  if (!isSaving) setDropupOpen(true);
                }}
                onMouseLeave={() => setDropupOpen(false)}
              >
                <button
                  type="button"
                  aria-label="Tùy chọn hoàn tác"
                  aria-expanded={dropupOpen}
                  aria-haspopup="menu"
                  disabled={isSaving}
                  onClick={() => {
                    if (!isSaving) setDropupOpen((prev) => !prev);
                  }}
                  className={clsx(
                    "px-2 inline-flex items-center justify-center rounded-r-lg",
                    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                    isSaving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-600/80 active:bg-gray-600 cursor-pointer"
                  )}
                >
                  <IoChevronUp
                    className={clsx(
                      "w-3.5 h-3.5 text-gray-300 transition-transform duration-150",
                      dropupOpen && "text-white -translate-y-0.5"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {dropupOpen && !isSaving && (
                  <div className="absolute bottom-full right-0 pb-2 min-w-[12.5rem] z-50">
                    <div
                      role="menu"
                      aria-label="Tùy chọn hoàn tác từng phần"
                      className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        disabled={!isBannerDirty}
                        onClick={() => {
                          setDropupOpen(false);
                          onRequestUndo?.("banner");
                        }}
                        className={clsx(
                          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                          isBannerDirty
                            ? "text-gray-100 hover:bg-gray-700 cursor-pointer"
                            : "text-gray-500 opacity-50 cursor-not-allowed"
                        )}
                      >
                        Hoàn tác banner
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        disabled={!isContentDirty}
                        onClick={() => {
                          setDropupOpen(false);
                          onRequestUndo?.("content");
                        }}
                        className={clsx(
                          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                          isContentDirty
                            ? "text-gray-100 hover:bg-gray-700 cursor-pointer"
                            : "text-gray-500 opacity-50 cursor-not-allowed"
                        )}
                      >
                        Hoàn tác nội dung
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ActionButton
              type="button"
              variant="primary"
              size="sm"
              loading={isSaving}
              loadingText="Đang lưu..."
              onClick={onSave}
              className="w-full"
            >
              Lưu
            </ActionButton>
          </div>
        </div>
      )}

      {mode === "confirm-undo" && (
        <div>
          <p className="text-sm font-semibold text-gray-100">Xác nhận hoàn tác</p>
          <p className="mt-1 mb-3 text-xs text-gray-400">{UNDO_SCOPE_DESCRIPTION[undoTarget]}</p>
          <div className="grid grid-cols-2 gap-2.5">
            <ActionButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onCancelUndo}
              className="w-full"
            >
              Không
            </ActionButton>
            <ActionButton
              type="button"
              variant="danger"
              size="sm"
              onClick={onConfirmUndo}
              className="w-full"
            >
              Hoàn tác
            </ActionButton>
          </div>
        </div>
      )}

      {mode === "feedback" && feedback && (
        <div className="flex items-start gap-3">
          {feedback.type === "success" ? (
            <PiCheckCircleFill className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <PiWarningFill className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-100">
              {feedback.type === "success" ? "Đã lưu thành công" : "Lưu thất bại"}
            </p>
            <p className="mt-0.5 text-xs text-gray-300 break-words">{feedback.message}</p>
          </div>
          {onDismissFeedback && (
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={onDismissFeedback}
              className="p-1 rounded-md text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <IoClose className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
