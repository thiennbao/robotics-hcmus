"use client";

import { authenticateAction } from "@/lib/actions";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField } from "../utils/editorUtils";
import { useFormState } from "react-dom";
import { authSchema } from "@/lib/schemas";

const AuthForm = () => {
  const [state, dispatch] = useFormState(authenticateAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { username: string; password: string }
    | undefined;

  return (
    <form action={dispatch} className="w-96 *:my-4 max-w-full">
      <InputField
        label="Tên đăng nhập"
        name="username"
        validation={authSchema.username}
        submitErr={submitErr?.username}
      />
      <InputField
        label="Mật khẩu"
        name="password"
        validation={authSchema.password}
        submitErr={submitErr?.password}
        inputAttr={{ type: "password" }}
      />
      <FormSubmitButton variant="outline" loadingText="Đang đăng nhập..." className="w-full">
        ĐĂNG NHẬP
      </FormSubmitButton>
    </form>
  );
};

export default AuthForm;
