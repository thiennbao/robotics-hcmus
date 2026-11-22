"use client";

import { saveAboutPageAction } from "@/lib/actions";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import "react-quill/dist/quill.snow.css";
import { useDebounce } from "use-debounce";
import { ChangeToast, UndoTarget } from "./changeToast";
import { EditablePageBanner } from "./editablePageBanner";
import { cleanEditorElement, cleanEditorHtml, registerImageFigureBlot } from "./quillImageBlot";

interface AboutManagerProps {
  initialBanner: string;
  initialContent: string;
}

const normalizeHtml = (html: string): string => {
  const trimmed = html.trim();
  return trimmed === "<p><br></p>" ? "" : trimmed;
};

export const AboutManager = ({ initialBanner, initialContent }: AboutManagerProps) => {
  const router = useRouter();
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const ReactQuill = useMemo(
    () =>
      dynamic(
        () =>
          import("react-quill").then((mod) => {
            registerImageFigureBlot(mod.default.Quill);
            return mod;
          }),
        {
          ssr: false,
          loading: () => (
            <div className="h-[34rem] w-full rounded-lg bg-gray-900/50 border border-gray-700 animate-pulse flex items-center justify-center text-sm text-gray-400">
              Đang tải trình soạn thảo...
            </div>
          ),
        }
      ),
    []
  );

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "code-block", "link"],
          ["image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
        ],
      },
      clipboard: {
        matchers: [
          [
            "IMG",
            (node: Element, delta: any) => {
              if (node.closest("figure.ql-image-figure")) {
                return delta;
              }
              const Delta = delta.constructor;
              return new Delta().insert({
                image: {
                  src: node.getAttribute("src") || "",
                  alt: node.getAttribute("alt") || "",
                  caption: "",
                },
              });
            },
          ],
        ],
      },
    }),
    []
  );

  const [baseline, setBaseline] = useState({
    banner: initialBanner,
    content: normalizeHtml(initialContent),
  });
  const [banner, setBanner] = useState(initialBanner);
  const [content, setContent] = useState(initialContent);
  const [hasEditedContent, setHasEditedContent] = useState(false);
  const hasEditedRef = useRef(false);
  const [editorKey, setEditorKey] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [undoTarget, setUndoTarget] = useState<UndoTarget | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const isBannerDirty = banner !== baseline.banner;
  const isContentDirty = hasEditedContent && normalizeHtml(content) !== baseline.content;
  const isDirty = isBannerDirty || isContentDirty;

  const draftSignature = `${banner}::${content}`;
  const [debouncedDraft] = useDebounce(draftSignature, 450);
  const showDirtyToast = isDirty && debouncedDraft === draftSignature;

  useEffect(() => {
    const wrapper = editorWrapperRef.current;
    if (!wrapper) return;
    const handleCaptionChange = () => {
      const editorEl = wrapper.querySelector(".ql-editor");
      if (!editorEl) return;
      const cleaned = cleanEditorElement(editorEl);
      hasEditedRef.current = true;
      setHasEditedContent(true);
      setContent(cleaned);
      setUndoTarget(null);
      setFeedback(null);
    };
    wrapper.addEventListener("ql-image-caption-change", handleCaptionChange);
    return () => wrapper.removeEventListener("ql-image-caption-change", handleCaptionChange);
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleConfirmUndo = () => {
    if (!undoTarget) return;
    if (undoTarget === "all" || undoTarget === "banner") {
      setBanner(baseline.banner);
      setBannerError("");
    }
    if (undoTarget === "all" || undoTarget === "content") {
      hasEditedRef.current = false;
      setContent(baseline.content);
      setHasEditedContent(false);
      setEditorKey((prev) => prev + 1);
    }
    setUndoTarget(null);
  };

  const handleSave = async () => {
    if (!isDirty || isSaving) return;
    const editorEl = editorWrapperRef.current?.querySelector(".ql-editor");
    const latestContent = editorEl ? cleanEditorElement(editorEl) : content;
    const latestContentDirty =
      isContentDirty || (hasEditedRef.current && normalizeHtml(latestContent) !== baseline.content);

    setIsSaving(true);
    setUndoTarget(null);
    setFeedback(null);
    setBannerError("");

    try {
      const res = await saveAboutPageAction({
        bannerImage: isBannerDirty ? banner : undefined,
        content: latestContentDirty ? latestContent : undefined,
      });

      if (res.ok) {
        hasEditedRef.current = false;
        setBaseline({
          banner: res.bannerImage,
          content: normalizeHtml(res.content),
        });
        setBanner(res.bannerImage);
        setContent(res.content);
        setHasEditedContent(false);
        setEditorKey((prev) => prev + 1);
        setFeedback({ type: "success", message: "Đã lưu thay đổi trang Giới thiệu." });
        router.refresh();
      } else {
        setFeedback({ type: "error", message: res.error });
      }
    } catch {
      setFeedback({ type: "error", message: "Không thể lưu thay đổi. Vui lòng thử lại." });
    } finally {
      setIsSaving(false);
    }
  };

  const toastMode =
    undoTarget !== null
      ? "confirm-undo"
      : showDirtyToast
        ? "dirty"
        : feedback
          ? "feedback"
          : null;

  return (
    <div className="text-light w-full space-y-6 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl">ABOUT DASHBOARD</h2>
        <Link
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <span>Xem trang thực tế</span>
          <FiExternalLink className="w-4 h-4 text-sky-400" aria-hidden="true" />
        </Link>
      </div>

      <EditablePageBanner
        title="GIỚI THIỆU"
        image={banner}
        isDirty={isBannerDirty}
        disabled={isSaving}
        error={bannerError}
        onImageSelect={(dataUrl) => {
          setBannerError("");
          setBanner(dataUrl);
          setUndoTarget(null);
          setFeedback(null);
        }}
        onError={setBannerError}
      />

      <div className="w-full bg-gray-800 border border-gray-600/70 rounded-xl p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <label className="font-bold text-gray-100">Nội dung trang Giới thiệu</label>
            {isContentDirty && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-900 border border-gray-600/80 text-xs font-medium text-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                <span>Đã chỉnh sửa</span>
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Văn bản và hình ảnh (ảnh đầu tiên và 2 đoạn đầu sẽ tự động đồng bộ sang khối Giới thiệu ở Trang chủ).
          </p>
        </div>

        <div
          ref={editorWrapperRef}
          className={clsx(
            "rounded-lg border bg-gray-900/40 overflow-hidden transition-colors",
            isSaving ? "opacity-70 border-gray-700" : "border-gray-600/70 focus-within:border-sky-500"
          )}
        >
          <ReactQuill
            key={editorKey}
            theme="snow"
            defaultValue={content}
            readOnly={isSaving}
            modules={quillModules}
            onChange={(value, _delta, source) => {
              const editorEl = editorWrapperRef.current?.querySelector(".ql-editor");
              const cleaned = editorEl ? cleanEditorElement(editorEl) : cleanEditorHtml(value);
              if (source !== "user") {
                if (!hasEditedRef.current) {
                  setBaseline((prev) =>
                    prev.content === cleaned ? prev : { ...prev, content: cleaned }
                  );
                }
                return;
              }
              hasEditedRef.current = true;
              setHasEditedContent(true);
              setContent(cleaned);
              setUndoTarget(null);
              setFeedback(null);
            }}
            className={clsx(
              "flex flex-col h-[34rem] bg-gray-800 overflow-hidden",
              "[&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-700 [&_.ql-toolbar]:bg-gray-800",
              "[&_.ql-container]:!border-transparent [&_.ql-container]:flex-1 [&_.ql-container]:min-h-0",
              "[&_.ql-toolbar_.ql-stroke]:fill-none [&_.ql-toolbar_.ql-stroke]:stroke-gray-300",
              "[&_.ql-toolbar_.ql-fill]:fill-gray-300 [&_.ql-toolbar_.ql-fill]:stroke-none",
              "[&_.ql-toolbar_.ql-picker-options]:bg-gray-800 [&_.ql-toolbar_.ql-picker-options]:border-gray-600 [&_.ql-toolbar_.ql-picker]:text-gray-300",
              "[&_.ql-editor]:h-full [&_.ql-editor]:overflow-y-auto [&_.ql-editor]:text-base [&_.ql-editor]:text-gray-100 [&_.ql-editor]:leading-7 [&_.ql-editor]:pb-16",
              "[&_.ql-editor::-webkit-scrollbar]:w-1.5 [&_.ql-editor::-webkit-scrollbar-thumb]:bg-gray-600 [&_.ql-editor::-webkit-scrollbar-thumb]:rounded-full"
            )}
          />
        </div>
      </div>

      <ChangeToast
        mode={toastMode}
        undoTarget={undoTarget ?? "all"}
        isBannerDirty={isBannerDirty}
        isContentDirty={isContentDirty}
        isSaving={isSaving}
        feedback={feedback}
        onRequestUndo={(target) => setUndoTarget(target)}
        onConfirmUndo={handleConfirmUndo}
        onCancelUndo={() => setUndoTarget(null)}
        onSave={handleSave}
        onDismissFeedback={() => setFeedback(null)}
      />
    </div>
  );
};
