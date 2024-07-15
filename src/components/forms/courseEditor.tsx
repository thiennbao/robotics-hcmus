"use client";

import { Course } from "@prisma/client";
import { useFormState } from "react-dom";
import { ImageField, InputField, MultiImageField, TextField } from "../utils/editorUtils";
import { courseSaveAction } from "@/lib/actions";
import { courseSchema } from "@/lib/schemas";

const CourseEditor = ({ data }: { data?: Course }) => {
  const [state, dispatch] = useFormState(courseSaveAction, undefined);

  const action = (payload: FormData) => {
    payload.set("id", data?.name || "");
    dispatch(payload);
  };

  const submitErr = state?.issues.reduce(
    (obj, error) => Object.assign(obj, { [error.path]: error.message }),
    {}
  ) as { [key in keyof Course]: string } | undefined;

  return (
    <form action={action} noValidate className="*:mb-4">
      <InputField
        label="Course name"
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
      <div className="grid lg:grid-cols-2 gap-4">
        <TextField
          label="Description"
          inputAttr={{
            name: "description",
            placeholder: "Dive deep into the world of peeling with style, finesse and magic...",
            defaultValue: data?.description,
          }}
          validation={courseSchema.description}
          submitErr={submitErr}
        />
        <TextField
          label="Objectives"
          inputAttr={{
            name: "objective",
            placeholder: "Unlock the secrets of banana peeling mastery...",
            defaultValue: data?.objective,
          }}
          validation={courseSchema.objective}
          submitErr={submitErr}
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
          validation={courseSchema.age}
          submitErr={submitErr}
        />
        <InputField
          label="Lesson"
          inputAttr={{
            name: "lesson",
            placeholder: "8 lessons",
            defaultValue: data?.lesson,
          }}
          validation={courseSchema.lesson}
          submitErr={submitErr}
        />
        <InputField
          label="Duration"
          inputAttr={{
            name: "duration",
            placeholder: "120 minutes / classes",
            defaultValue: data?.duration,
          }}
          validation={courseSchema.duration}
          submitErr={submitErr}
        />
      </div>
      <TextField
        label="Requirement"
        inputAttr={{
          name: "requirement",
          placeholder: "Peeled at least one banana before without crying...",
          defaultValue: data?.requirement,
        }}
        validation={courseSchema.requirement}
        submitErr={submitErr}
      />
      <MultiImageField
        label="Gallery"
        inputAttr={{
          name: "gallery",
          defaultValue: JSON.stringify(data?.gallery),
        }}
        validation={courseSchema.gallery}
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

export default CourseEditor;
