"use client";

import { Activity } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { ImageField, InputField } from "../utils/editorUtils";
import { activitySaveAction } from "@/lib/actions";
import { activitySchema } from "@/lib/schemas";

const ActivityEditor = ({ data }: { data?: Activity }) => {
  const [state, dispatch] = useFormState(activitySaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof activitySchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.title || ""} />
      <InputField
        label="Tiêu đề"
        name="title"
        validation={activitySchema.title}
        submitErr={submitErr?.title}
        data={data?.title}
      />
      <ImageField
        label="Hình ảnh"
        name="image"
        validation={activitySchema.image}
        submitErr={submitErr?.image}
        data={data?.image}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={activitySchema.order}
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

export default ActivityEditor;
