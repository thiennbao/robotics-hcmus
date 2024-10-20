"use client";

import { Contact } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { contactSaveAction } from "@/lib/actions";
import { contactSchema } from "@/lib/schemas";
import { useState } from "react";

const ContactEditor = ({ data }: { data?: Contact }) => {
  const [state, dispatch] = useFormState(contactSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof contactSchema]: string }
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
        validation={contactSchema.title}
        submitErr={submitErr?.title}
        data={data?.title || ""}
        setData={setData}
        inputAttr={{ placeholder: "Facebook: Robotics & IoT HCMUS" }}
      />
      <InputField
        label="Địa chỉ"
        name="address"
        validation={contactSchema.address}
        submitErr={submitErr?.address}
        data={data?.address || ""}
        setData={setData}
        inputAttr={{ placeholder: "https://www.facebook.com/RoboticsHCMUS" }}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={contactSchema.order}
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

export default ContactEditor;
