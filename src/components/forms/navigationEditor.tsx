"use client";

import { Navigation } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { InputField } from "../utils/editorUtils";

const NavigationEditor = ({
  data,
  action,
}: {
  data: Navigation | null;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Navigation]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Navigation title"
        inputAttr={{
          name: "title",
          placeholder: "Wikipedia",
          defaultValue: data?.title,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          exclude: { value: ["add"], message: 'Title can not be "add" ' },
        }}
        submitErr={errors?.title}
      />
      <InputField
        label="Address"
        inputAttr={{
          name: "address",
          placeholder: "https://wikipedia.org",
          defaultValue: data?.address,
        }}
        validation={{ required: { message: "Please fill out this field" } }}
        submitErr={errors?.address}
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
