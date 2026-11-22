"use client";

import { News } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { newsSaveAction } from "@/lib/actions";
import { newsSchema } from "@/lib/schemas";

const NewsEditor = ({ data }: { data?: News }) => {
  const [state, dispatch] = useFormState(newsSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof newsSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.title || ""} />
      <InputField
        label="Tiêu đề"
        name="title"
        validation={newsSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={newsSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
      />
      <RichTextField
        label="Nội dung"
        name="content"
        validation={newsSchema.content}
        submitErr={submitErr?.content}
        data={data?.content}
      />
      <div className="text-center pt-4">
        <FormSubmitButton variant="outline" loadingText="Đang lưu..." className="w-1/2">
          XÁC NHẬN
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default NewsEditor;
