"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { InputField, SelectField } from "../utils/editorUtils";
import { userSaveAction } from "@/lib/actions";
import { userSchema } from "@/lib/schemas";

const UserEditor = ({ data }: { data?: User }) => {
  const [state, dispatch] = useFormState(userSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof userSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.username || ""} />
      <InputField
        label="Tên đăng nhập"
        name="username"
        validation={userSchema.username}
        submitErr={submitErr?.username}
        data={data?.username}
      />
      <SelectField
        label="Vai trò"
        name="role"
        validation={userSchema.role}
        submitErr={submitErr?.role}
        data={data?.role}
        options={["", "ADMIN", "ROOT"]}
      />
      <InputField
        label="Mật khẩu"
        name="password"
        validation={userSchema.password}
        submitErr={submitErr?.password}
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

export default UserEditor;
