"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField } from "../utils/editorUtils";
import { changePasswordAction } from "@/lib/actions";
import { changePasswordSchema } from "@/lib/schemas";

const AccountEditor = ({ data }: { data: User }) => {
  const [state, dispatch] = useFormState(changePasswordAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof changePasswordSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.username || ""} />
      <InputField
        label="Mật khẩu cũ"
        name="old"
        validation={changePasswordSchema.old}
        submitErr={submitErr?.old}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <InputField
        label="Mật khẩu mới"
        name="password"
        validation={changePasswordSchema.password}
        submitErr={submitErr?.password}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <InputField
        label="Xác nhận mật khẩu"
        name="confirm"
        validation={changePasswordSchema.confirm}
        submitErr={submitErr?.confirm}
        inputAttr={{ placeholder: "********", type: "password" }}
      />
      <div className="text-center pt-4">
        <FormSubmitButton variant="outline" loadingText="Đang lưu..." className="w-1/2">
          XÁC NHẬN
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default AccountEditor;
