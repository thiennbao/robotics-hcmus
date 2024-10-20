"use client";

import { News } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { newsSaveAction } from "@/lib/actions";
import { newsSchema } from "@/lib/schemas";
import { useState } from "react";

const NewsEditor = ({ data }: { data?: News }) => {
  const [state, dispatch] = useFormState(newsSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof newsSchema]: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  const preDispatch = () => {
    formData.set("origin", data?.title || "");
    dispatch(formData);
  };

  return (
    <form action={preDispatch} noValidate className="*:mb-4">
      <InputField
        label="Tiêu đề"
        name="title"
        validation={newsSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
        setData={setData}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={newsSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
        setData={setData}
      />
      <RichTextField
        label="Nội dung"
        name="overview"
        validation={newsSchema.content}
        submitErr={submitErr?.content}
        data={data?.content}
        setData={setData}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          XÁC NHẬN
        </button>
      </div>
    </form>
  );
};

export default NewsEditor;
