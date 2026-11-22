"use client";

import { Course } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../admin/actionButton";
import { ImageField, InputField, MultiImageField, RichTextField } from "../utils/editorUtils";
import { courseSaveAction } from "@/lib/actions";
import { courseSchema } from "@/lib/schemas";

const CourseEditor = ({ data }: { data?: Course }) => {
  const [state, dispatch] = useFormState(courseSaveAction, undefined);

  const submitErr = state?.issues.reduce((obj, error) => Object.assign(obj, { [error.path]: error.message }), {}) as
    | { [key in keyof typeof courseSchema]: string }
    | undefined;

  return (
    <form action={dispatch} noValidate className="*:mb-4">
      <input type="hidden" name="origin" value={data?.name || ""} />
      <InputField
        label="Tên khóa học"
        name="name"
        validation={courseSchema.name}
        submitErr={submitErr?.name}
        data={data?.name}
      />
      <ImageField
        label="Thumbnail"
        name="thumbnail"
        validation={courseSchema.thumbnail}
        submitErr={submitErr?.thumbnail}
        data={data?.thumbnail}
      />
      <InputField
        textarea
        label="Mô tả tóm tắt"
        name="brief"
        validation={courseSchema.brief}
        submitErr={submitErr?.brief}
        data={data?.brief}
      />
      <RichTextField
        label="Tổng quan khóa học"
        name="overview"
        validation={courseSchema.overview}
        submitErr={submitErr?.overview}
        data={data?.overview}
      />
      <RichTextField
        label="Tổ chức khóa học"
        name="organization"
        validation={courseSchema.organization}
        submitErr={submitErr?.organization}
        data={data?.organization}
      />
      <RichTextField
        label="Nội dung khóa học"
        name="description"
        validation={courseSchema.description}
        submitErr={submitErr?.description}
        data={data?.description}
      />
      <InputField
        label="Khung giờ mở lớp, cách nhau bằng dấu chấm phẩy (;)"
        name="time"
        validation={courseSchema.time}
        submitErr={submitErr?.time}
        data={data?.time}
        inputAttr={{ placeholder: "08:00 - 10:00 Saturday; 08:00 - 10:00 Sunday; ..." }}
      />
      <MultiImageField
        label="Hình ảnh"
        name="gallery"
        validation={courseSchema.gallery}
        submitErr={submitErr?.gallery}
        data={JSON.stringify(data?.gallery)}
      />
      <InputField
        label="Thứ tự"
        name="order"
        validation={courseSchema.order}
        submitErr={submitErr?.order}
        data={String(data?.order || "")}
      />
      <div className="text-center pt-4">
        <FormSubmitButton variant="outline" loadingText="Đang lưu..." className="w-1/2">
          XÁC NHẬN
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default CourseEditor;
