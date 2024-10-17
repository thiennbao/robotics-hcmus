"use client";

import { Competition } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, RichTextField } from "../utils/editorUtils";
import { competitionSaveAction } from "@/lib/actions";
import { competitionSchema } from "@/lib/schemas";

const CompetitionEditor = ({ data }: { data?: Competition }) => {
  const [state, dispatch] = useFormState(competitionSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.title || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof Competition]?: string }
    | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Thứ tự"
        inputAttr={{
          name: "order",
          placeholder: "1",
          defaultValue: String(data?.order || ""),
        }}
        validation={competitionSchema.order}
        submitErr={submitErr}
      />
      <InputField
        label="Tiêu đề"
        inputAttr={{
          name: "title",
          placeholder: "Robocus",
          defaultValue: data?.title,
        }}
        validation={competitionSchema.title}
        submitErr={submitErr}
      />
      <InputField
        label="Địa chỉ"
        inputAttr={{
          name: "address",
          placeholder: "https://robocus.org",
          defaultValue: data?.address,
        }}
        validation={competitionSchema.address}
        submitErr={submitErr}
      />
      <ImageField
        label="Thumbnail"
        inputAttr={{
          name: "thumbnail",
          defaultValue: data?.thumbnail,
        }}
        validation={competitionSchema.thumbnail}
        submitErr={submitErr}
      />
      <RichTextField
        label="Mô tả"
        inputAttr={{
          name: "description",
          defaultValue: data?.description,
        }}
        validation={competitionSchema.description}
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

export default CompetitionEditor;
