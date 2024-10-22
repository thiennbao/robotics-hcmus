"use client";

import { Faq } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { faqSaveAction } from "@/lib/actions";
import { faqSchema } from "@/lib/schemas";
import { useState } from "react";

const FaqEditor = ({ data }: { data?: Faq }) => {
  const [state, dispatch] = useFormState(faqSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof faqSchema]: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  const preDispatch = () => {
    formData.set("origin", data?.question || "");
    dispatch(formData);
  };

  return (
    <form action={preDispatch} noValidate className="*:mb-4">
      <InputField
        label="Câu hỏi"
        name="question"
        validation={faqSchema.question}
        submitErr={submitErr?.question}
        data={data?.question || ""}
        setData={setData}
      />
      <InputField
        textarea
        label="Câu trả lời"
        name="answer"
        validation={faqSchema.answer}
        submitErr={submitErr?.answer}
        data={data?.answer || ""}
        setData={setData}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={faqSchema.order}
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

export default FaqEditor;
