"use client";

import { Competition } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { competitionSaveAction } from "@/lib/actions";
import { competitionSchema } from "@/lib/schemas";

const CompetitionEditor = ({ data }: { data?: Competition }) => {
  const [state, dispatch] = useFormState(competitionSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof competitionSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.title || ""} />
      <InputField
        label="Tiêu đề"
        name="title"
        validation={competitionSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
        inputAttr={{ placeholder: "Robocus" }}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={competitionSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
        inputAttr={{ placeholder: "https://robocus.org" }}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={competitionSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
      />
      <RichTextField
        label="Mô tả"
        name="description"
        validation={competitionSchema.description}
        submitErr={submitErr?.description}
        data={data?.description}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={competitionSchema.order}
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

export default CompetitionEditor;
