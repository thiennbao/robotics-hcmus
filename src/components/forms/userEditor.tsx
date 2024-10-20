"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField, SelectField } from "../utils/editorUtils";
import { userSaveAction } from "@/lib/actions";
import { userSchema } from "@/lib/schemas";
import { useState } from "react";

const UserEditor = ({ data }: { data?: User }) => {
  const [state, dispatch] = useFormState(userSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof userSchema]: string }
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
        label="Tên đăng nhập"
        name="username"
        validation={userSchema.username}
        submitErr={submitErr?.username}
        data={data?.username}
        setData={setData}
      />
      <SelectField
        label="Vai trò"
        name="role"
        validation={userSchema.role}
        submitErr={submitErr?.role}
        data={data?.role}
        setData={setData}
        options={["", "ADMIN", "ROOT"]}
      />
      <InputField
        label="Mật khẩu"
        name="password"
        validation={userSchema.password}
        submitErr={submitErr?.password}
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

export default UserEditor;
