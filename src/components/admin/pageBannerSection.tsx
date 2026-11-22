"use client";

import { savePageBannerAction } from "@/lib/actions";
import type { PageSlug } from "@/lib/pageConfig";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionButton } from "./actionButton";
import { ChangeToast } from "./changeToast";
import { EditablePageBanner } from "./editablePageBanner";

interface PageBannerSectionProps {
  slug: Exclude<PageSlug, "about">;
  title: string;
  initialBanner: string;
  className?: string;
}

export const PageBannerSection = ({
  slug,
  title,
  initialBanner,
  className,
}: PageBannerSectionProps) => {
  const router = useRouter();
  const [baselineBanner, setBaselineBanner] = useState(initialBanner);
  const [banner, setBanner] = useState(initialBanner);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmUndoOpen, setConfirmUndoOpen] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const isDirty = banner !== baselineBanner;

  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleSave = async () => {
    if (!isDirty || isSaving) return;
    setIsSaving(true);
    setConfirmUndoOpen(false);
    setFeedback(null);
    setError("");

    try {
      const res = await savePageBannerAction(slug, banner);
      if (res.ok) {
        setBaselineBanner(res.bannerImage);
        setBanner(res.bannerImage);
        setFeedback({ type: "success", message: "Đã lưu banner mới." });
        router.refresh();
      } else {
        setFeedback({ type: "error", message: res.error });
      }
    } catch {
      setFeedback({ type: "error", message: "Không thể lưu banner. Vui lòng thử lại." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmUndo = () => {
    setBanner(baselineBanner);
    setError("");
    setConfirmUndoOpen(false);
  };

  const toastMode = confirmUndoOpen ? "confirm-undo" : feedback ? "feedback" : null;

  return (
    <div className={clsx("w-full", className)}>
      <EditablePageBanner
        title={title}
        image={banner}
        isDirty={isDirty}
        disabled={isSaving}
        error={error}
        onImageSelect={(dataUrl) => {
          setError("");
          setBanner(dataUrl);
          setConfirmUndoOpen(false);
          setFeedback(null);
        }}
        onError={setError}
      />

      {isDirty && (
        <div className="mt-3 p-4 rounded-xl bg-gray-800 border border-gray-600/70">
          <p className="text-sm font-semibold text-gray-100 mb-3">Lưu banner mới?</p>
          <div className="flex items-center gap-3">
            <ActionButton
              type="button"
              variant="secondary"
              size="sm"
              disabled={isSaving}
              onClick={() => setConfirmUndoOpen(true)}
            >
              Hoàn tác
            </ActionButton>
            <ActionButton
              type="button"
              variant="primary"
              size="sm"
              loading={isSaving}
              loadingText="Đang lưu..."
              onClick={handleSave}
            >
              Lưu
            </ActionButton>
          </div>
        </div>
      )}

      <ChangeToast
        mode={toastMode}
        undoTarget="banner"
        feedback={feedback}
        onCancelUndo={() => setConfirmUndoOpen(false)}
        onConfirmUndo={handleConfirmUndo}
        onDismissFeedback={() => setFeedback(null)}
      />
    </div>
  );
};
