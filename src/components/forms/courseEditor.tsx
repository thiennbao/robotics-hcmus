"use client";

import { Course } from "@prisma/client";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { ImageField, InputField, MultiImageField, TextField } from "../utils/editorUtils";

const CourseEditor = ({
  data,
  action,
}: {
  data: Course | null;
  action: (_prevState: any, formData: FormData) => Promise<{ errors: ZodIssue[] } | undefined>;
}) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  const errors = state?.errors.reduce(
    (obj, error) => Object.assign(obj, { [error.path.join("/")]: error.message }),
    {}
  ) as { [key in keyof Course]: string } | undefined;

  return (
    <form action={formAction} noValidate className="*:mb-4">
      <InputField
        label="Course name"
        inputAttr={{
          name: "name",
          placeholder: "Advanced Banana Peeling Techniques",
          defaultValue: data?.name,
        }}
        validation={{
          required: { message: "Please fill out this field" },
          exclude: { value: ["add"], message: 'Name can not be "add" ' },
        }}
        submitErr={errors?.name}
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
      <div className="grid lg:grid-cols-2 gap-4">
        <TextField
          label="Description"
          inputAttr={{
            name: "description",
            placeholder: "Dive deep into the world of peeling with style, finesse and magic...",
            defaultValue: data?.description,
          }}
          validation={{ required: { message: "Please fill out this field" } }}
          submitErr={errors?.description}
        />
        <TextField
          label="Objectives"
          inputAttr={{
            name: "objective",
            placeholder: "Unlock the secrets of banana peeling mastery...",
            defaultValue: data?.objective,
          }}
          validation={{ required: { message: "Please fill out this field" } }}
          submitErr={errors?.objective}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <InputField
          label="Age"
          inputAttr={{
            name: "age",
            placeholder: "18 - 60",
            defaultValue: data?.age,
          }}
          validation={{ required: { message: "Please fill out this field" } }}
          submitErr={errors?.age}
        />
        <InputField
          label="Lesson"
          inputAttr={{
            name: "lesson",
            placeholder: "8 lessons",
            defaultValue: data?.lesson,
          }}
          validation={{ required: { message: "Please fill out this field" } }}
          submitErr={errors?.lesson}
        />
        <InputField
          label="Duration"
          inputAttr={{
            name: "duration",
            placeholder: "120 minutes / classes",
            defaultValue: data?.duration,
          }}
          validation={{ required: { message: "Please upload a photo" } }}
          submitErr={errors?.duration}
        />
      </div>
      <TextField
        label="Requirement"
        inputAttr={{
          name: "requirement",
          placeholder: "Peeled at least one banana before without crying...",
          defaultValue: data?.requirement,
        }}
        validation={{ required: { message: "Please upload a photo" } }}
        submitErr={errors?.requirement}
      />
      <MultiImageField
        label="Gallery"
        inputAttr={{
          name: "gallery",
          defaultValue: JSON.stringify(data?.gallery),
        }}
        validation={{ required: { message: "Please upload a photo" } }}
        submitErr={errors?.gallery}
      />
      <div className="text-center pt-4">
        <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default CourseEditor;
