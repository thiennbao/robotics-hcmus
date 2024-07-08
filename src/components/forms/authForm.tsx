"use client";

import { ZodIssue } from "zod";
import { InputField } from "../utils/editorUtils";
import { useFormState } from "react-dom";
const AuthForm = ({
  action,
}: {
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { username: string; password: string } | undefined;

  return (
    <form action={formAction} className="w-96 *:my-4 max-w-full">
      <InputField
        label="Username"
        inputAttr={{ name: "username" }}
        submitErr={errors?.username}
      />
      <InputField
        label="Password"
        inputAttr={{ name: "password", type: "password" }}
        submitErr={errors?.password}
      />
      <button className="w-full py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
        SIGN IN
      </button>
    </form>
  );
};

export default AuthForm;
