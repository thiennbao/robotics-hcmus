"use client";

import { Banner } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField } from "../utils/editorUtils";
import { bannerSaveAction } from "@/lib/actions";
import { bannerSchema } from "@/lib/schemas";

const BannerEditor = ({ data }: { data?: Banner }) => {
  const [state, dispatch] = useFormState(bannerSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.name || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof Banner]: string }
    | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Tên"
        inputAttr={{
          name: "name",
          placeholder: "Winter Event",
          defaultValue: data?.name,
        }}
        validation={bannerSchema.name}
        submitErr={submitErr}
      />
      <ImageField
        label="Banner cho desktop"
        inputAttr={{
          name: "desktopImg",
          defaultValue: data?.desktopImg,
        }}
        validation={bannerSchema.desktopImg}
        submitErr={submitErr}
      />
      <ImageField
        label="Banner cho mobile"
        inputAttr={{
          name: "mobileImg",
          defaultValue: data?.mobileImg,
        }}
        validation={bannerSchema.mobileImg}
        submitErr={submitErr}
      />
      <InputField
        label="Thứ tự"
        inputAttr={{
          name: "order",
          placeholder: "1",
          defaultValue: String(data?.order || ""),
        }}
        validation={bannerSchema.order}
        submitErr={submitErr}
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
