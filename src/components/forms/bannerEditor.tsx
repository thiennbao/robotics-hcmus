"use client";

import { Banner } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { ImageField, InputField } from "../utils/editorUtils";
import { bannerSaveAction } from "@/lib/actions";
import { bannerSchema } from "@/lib/schemas";

const BannerEditor = ({ data }: { data?: Banner }) => {
  const [state, dispatch] = useFormState(bannerSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof bannerSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.name || ""} />
      <InputField
        label="Tên banner"
        name="name"
        validation={bannerSchema.name}
        submitErr={submitErr?.name}
        data={data?.name}
      />
      <ImageField
        label="Banner"
        name="image"
        validation={bannerSchema.image}
        submitErr={submitErr?.image}
        data={data?.image}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={bannerSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={bannerSchema.order}
        submitErr={submitErr?.order}
        data={String(data?.order || "")}
      />
      <div className="text-center pt-4">
        <FormSubmitButton variant="outline" loadingText="Đang lưu..." className="w-1/2">
          XÁC NHẬN
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default BannerEditor;
