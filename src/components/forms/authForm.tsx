"use client";

import { authenticateAction } from "@/lib/actions";
import { InputField } from "../utils/editorUtils";
import { useFormState } from "react-dom";
const AuthForm = () => {
  const [state, formAction] = useFormState(authenticateAction, undefined);

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { username: string; password: string } | undefined;

  return (
    <form action={formAction} className="w-96 *:my-4 max-w-full">
      <InputField label="Username" inputAttr={{ name: "username" }} submitErr={submitErr} />
      <InputField
        label="Password"
        inputAttr={{ name: "password", type: "password" }}
        submitErr={submitErr}
      />
      <button className="w-full py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
        SIGN IN
      </button>
    </form>
  );
};

export default AuthForm