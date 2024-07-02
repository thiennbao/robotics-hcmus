"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { HTMLProps, useMemo, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "react-quill/dist/quill.snow.css";

interface Props<InputType> extends HTMLProps<HTMLDivElement> {
  label: string;
  errorMsg?: string;
  inputOpt?: HTMLProps<InputType>;
}

export const InputField = ({ label, errorMsg, inputOpt, ...props }: Props<HTMLInputElement>) => {
  const [hasFocused, setHasFocused] = useState(false);

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {inputOpt?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        {...inputOpt}
        onClick={() => setHasFocused(true)}
        className={clsx(
          "peer w-full p-2 rounded-lg bg-gray-800 outline-none border border-transparent focus:border-sky-500",
          hasFocused && "invalid:border-red-400"
        )}
      />
      <span className="hidden peer-invalid:block mt-1 text-red-400 text-sm">
        {hasFocused && errorMsg}
      </span>
    </div>
  );
};

export const TextField = ({ label, errorMsg, inputOpt, ...props }: Props<HTMLTextAreaElement>) => {
  const [hasFocused, setHasFocused] = useState(false);

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {inputOpt?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <textarea
        {...inputOpt}
        onClick={() => setHasFocused(true)}
        className={clsx(
          "peer w-full h-60 p-2 rounded-lg bg-gray-800 outline-none border border-transparent focus:border-sky-500 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-600",
          hasFocused && "invalid:border-red-400"
        )}
      />
      <span className="hidden peer-invalid:block mt-1 text-red-400 text-sm">
        {hasFocused && errorMsg}
      </span>
    </div>
  );
};

export const RichTextField = ({ label, errorMsg, inputOpt, ...props }: Props<HTMLInputElement>) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const [content, setContent] = useState<string>(inputOpt?.defaultValue as string);
  const [hasFocused, setHasFocused] = useState(false);

  // Quill library issue (value is "<p><br></p>" when all input's deleted)
  const handleChange = (value: string) => {
    setContent(value === "<p><br></p>" ? "" : value);
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {inputOpt?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input {...inputOpt} defaultValue={content} key={content} hidden className="peer" />
      <div
        onClick={() => setHasFocused(true)}
        className={clsx(
          "rounded-lg border border-transparent focus-within:border-sky-500",
          hasFocused && "peer-invalid:border-red-400"
        )}
      >
        <ReactQuill
          className={clsx(
            "rounded-lg h-[40rem] bg-gray-800 overflow-hidden",
            "[&_.ql-toolbar]:!border-transparent [&_.ql-container]:!border-transparent",
            "[&_.ql-toolbar_.ql-stroke]:fill-none [&_.ql-toolbar_.ql-stroke]:stroke-gray-300",
            "[&_.ql-toolbar_.ql-fill]:fill-gray-300 [&_.ql-toolbar_.ql-fill]:stroke-none",
            "[&_.ql-toolbar_.ql-picker-options]:bg-gray-800 [&_.ql-toolbar_.ql-picker]:text-gray-300",
            "[&_.ql-editor]:text-base [&_.ql-editor]:pb-16 [&_.ql-editor::-webkit-scrollbar]:w-1 [&_.ql-editor::-webkit-scrollbar-thumb]:bg-gray-600"
          )}
          theme="snow"
          value={content}
          onChange={handleChange}
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
      </div>
      <span className="hidden peer-invalid:block mt-1 text-red-400 text-sm">
        {hasFocused && errorMsg}
      </span>
    </div>
  );
};

export const ImageField = ({ label, errorMsg, inputOpt, ...props }: Props<HTMLInputElement>) => {
  const [hasFocused, setHasFocused] = useState(false);
  const [image, setImage] = useState<string>(inputOpt?.defaultValue as string);

  const handleUpload = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {inputOpt?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input {...inputOpt} defaultValue={image} key={image} hidden className="peer" />
      <input
        type="file"
        accept="image/*"
        id={`${inputOpt?.name || ""}/file`}
        onChange={(e) => handleUpload(e.target.files?.[0])}
        hidden
      />
      <label
        htmlFor={`${inputOpt?.name || ""}/file`}
        onClick={() => setHasFocused(true)}
        className={clsx(
          "block p-4 rounded-lg bg-gray-800 border border-transparent",
          hasFocused && "peer-invalid:border-red-400"
        )}
      >
        {image ? (
          <div className="h-60 relative">
            <div
              className="absolute right-0 m-2 p-2 bg-gray-900 bg-opacity-50 hover:bg-opacity-80 transition rounded-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
            >
              <RiDeleteBin2Fill className="text-red-500" />
            </div>
            <img src={image} className="w-full h-full rounded-lg object-cover" />
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 border-2 border-dashed border-gray-500 rounded-lg">
            <LuImagePlus className="text-4xl text-gray-500" />
          </div>
        )}
      </label>
      <span className="hidden peer-invalid:block mt-1 text-red-400 text-sm">
        {hasFocused && errorMsg}
      </span>
    </div>
  );
};

export const MultiImageField = ({
  label,
  errorMsg,
  inputOpt,
  ...props
}: Props<HTMLInputElement>) => {
  const [hasFocused, setHasFocused] = useState(false);
  const [images, setImages] = useState<string[]>(inputOpt?.defaultValue as string[]);

  const handleUpload = (fileList: FileList | null) => {
    if (fileList) {
      const { length, ...files } = fileList;
      for (let index in files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = () => {
          setImages((images) => [...images, reader.result as string]);
        };
      }
    }
  };
  const handleDelete = (deletedIndex: number) => {
    setImages(images.filter((image, index) => index !== deletedIndex));
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {inputOpt?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        {...inputOpt}
        defaultValue={JSON.stringify(images)}
        key={JSON.stringify(images)}
        hidden
        className="peer"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        name={`${inputOpt?.name || ""}/file`}
        id={`${inputOpt?.name || ""}/file`}
        onChange={(e) => handleUpload(e.target.files)}
        hidden
      />
      <label
        htmlFor={`${inputOpt?.name || ""}/file`}
        onClick={() => setHasFocused(true)}
        className={clsx(
          "grid grid-cols-2 lg:grid-cols-3 gap-2 p-4 rounded-lg bg-gray-800 border border-transparent",
          hasFocused && "peer-invalid:border-red-400"
        )}
      >
        {images?.length ? (
          <>
            {images.map((image, index) => (
              <div key={index} className="block h-60 aspect-video max-w-full mx-auto relative">
                <div
                  className="absolute right-0 m-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(index);
                  }}
                >
                  <RiDeleteBin2Fill className="text-red-500" />
                </div>
                <img src={image} className="w-full h-full rounded-lg object-cover" />
              </div>
            ))}
            <div className="flex justify-center items-center h-60 border-2 border-dashed border-gray-500 rounded-lg">
              <LuImagePlus className="text-4xl text-gray-500" />
            </div>
          </>
        ) : (
          <div className="col-span-full flex justify-center items-center h-60 border-2 border-dashed border-gray-500 rounded-lg">
            <LuImagePlus className="text-4xl text-gray-500" />
          </div>
        )}
      </label>
    </div>
  );
};