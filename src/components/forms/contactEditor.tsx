"use client";

import { Contact } from "@prisma/client";
import { useFormState } from "react-dom";
import { InputField } from "../utils/editorUtils";
import { contactSaveAction } from "@/lib/actions";
import { contactSchema } from "@/lib/schemas";

const ContactEditor = ({ data }: { data: Contact }) => {
  const [state, dispatch] = useFormState(contactSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data.key);
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { [key in keyof Contact]: string } | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Contact key"
        inputAttr={{
          name: "key",
          placeholder: "Facebook",
          defaultValue: data.key,
          readOnly: true,
        }}
        validation={contactSchema.key}
        submitErr={submitErr}
      />
      <InputField
        label="Title"
        inputAttr={{
          name: "title",
          placeholder: "University of Science",
          defaultValue: data.title || "",
        }}
        validation={contactSchema.title}
        submitErr={submitErr}
      />
      <InputField
        label="Address"
        inputAttr={{
          name: "address",
          placeholder: "https://www.facebook.com/VNUHCM.US",
          defaultValue: data.address || "",
        }}
        validation={contactSchema.address}
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

export default ContactEditor;
