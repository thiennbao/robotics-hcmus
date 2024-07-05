"use client";

import { Contact } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { InputField } from "../utils/editorUtils";

const ContactEditor = ({
  data,
  action,
}: {
  data: Contact;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Contact]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Contact key"
        inputAttr={{
          name: "key",
          placeholder: "Facebook",
          defaultValue: data.key,
          readOnly: true,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          exclude: { value: ["add"], message: 'Key can not be "add" ' },
        }}
        submitErr={errors?.key}
      />
      <InputField
        label="Title"
        inputAttr={{
          name: "title",
          placeholder: "University of Science",
          defaultValue: data.title || "",
        }}
        submitErr={errors?.title}
      />
      <InputField
        label="Address"
        inputAttr={{
          name: "address",
          placeholder: "https://www.facebook.com/VNUHCM.US",
          defaultValue: data.address || "",
        }}
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

export default ContactEditor;
