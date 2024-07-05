"use client";

import { News } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";

const NewsEditor = ({
  data,
  action,
}: {
  data: News | null;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Omit<News, "date">]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="News title"
        inputAttr={{
          name: "title",
          placeholder: "Dumb New Way to Peel Bananas Is Taking Over the Internet",
          defaultValue: data?.title,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          exclude: { value: ["add"], message: 'Title can not be "add" ' },
        }}
        submitErr={errors?.title}
      />
      <ImageField
        label="Thumbnail"
        inputAttr={{
          name: "thumbnail",
          defaultValue: data?.thumbnail,
        }}
        validation={{ required: { message: "Please upload a photo" } }}
        submitErr={errors?.thumbnail}
      />
      <RichTextField
        label="Content"
        inputAttr={{
          name: "content",
          defaultValue: data?.content,
        }}
        validation={{ required: { message: "Please fill out this field" } }}
        submitErr={errors?.content}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default NewsEditor;
