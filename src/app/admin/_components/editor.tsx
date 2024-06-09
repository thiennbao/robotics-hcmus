"use client";

import dynamic from "next/dynamic";
import { HTMLAttributes, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  errorMsg?: string;
}

export const InputFieldOld = ({
  label,
  required = false,
  readonly = false,
  placeholder = "",
  errorMsg = "",
  ...props
}: Props) => {
  const invalid = false; // Placehoder, valide later

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        placeholder={placeholder}
        className="w-full p-2 bg-gray-800 outline-none border border-transparent focus:border-gray-500 invalid:border-red-500 rounded-lg"
      />
      {invalid && <span className="text-red-400 text-sm">{errorMsg}</span>}
    </div>
  );
};

export const TextField = ({
  label,
  required = false,
  readonly = false,
  placeholder = "",
  errorMsg = "",
  ...props
}: Props) => {
  const invalid = false; // Placehoder, valide later

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full h-60 p-2 bg-gray-800 outline-none border border-transparent focus:border-gray-500 invalid:border-red-500 rounded-lg"
      />
      {invalid && <span className="text-red-400 text-sm">{errorMsg}</span>}
    </div>
  );
};

export const RichTextField = ({
  label,
  required = false,
  readonly = false,
  errorMsg = "",
  ...props
}: Props) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const [value, setValue] = useState("");
  const invalid = false; // Placehoder, valide later

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <ReactQuill
        className="rounded-xl h-80 text-gray-300 bg-gray-800 [&_.ql-toolbar]:!border-none [&_.ql-container]:!border-none [&_.ql-toolbar_.ql-stroke]:fill-none [&_.ql-toolbar_.ql-stroke]:stroke-gray-300 [&_.ql-toolbar_.ql-fill]:fill-gray-300 [&_.ql-toolbar_.ql-fill]:stroke-none [&_.ql-toolbar_.ql-picker]:text-gray-300"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ script: "sub" }, { script: "super" }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
            ],
          },
        }}
      />
      {invalid && <span className="text-red-400 text-sm">{errorMsg}</span>}
    </div>
  );
};

export const ImageField = ({
  label,
  required = false,
  readonly = false,
  errorMsg = "",
  ...props
}: Props) => {
  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 bg-gray-800 outline-none border border-transparent focus:border-gray-500 invalid:border-red-500 rounded-t-lg file:hidden"
      />
      <label className="block bg-gray-800 rounded-b-lg p-2">
        <img src="/picsum-1.png" className="h-60 aspect-video object-cover mx-auto rounded-lg" />
      </label>
    </div>
  );
};

export const MultiImageField = ({
  label,
  required = false,
  readonly = false,
  errorMsg = "",
  ...props
}: Props) => {
  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 bg-gray-800 outline-none border border-transparent focus:border-gray-500 invalid:border-red-500 rounded-t-lg file:hidden"
      />
      <label className="grid grid-cols-2 lg:grid-cols-3 gap-2 bg-gray-800 rounded-b-lg p-2">
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
        <img src="/picsum-1.png" className="aspect-video object-cover mx-auto rounded-lg" />
      </label>
    </div>
  );
};
