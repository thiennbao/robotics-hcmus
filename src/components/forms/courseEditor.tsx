"use client";

import { Course } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, MultiImageField, RichTextField, TextField } from "../utils/editorUtils";
import { courseSaveAction } from "@/lib/actions";
import { courseSchema } from "@/lib/schemas";

const CourseEditor = ({ data }: { data?: Course }) => {
  const [state, dispatch] = useFormState(courseSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.name || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof Course]: string }
    | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Tên khóa học"
        inputAttr={{
          name: "name",
          placeholder: "Advanced Banana Peeling Techniques",
          defaultValue: data?.name,
        }}
        validation={courseSchema.name}
        submitErr={submitErr}
      />
      <ImageField
        label="Thumbnail"
        inputAttr={{
          name: "thumbnail",
          defaultValue: data?.thumbnail,
        }}
        validation={courseSchema.thumbnail}
        submitErr={submitErr}
      />
      <TextField
        label="Mô tả tóm tắt"
        inputAttr={{
          name: "brief",
          defaultValue: data?.brief,
        }}
        validation={courseSchema.brief}
        submitErr={submitErr}
      />
      <RichTextField
        label="Tổng quan khóa học"
        inputAttr={{
          name: "overview",
          defaultValue: data?.overview,
        }}
        validation={courseSchema.overview}
        submitErr={submitErr}
      />
      <RichTextField
        label="Tổ chức khóa học"
        inputAttr={{
          name: "organization",
          defaultValue: data?.organization,
        }}
        validation={courseSchema.organization}
        submitErr={submitErr}
      />
      <RichTextField
        label="Nội dung khóa học"
        inputAttr={{
          name: "description",
          defaultValue: data?.description,
        }}
        validation={courseSchema.description}
        submitErr={submitErr}
      />
      <InputField
        label="Khung giờ mở lớp, cách nhau bằng dấu chấm phẩy (;)"
        inputAttr={{
          name: "time",
          placeholder: "08:00 - 10:00 Saturday; 08:00 - 10:00 Sunday; ...",
          defaultValue: data?.time,
        }}
        validation={courseSchema.time}
        submitErr={submitErr}
      />
      <MultiImageField
        label="Hình ảnh"
        inputAttr={{
          name: "gallery",
          defaultValue: JSON.stringify(data?.gallery),
        }}
        validation={courseSchema.gallery}
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

export default CourseEditor;
