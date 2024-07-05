"use client";

import { Banner } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { ImageField, InputField } from "../utils/editorUtils";

const BannerEditor = ({
  data,
  action,
}: {
  data: Banner | null;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Banner]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Name"
        inputAttr={{
          name: "name",
          placeholder: "Winter Event",
          defaultValue: data?.name,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          exclude: { value: ["add"], message: 'Name can not be "add" ' },
        }}
        submitErr={errors?.name}
      />
      <ImageField
        label="Banner"
        inputAttr={{
          name: "image",
          defaultValue: data?.image,
        }}
        validation={{ required: { message: "Please upload a photo" } }}
        submitErr={errors?.image}
      />
      <InputField
        label="Order"
        inputAttr={{
          name: "order",
          placeholder: "1",
          defaultValue: String(data?.order || ""),
        }}
        validation={{
          type: { value: "number", message: "Please enter a number" },
          minValue: { value: 1, message: "Please enter a number greater than 0" },
        }}
        submitErr={errors?.order}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default BannerEditor;
