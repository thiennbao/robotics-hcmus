"use client";

import { Course } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, MultiImageField, RichTextField } from "../utils/editorUtils";
import { courseSaveAction } from "@/lib/actions";
import { courseSchema } from "@/lib/schemas";
import { useState } from "react";

const CourseEditor = ({ data }: { data?: Course }) => {
  const [state, dispatch] = useFormState(courseSaveAction, undefined);
  const [formData, setFormData] = useState(new FormData());

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof courseSchema]: string }
    | undefined;

  const setData = (key: string, value: string) => {
    formData.set(key, value);
    setFormData(formData);
  };

  const preDispatch = () => {
    formData.set("origin", data?.name || "");
    dispatch(formData);
  };

  return (
    <form action={preDispatch} noValidate className="*:mb-4">
      <InputField
        label="Tên khóa học"
        name="name"
        validation={courseSchema.name}
        submitErr={submitErr?.name}
        data={data?.name}
        setData={setData}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={courseSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
        setData={setData}
      />
      <InputField
        textarea
        label="Mô tả tóm tắt"
        name="brief"
        validation={courseSchema.brief}
        submitErr={submitErr?.brief}
        data={data?.brief}
        setData={setData}
      />
      <RichTextField
        label="Tổng quan khóa học"
        name="overview"
        validation={courseSchema.overview}
        submitErr={submitErr?.overview}
        data={data?.overview}
        setData={setData}
      />
      <RichTextField
        label="Tổ chức khóa học"
        name="organization"
        validation={courseSchema.organization}
        submitErr={submitErr?.organization}
        data={data?.organization}
        setData={setData}
      />
      <RichTextField
        label="Nội dung khóa học"
        name="description"
        validation={courseSchema.description}
        submitErr={submitErr?.description}
        data={data?.description}
        setData={setData}
      />
      <InputField
        label="Khung giờ mở lớp, cách nhau bằng dấu chấm phẩy (;)"
        name="time"
        validation={courseSchema.time}
        submitErr={submitErr?.time}
        data={data?.time}
        setData={setData}
        inputAttr={{ placeholder: "08:00 - 10:00 Saturday; 08:00 - 10:00 Sunday; ..." }}
      />
      <MultiImageField
        label="Hình ảnh"
        name="gallery"
        validation={courseSchema.gallery}
        submitErr={submitErr?.gallery}
        data={JSON.stringify(data?.gallery)}
        setData={setData}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={courseSchema.order}
        submitErr={submitErr?.order}
        data={String(data?.order || "")}
        setData={setData}
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
