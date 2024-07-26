"use client";

import { importAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import Confirm from "../utils/confirm";

const Statistic = ({
  title,
  icon,
  items,
}: {
  title:
    | "navigations"
    | "contacts"
    | "banners"
    | "courses"
    | "news"
    | "messages"
    | "registers"
    | "users";
  icon: JSX.Element;
  items: any[];
}) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const bytes = new TextEncoder().encode(JSON.stringify(items));
    const blob = new Blob([bytes], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [items]);

  const handleImport = (file?: File) => {
    if (!file) return;
    const importData = async (res: string) => {
      const data = JSON.parse(res);
      const status = await importAction(title, data);
      setStatus(status.message);
    };

    const reader = new FileReader();
    reader.onload = async () => await importData(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-600 p-4 rounded-lg">
      <div className="font-bold">
        {icon} <span className="capitalize">{title}</span>
      </div>
      <div className="flex h-12 justify-center items-center my-4 text-xl bg-gray-800 rounded-lg">
        {items.length}
      </div>
      <div className="flex justify-end gap-2 *:flex-1">
        <button className="rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-400 hover:text-white">
          <label htmlFor={`import/${title}`} className="block px-4 py-2 cursor-pointer">
            <CiImport className="inline align-middle text-xl" /> Import
            <input
              name="import"
              id={`import/${title}`}
              type="file"
              accept="application/JSON"
              onChange={(e) => handleImport(e.target.files?.[0])}
              hidden
            />
          </label>
        </button>
        <button className="rounded-lg border border-sky-500 text-sky-500 hover:bg-sky-400 hover:text-white">
          <a href={downloadUrl} download={`${title}.json`} className="block px-4 py-2">
            <CiExport className="inline align-middle text-xl" /> Export
          </a>
        </button>
        {status === "success" && (
          <Confirm
            title={`Import ${title}`}
            message="Import file sucessfully"
            type="success"
            close={() => setStatus("")}
          />
        )}
        {status === "error" && (
          <Confirm
            title={`Import ${title}`}
            message="Cannot import your file, please check you input again."
            type="warning"
            close={() => setStatus("")}
          />
        )}
      </div>
    </div>
  );
};

export default Statistic;
