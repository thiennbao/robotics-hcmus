"use client";

import { User } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { InputField, SelectField } from "../utils/editorUtils";

const UserEditor = ({
  data,
  action,
}: {
  data: User | null;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Omit<User, "date">]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Username"
        inputAttr={{
          name: "username",
          placeholder: "robotics",
          defaultValue: data?.username,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          min: { value: 4, message: "Please enter at least 4 characters" },
          regex: {
            value: /^[a-zA-Z0-9_]*$/,
            message: "Username can only contain letters, nummbers or underscore (_)",
          },
          exclude: { value: ["add"], message: 'Username can not be "add" ' },
        }}
        submitErr={errors?.username}
      />
      <SelectField
        label="Role"
        inputAttr={{
          name: "role",
          defaultValue: data?.role,
        }}
        options={["", "ADMIN", "ROOT"]}
        validation={{
          required: { message: "Please fill out this field" },
          include: { value: ["ADMIN", "ROOT"], message: "Invalid role" },
        }}
        submitErr={errors?.role}
      />
      <InputField
        label="Password"
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
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default UserEditor;
