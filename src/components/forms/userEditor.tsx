"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField, SelectField } from "../utils/editorUtils";
import { userSaveAction } from "@/lib/actions";
import { userSchema } from "@/lib/schemas";

const UserEditor = ({ data }: { data?: User }) => {
  const [state, dispatch] = useFormState(userSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.username || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { [key in keyof User]: string } | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Username"
        inputAttr={{
          name: "username",
          placeholder: "robotics",
          defaultValue: data?.username,
        }}
        validation={userSchema.username}
        submitErr={submitErr}
      />
      <SelectField
        label="Role"
        inputAttr={{
          name: "role",
          defaultValue: data?.role,
        }}
        options={["", "ADMIN", "ROOT"]}
        validation={userSchema.role}
        submitErr={submitErr}
      />
      <InputField
        label="Password"
        inputAttr={{
          name: "password",
          placeholder: "********",
          type: "password",
        }}
        validation={userSchema.password}
        submitErr={submitErr}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default UserEditor;
