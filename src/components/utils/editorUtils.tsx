"use client";

import { validate, Validation } from "@/lib/validation";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { ChangeEvent, HTMLProps, InputHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import React from "react";

// Deer my kouhai, if one day you have to read this pile of code and can't understand anything, no problem.
// Even me who wrote it wouldn’t understand if I read it again.

interface Props extends HTMLProps<HTMLDivElement> {
  label: string;
  name: string;
  validation?: Validation;
  submitErr?: string;
  data?: string;
  setData?: (key: string, value: string) => void;
  inputAttr?: Pick<InputHTMLAttributes<HTMLInputElement>, "placeholder" | "readOnly" | "type">;
}

export const InputField = ({
  label,
  name,
  validation,
  submitErr,
  data,
  setData,
  inputAttr,
  textarea = false,
  ...props
}: Props & { textarea?: boolean }) => {
  const [input, setInput] = useState(data || "");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (setData) setData(name, input);
  }, [setData, name, input]);
  useEffect(() => {
    setErrorMsg(submitErr || "");
  }, [submitErr]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(event.target.value);
    if (validation) setErrorMsg(validate(event.target.value, validation));
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          {...inputAttr}
          value={input}
          onChange={handleChange}
          className={clsx(
            "w-full h-60 p-2 rounded-lg bg-gray-800 outline-none border focus:border-sky-500",
            errorMsg ? "border-red-400" : "border-transparent"
          )}
        />
      ) : (
        <input
          {...inputAttr}
          value={input}
          onChange={handleChange}
          className={clsx(
            "w-full p-2 rounded-lg bg-gray-800 outline-none border focus:border-sky-500",
            errorMsg ? "border-red-400" : "border-transparent"
          )}
        />
      )}
      <span className="mt-1 text-red-400 text-sm">{errorMsg}</span>
    </div>
  );
};

export const ImageField = ({ label, name, validation, submitErr, data, setData, ...props }: Props) => {
  const [image, setImage] = useState(data || "");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setData) setData(name, image);
  }, [setData, name, image]);
  useEffect(() => {
    setErrorMsg(submitErr || "");
  }, [submitErr]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setErrorMsg("");
      };
      reader.readAsDataURL(file);
      if (inputRef.current) inputRef.current.value = "";
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
      <input type="file" accept="image/*" id={name} onChange={handleUpload} ref={inputRef} hidden />
      <label
        htmlFor={name}
        className={clsx(
          "block p-4 rounded-lg bg-gray-800 cursor-pointer border",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      >
        {image ? (
          <div className="h-60 relative">
            <Image
              src={image}
              alt="Uploaded image"
              fill
              sizes="400"
              className="w-full h-full rounded-lg object-cover"
            />
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
    </div>
  );
};

export const MultiImageField = ({ label, name, validation, submitErr, data, setData, ...props }: Props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState<string[]>(JSON.parse(data || "[]"));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const imagesJson = JSON.stringify(images);
    if (setData) setData(name, imagesJson);
  }, [setData, name, images]);
  useEffect(() => {
    setErrorMsg(submitErr || "");
  }, [submitErr]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((images) => [...images, reader.result as string]);
        setErrorMsg("");
      };
      reader.readAsDataURL(file);
    });
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleDelete = (deletedIndex: number) => {
    const remainImages = images.filter((_image, index) => index != deletedIndex);
    setImages(remainImages);
    setErrorMsg(remainImages.length ? "" : (validation?.required?.message as string));
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input hidden type="file" accept="image/*" multiple id={name} ref={inputRef} onChange={handleUpload} />
      <label
        htmlFor={name}
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
                <Image
                  src={image}
                  alt="Uploaded image"
                  fill
                  sizes="400"
                  className="w-full h-full rounded-lg object-cover"
                />
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
    </div>
  );
};

export const RichTextField = ({ label, name, validation, submitErr, data, setData, ...props }: Props) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  const [input, setInput] = useState(data || "");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (setData) setData(name, input);
  }, [setData, name, input]);
  useEffect(() => {
    setErrorMsg(submitErr || "");
  }, [submitErr, name]);

  // Quill library issue (value is "<p><br></p>" when all input's deleted)
  const handleChange = (value: string) => {
    setInput(value === "<p><br></p>" ? "" : value);
    setErrorMsg(validation ? validate(value === "<p><br></p>" ? "" : value, validation) : "");
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <div
        className={clsx(
          "rounded-lg border focus-within:border-sky-500",
          errorMsg ? "border-red-400" : "border-transparent"
        )}
      >
        <ReactQuill
          className={clsx(
            "rounded-lg h-96 bg-gray-800 overflow-hidden",
            "[&_.ql-toolbar]:!border-transparent [&_.ql-container]:!border-transparent",
            "[&_.ql-toolbar_.ql-stroke]:fill-none [&_.ql-toolbar_.ql-stroke]:stroke-gray-300",
            "[&_.ql-toolbar_.ql-fill]:fill-gray-300 [&_.ql-toolbar_.ql-fill]:stroke-none",
            "[&_.ql-toolbar_.ql-picker-options]:bg-gray-800 [&_.ql-toolbar_.ql-picker]:text-gray-300",
            "[&_.ql-editor]:text-base [&_.ql-editor]:pb-16 [&_.ql-editor::-webkit-scrollbar]:w-1 [&_.ql-editor::-webkit-scrollbar-thumb]:bg-gray-600"
          )}
          theme="snow"
          value={input}
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
  name,
  validation,
  submitErr,
  data,
  setData,
  inputAttr,
  options,
  ...props
}: Props & { options: string[] }) => {
  const [selected, setSelected] = useState(data || "");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (setData) setData(name, selected);
  }, [setData, name, selected]);
  useEffect(() => {
    setErrorMsg(submitErr || "");
  }, [submitErr]);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    if (validation) {
      setErrorMsg(validate(event.target.value, validation));
    }
  };

  return (
    <div {...props}>
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <select
        {...inputAttr}
        onChange={handleSelect}
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
