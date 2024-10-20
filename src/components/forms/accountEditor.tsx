"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { changePasswordAction } from "@/lib/actions";
import { changePasswordSchema } from "@/lib/schemas";
import { useState } from "react";

const AccountEditor = ({ data }: { data: User }) => {
  const [state, dispatch] = useFormState(changePasswordAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof changePasswordSchema]: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  const preDispatch = () => {
    formData.set("origin", data?.username || "");
    dispatch(formData);
  };

  return (
    <form action={preDispatch} noValidate className="*:mb-4">
      <InputField
        label="Mật khẩu cũ"
        name="old"
        validation={changePasswordSchema.old}
        submitErr={submitErr?.old}
        setData={setData}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <InputField
        label="Mật khẩu mới"
        name="password"
        validation={changePasswordSchema.password}
        submitErr={submitErr?.password}
        setData={setData}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <InputField
        label="Xác nhận mật khẩu"
        name="confirm"
        validation={changePasswordSchema.confirm}
        submitErr={submitErr?.confirm}
        setData={setData}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          XÁC NHẬN
        </button>
      </div>
    </form>
  );
};

export default AccountEditor;
