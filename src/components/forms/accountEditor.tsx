"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { InputField, SelectField } from "../utils/editorUtils";

const AccountEditor = ({
  data,
  action,
}: {
  data: User;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { old: string; password: string; confirm: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Old password"
        inputAttr={{
          name: "old",
          placeholder: "********",
          type: "password",
        }}
        validation={{ required: { message: "Please fill out this field" } }}
        submitErr={errors?.old}
      />
      <InputField
        label="New password"
        inputAttr={{
          name: "password",
          placeholder: "********",
          type: "password",
        }}
        validation={{
          required: { message: "Please fill out this field" },
          min: { value: 8, message: "Please enter at least 8 characters" },
        }}
        submitErr={errors?.password}
      />
      <InputField
        label="Confirm password"
        inputAttr={{
          name: "confirm",
          placeholder: "********",
          type: "password",
        }}
        validation={{ required: { message: "Please fill out this field" } }}
        submitErr={errors?.confirm}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default AccountEditor;
