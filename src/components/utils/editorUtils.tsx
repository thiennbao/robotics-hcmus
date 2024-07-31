"use client";

import { validate, Validation } from "@/lib/validation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { HTMLProps, useEffect, useMemo, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "react-quill/dist/quill.snow.css";
import Confirm from "./confirm";
import Image from "next/image";

interface Props extends HTMLProps<HTMLDivElement> {
  label: string;
  inputAttr: {
    name: string;
    defaultValue?: string;
    placeholder?: string;
    readOnly?: boolean;
    type?: "password";
  };
  validation?: Validation;
  submitErr?: { [key: string]: string };
}

export const InputField = ({ label, inputAttr, validation, submitErr, ...props }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        {...inputAttr}
        onChange={(e) => setErrorMsg(validation ? validate(e.target.value, validation) : "")}
        className={clsx(
          "w-full p-2 rounded-lg bg-gray-800 outline-none border focus:border-sky-500",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      />
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
    </div>
  );
};

export const TextField = ({ label, inputAttr, validation, submitErr, ...props }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <textarea
        {...inputAttr}
        onChange={(e) => setErrorMsg(validation ? validate(e.target.value, validation) : "")}
        className={clsx(
          "w-full h-60 p-2 rounded-lg bg-gray-800 outline-none border focus:border-sky-500 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-600",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      />
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
    </div>
  );
};

export const ImageField = ({ label, inputAttr, validation, submitErr, ...props }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState<string>(inputAttr.defaultValue as string);
  const [overSize, setOverSize] = useState(false);

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  const handleUpload = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if ((reader.result as string).length >= 1024 ** 2) return setOverSize(true);
        setImage(reader.result as string);
        setErrorMsg("");
      };
    }
  };
  const handleDelete = () => {
    setImage("");
    setErrorMsg(validation?.required?.message || "");
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input {...inputAttr} defaultValue={image} key={image} hidden />
      <input
        type="file"
        accept="image/*"
        id={`${inputAttr.name}/file`}
        onChange={(e) => handleUpload(e.target.files?.[0])}
        hidden
      />
      <label
        htmlFor={`${inputAttr.name}/file`}
        className={clsx(
          "block p-4 rounded-lg bg-gray-800 border",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      >
        {image ? (
          <div className="h-60 relative">
            {/* Preview image */}
            <Image src={image} alt="Uploaded image" className="w-full h-full rounded-lg object-cover" />
            {/* Delete button */}
            <div
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="absolute top-0 right-0 m-2 p-2 bg-gray-900 bg-opacity-50 hover:bg-opacity-80 transition rounded-lg cursor-pointer"
            >
              <RiDeleteBin2Fill className="text-red-500" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 border-2 border-dashed border-gray-500 rounded-lg">
            <LuImagePlus className="text-4xl text-gray-500" />
          </div>
        )}
      </label>
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
      {overSize && (
        <Confirm
          title="Upload failed"
          message="Your image seems to be too large, please try with a smaller image again"
          type="warning"
          close={() => setOverSize(false)}
        />
      )}
    </div>
  );
};

export const MultiImageField = ({ label, inputAttr, validation, submitErr, ...props }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState<string[]>(JSON.parse(inputAttr.defaultValue || "[]"));
  const [overSize, setOverSize] = useState(false);

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  const handleUpload = (fileList: FileList | null) => {
    if (fileList) {
      const { length, ...files } = fileList;
      for (let index in files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = () => {
          if ((reader.result as string).length >= 1024 ** 2) return setOverSize(true);
          setImages((images) => [...images, reader.result as string]);
          setErrorMsg("");
        };
      }
    }
  };
  const handleDelete = (deletedIndex: number) => {
    const remainImage = images.filter((_image, index) => index !== deletedIndex);
    setImages(remainImage);
    setErrorMsg(remainImage.length ? "" : (validation?.required?.message as string));
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {images.map((image, index) => (
        <input {...inputAttr} defaultValue={image} key={image + index} hidden />
      ))}
      <input
        type="file"
        accept="image/*"
        multiple
        name={`${inputAttr.name}/file`}
        id={`${inputAttr.name}/file`}
        onChange={(e) => handleUpload(e.target.files)}
        hidden
      />
      <label
        htmlFor={`${inputAttr.name}/file`}
        className={clsx(
          errorMsg ? "border-red-400" : "border-transparent",
          "grid grid-cols-2 lg:grid-cols-3 gap-2 p-4 rounded-lg bg-gray-800 border"
        )}
      >
        {images.length ? (
          <>
            {images.map((image, index) => (
              <div key={index} className="block h-60 aspect-video max-w-full mx-auto relative">
                {/* Preview image */}
                <Image src={image} alt="Uploaded image" className="w-full h-full rounded-lg object-cover" />
                {/* Delete button */}
                <div
                  className="absolute top-0 right-0 m-2 p-2 bg-gray-900 bg-opacity-50 rounded-lg cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(index);
                  }}
                >
                  <RiDeleteBin2Fill className="text-red-500" />
                </div>
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
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
      {overSize && (
        <Confirm
          title="Upload failed"
          message="Your image seems to be too large, please try with a smaller image again"
          type="warning"
          close={() => setOverSize(false)}
        />
      )}
    </div>
  );
};

export const RichTextField = ({ label, inputAttr, validation, submitErr, ...props }: Props) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  const [errorMsg, setErrorMsg] = useState("");
  const [content, setContent] = useState<string>(inputAttr.defaultValue || "");

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  // Quill library issue (value is "<p><br></p>" when all input's deleted)
  const handleChange = (value: string) => {
    setContent(value === "<p><br></p>" ? "" : value);
    setErrorMsg(validation ? validate(value === "<p><br></p>" ? "" : value, validation) : "");
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input {...inputAttr} defaultValue={content} key={content} hidden />
      <div
        className={clsx(
          "rounded-lg border focus-within:border-sky-500",
          errorMsg ? "border-red-400" : "border-transparent"
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
                [{ header: [1, 2, 3] }],
                ["bold", "italic", "underline", "strike", "code-block", "link"],
                ["image", "video"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["clean"],
              ],
            },
          }}
        />
      </div>
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
    </div>
  );
};

export const SelectField = ({
  label,
  inputAttr,
  validation,
  submitErr,
  options,
  ...props
}: { options: string[] } & Props) => {
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg(submitErr?.[inputAttr.name] || "");
  }, [submitErr, inputAttr.name]);

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <select
        {...inputAttr}
        onChange={(e) => setErrorMsg(validation ? validate(e.target.value, validation) : "")}
        className={clsx(
          "w-full p-2.5 rounded-lg bg-gray-800 outline-none border focus:border-sky-500",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
    </div>
  );
};
