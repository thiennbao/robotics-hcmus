"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { changePasswordAction } from "@/lib/actions";
import { userSchema } from "@/lib/schemas";

const AccountEditor = ({ data }: { data: User }) => {
  const [state, dispatch] = useFormState(changePasswordAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.username || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { password: string; old: string; confirm: string }
    | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Mật khẩu cũ"
        inputAttr={{
          name: "old",
          placeholder: "********",
          type: "password",
        }}
        validation={{ required: { message: "Vui lòng nhập vào trường này" } }}
        submitErr={submitErr}
      />
      <InputField
        label="Mật khẩu mới"
        inputAttr={{
          name: "password",
          placeholder: "********",
          type: "password",
        }}
        validation={userSchema.password}
        submitErr={submitErr}
      />
      <InputField
        label="Xác nhận mật khẩu mới"
        inputAttr={{
          name: "confirm",
          placeholder: "********",
          type: "password",
        }}
        validation={{ required: { message: "Vui lòng nhập vào trường này" } }}
        submitErr={submitErr}
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
