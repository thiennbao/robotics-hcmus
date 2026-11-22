"use client";

import { Faq } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField } from "../utils/editorUtils";
import { faqSaveAction } from "@/lib/actions";
import { faqSchema } from "@/lib/schemas";

const FaqEditor = ({ data }: { data?: Faq }) => {
  const [state, dispatch] = useFormState(faqSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof faqSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.question || ""} />
      <InputField
        label="Câu hỏi"
        name="question"
        validation={faqSchema.question}
        submitErr={submitErr?.question}
        data={data?.question || ""}
      />
      <InputField
        textarea
        label="Câu trả lời"
        name="answer"
        validation={faqSchema.answer}
        submitErr={submitErr?.answer}
        data={data?.answer || ""}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={faqSchema.order}
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

export default FaqEditor;
