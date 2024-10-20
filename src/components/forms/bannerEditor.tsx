"use client";

import { Banner } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField } from "../utils/editorUtils";
import { bannerSaveAction } from "@/lib/actions";
import { bannerSchema } from "@/lib/schemas";
import { useState } from "react";

const BannerEditor = ({ data }: { data?: Banner }) => {
  const [state, dispatch] = useFormState(bannerSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof bannerSchema]: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  const preDispatch = () => {
    formData.set("origin", data?.name || "");
    dispatch(formData);
  };

  return (
    <form action={preDispatch} noValidate className="*:mb-4">
      <InputField
        label="Tên banner"
        name="name"
        validation={bannerSchema.name}
        submitErr={submitErr?.name}
        data={data?.name}
        setData={setData}
      />
      <ImageField
        label="Banner"
        name="image"
        validation={bannerSchema.image}
        submitErr={submitErr?.image}
        data={data?.image}
        setData={setData}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={bannerSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
        setData={setData}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={bannerSchema.order}
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

export default BannerEditor;
