"use client";

import { Contact } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField } from "../utils/editorUtils";
import { contactSaveAction } from "@/lib/actions";
import { contactSchema } from "@/lib/schemas";

const ContactEditor = ({ data }: { data?: Contact }) => {
  const [state, dispatch] = useFormState(contactSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof contactSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.title || ""} />
      <InputField
        label="Tiêu đề"
        name="title"
        validation={contactSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
        inputAttr={{ placeholder: "Facebook: Robotics & IoT HCMUS" }}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={contactSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
        inputAttr={{ placeholder: "https://www.facebook.com/RoboticsHCMUS" }}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={contactSchema.order}
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

export default ContactEditor;
