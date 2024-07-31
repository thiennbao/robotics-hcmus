"use client";

import { Navigation } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { navigationSaveAction } from "@/lib/actions";
import { navigationSchema } from "@/lib/schemas";

const NavigationEditor = ({ data }: { data?: Navigation }) => {
  const [state, dispatch] = useFormState(navigationSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.title || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { [key in keyof Navigation]?: string } | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Navigation title"
        inputAttr={{
          name: "title",
          placeholder: "Wikipedia",
          defaultValue: data?.title,
        }}
        validation={navigationSchema.title}
        submitErr={submitErr}
      />
      <InputField
        label="Address"
        inputAttr={{
          name: "address",
          placeholder: "https://wikipedia.org",
          defaultValue: data?.address,
        }}
        validation={navigationSchema.address}
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

export default NavigationEditor;
