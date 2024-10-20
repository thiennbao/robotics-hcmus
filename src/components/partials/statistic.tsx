"use client";

import { importAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import Confirm from "../utils/confirm";
import { Prisma } from "@prisma/client";

const Statistic = ({ model, icon, data }: { model: Prisma.ModelName; icon: JSX.Element; data: any[] }) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [data]);

  const handleImport = (file?: File) => {
    if (!file) return;
    const importData = async (res: string) => {
      const status = await importAction(model, res);
      setStatus(status.message);
    };

    const reader = new FileReader();
    reader.onload = async () => await importData(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-600 p-4 rounded-lg">
      <div className="font-bold">
        {icon} <span>{model}</span>
      </div>
      <div className="flex h-12 justify-center items-center my-4 text-xl bg-gray-800 rounded-lg">{data.length}</div>
      <div className="w-full grid grid-cols-2 gap-x-2">
        <button className="rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-400 hover:text-white">
          <label htmlFor={`import/${model}`} className="flex justify-center gap-x-2 items-center px-4 py-2 cursor-pointer">
            <CiImport className="text-xl" />
            <span>Import</span>
          </label>
          <input
            name="import"
            id={`import/${model}`}
            type="file"
            accept="application/JSON"
            onChange={(e) => handleImport(e.target.files?.[0])}
            hidden
          />
        </button>
        <button className="rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-400 hover:text-white">
          <a href={downloadUrl} download={`${model}.json`} className="flex justify-center gap-x-2 items-center px-4 py-2">
            <CiExport className="text-xl" />
            <span>Export</span>
          </a>
        </button>
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
