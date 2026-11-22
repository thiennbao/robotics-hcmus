"use client";

import { importAction } from "@/lib/actions";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import { Spinner } from "../admin/actionButton";
import Confirm from "../utils/confirm";

const Statistic = ({ model, icon, data }: { model: Prisma.ModelName; icon: JSX.Element; data: any[] }) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [data]);

  const handleImport = (file?: File) => {
    if (!file || isImporting) return;
    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await importAction(model, reader.result as string);
        setStatus(res.message);
      } catch {
        setStatus("error");
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      setIsImporting(false);
      setStatus("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  const canExport = Boolean(downloadUrl) && data.length > 0;

  return (
    <div className="bg-gray-600 p-4 rounded-lg">
      <div className="font-bold">
        {icon} <span>{model}</span>
      </div>
      <div className="flex h-12 justify-center items-center my-4 text-xl bg-gray-800 rounded-lg">{data.length}</div>
      <div className="w-full grid grid-cols-2 gap-x-2">
        <input
          ref={fileInputRef}
          name="import"
          id={`import/${model}`}
          type="file"
          accept="application/JSON"
          disabled={isImporting}
          onChange={(e) => handleImport(e.target.files?.[0])}
          hidden
        />
        <button
          type="button"
          disabled={isImporting}
          aria-busy={isImporting || undefined}
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            "rounded-lg border border-sky-500 text-sky-500 flex justify-center gap-x-2 items-center px-4 py-2 transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
            isImporting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-sky-400 hover:text-white hover:-translate-y-[1px] active:scale-[0.985] cursor-pointer"
          )}
        >
          {isImporting ? (
            <>
              <Spinner className="w-4 h-4" />
              <span>Đang nhập...</span>
            </>
          ) : (
            <>
              <CiImport className="text-xl" />
              <span>Import</span>
            </>
          )}
        </button>

        {canExport ? (
          <a
            href={downloadUrl}
            download={`${model}.json`}
            className="rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-400 hover:text-white hover:-translate-y-[1px] active:scale-[0.985] transition-all duration-150 flex justify-center gap-x-2 items-center px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <CiExport className="text-xl" />
            <span>Export</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="rounded-lg border border-sky-500 text-sky-500 opacity-50 cursor-not-allowed flex justify-center gap-x-2 items-center px-4 py-2"
          >
            <CiExport className="text-xl" />
            <span>Export</span>
          </button>
        )}

        {status === "success" && (
          <Confirm
            title={`Import ${model}`}
            message="Nhập dữ liệu thành công"
            type="success"
            close={() => setStatus("")}
          />
        )}
        {status === "error" && (
          <Confirm
            title={`Import ${model}`}
            message="Không thể nhập dữ liệu, vui lòng đảm bảo file ở định dạng JSON, đúng cú pháp và chứa dữ liệu hợp lệ"
            type="warning"
            close={() => setStatus("")}
          />
        )}
      </div>
    </div>
  );
};

export default Statistic;
