"use client";

import { Activity } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField } from "../utils/editorUtils";
import { activitySaveAction } from "@/lib/actions";
import { activitySchema } from "@/lib/schemas";
import { useState } from "react";

const ActivityEditor = ({ data }: { data?: Activity }) => {
  const [state, dispatch] = useFormState(activitySaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof activitySchema]: string }
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
        validation={activitySchema.title}
        submitErr={submitErr?.title}
        data={data?.title}
        setData={setData}
      />
      <ImageField
        label="Hình ảnh"
        name="image"
        validation={activitySchema.image}
        submitErr={submitErr?.image}
        data={data?.image}
        setData={setData}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={activitySchema.order}
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

export default ActivityEditor;
