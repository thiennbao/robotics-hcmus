"use client";

import { authenticateAction } from "@/lib/actions";
import { InputField } from "../utils/editorUtils";
import { useFormState } from "react-dom";
import { useState } from "react";
import { authSchema } from "@/lib/schemas";
const AuthForm = () => {
  const [state, dispatch] = useFormState(authenticateAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { username: string; password: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  return (
    <form action={() => dispatch(formData)} className="w-96 *:my-4 max-w-full">
      <InputField
        label="Tên đăng nhập"
        name="username"
        validation={authSchema.username}
        submitErr={submitErr?.username}
        setData={setData}
      />
      <InputField
        label="Mật khẩu"
        name="password"
        validation={authSchema.password}
        submitErr={submitErr?.password}
        setData={setData}
        inputAttr={{ type: "password" }}
      />
      <button className="w-full py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
        ĐĂNG NHẬP
      </button>
    </form>
  );
};

export default AuthForm;
