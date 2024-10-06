"use client";

import { News } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { newsSaveAction } from "@/lib/actions";
import { newsSchema } from "@/lib/schemas";

const NewsEditor = ({ data }: { data?: News }) => {
  const [state, dispatch] = useFormState(newsSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.title || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { [key in keyof News]: string } | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Tiêu đề"
        inputAttr={{
          name: "title",
          placeholder: "Dumb New Way to Peel Bananas Is Taking Over the Internet",
          defaultValue: data?.title,
        }}
        validation={newsSchema.title}
        submitErr={submitErr}
      />
      <ImageField
        label="Thumbnail"
        inputAttr={{
          name: "thumbnail",
          defaultValue: data?.thumbnail,
        }}
        validation={newsSchema.thumbnail}
        submitErr={submitErr}
      />
      <RichTextField
        label="Nội dung"
        inputAttr={{
          name: "content",
          defaultValue: data?.content,
        }}
        validation={newsSchema.content}
        submitErr={submitErr}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          XÁC NHẬN
        </button>
      </div>
    </form>
  );
};

export default NewsEditor;
