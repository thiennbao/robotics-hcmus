"use client";

import { Competition } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { competitionSaveAction } from "@/lib/actions";
import { competitionSchema } from "@/lib/schemas";
import { useState } from "react";

const CompetitionEditor = ({ data }: { data?: Competition }) => {
  const [state, dispatch] = useFormState(competitionSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof competitionSchema]: string }
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
        validation={competitionSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
        setData={setData}
        inputAttr={{ placeholder: "Robocus" }}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={competitionSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
        setData={setData}
        inputAttr={{ placeholder: "https://robocus.org" }}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={competitionSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
        setData={setData}
      />
      <RichTextField
        label="Mô tả"
        name="description"
        validation={competitionSchema.description}
        submitErr={submitErr?.description}
        data={data?.description}
        setData={setData}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={competitionSchema.order}
        submitErr={submitErr?.order}
        data={String(data?.order || "")}
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

export default CompetitionEditor;
