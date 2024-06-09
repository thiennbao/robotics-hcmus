"use client";

import clsx from "clsx";
import { HTMLProps, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";

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
          "peer w-full h-60 p-2 rounded-lg bg-gray-800 outline-none border border-transparent focus:border-sky-500",
          hasFocused && "invalid:border-red-400"
        )}
      />
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
      <input {...inputOpt} defaultValue={image} hidden className="peer" />
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
  const [images, setImages] = useState<string[]>((inputOpt?.defaultValue as string[]) || []);

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
      <input {...inputOpt} defaultValue={JSON.stringify(images)} hidden className="peer" />
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
        {images.length ? (
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
