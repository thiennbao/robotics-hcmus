import { revalidatePath } from "next/cache";
import { ImageField, InputField, MultiImageField, TextField } from "@/components/utils/editorUtils";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
import { createCourse, getCourseById, updateCourseById } from "@/lib/query";

export default async function CourseEditorPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data
  const data = await getCourseById(id);

  // Redirect to 404 page if not add page and data not found
  if (id !== "add" && !data) {
    notFound();
  }

  // Submit action
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const data = {
      name: formData.get("name") as string,
      thumbnail: formData.get("thumbnail") as string,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      age: formData.get("age") as string,
      lesson: formData.get("lesson") as string,
      duration: formData.get("duration") as string,
      requirement: formData.get("requirement") as string,
      gallery: JSON.parse(formData.get("gallery") as string),
    };

    // Save to database
    if (id === "add") {
      await createCourse(data);
    } else {
      await updateCourseById(id, data);
    }

    // Redirect
    revalidatePath("/admin/courses");
    redirect("/admin/courses");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSES DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/courses" className="font-bold hover:text-sky-500 transition">
            Courses
          </Link>
          <FaAnglesRight className="mx-2 text-sm" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data?.name || "Add"}</span>
        </div>
        <form action={handleSubmit} className="*:mb-4">
          <InputField
            label="Course name"
            errorMsg="Course name is required"
            inputOpt={{
              name: "name",
              required: true,
              placeholder: "Enter course name",
              defaultValue: data?.name,
            }}
          />
          <ImageField
            label="Thumbnail"
            errorMsg="Thumbnail is required"
            inputOpt={{
              name: "thumbnail",
              required: true,
              defaultValue: data?.thumbnail,
            }}
          />
          <div className="grid lg:grid-cols-2 gap-4">
            <TextField
              label="Description"
              errorMsg="Description is required"
              inputOpt={{
                name: "description",
                required: true,
                placeholder: "Enter course description",
                defaultValue: data?.description,
              }}
            />
            <TextField
              label="Objectives"
              errorMsg="Objectives is required"
              inputOpt={{
                name: "objective",
                required: true,
                placeholder: "Enter course objective",
                defaultValue: data?.objective,
              }}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <InputField
              label="Age"
              errorMsg="Age is required"
              inputOpt={{
                name: "age",
                required: true,
                placeholder: "Enter student age",
                defaultValue: data?.age,
              }}
            />
            <InputField
              label="Lesson"
              errorMsg="Lesson is required"
              inputOpt={{
                name: "lesson",
                required: true,
                placeholder: "Enter the number of lessons",
                defaultValue: data?.lesson,
              }}
            />
            <InputField
              label="Duration"
              errorMsg="Duration is required"
              inputOpt={{
                name: "duration",
                required: true,
                placeholder: "Enter duration of a class",
                defaultValue: data?.duration,
              }}
            />
          </div>
          <TextField
            label="Requirement"
            errorMsg="Requirement is required"
            inputOpt={{
              name: "requirement",
              required: true,
              placeholder: "Enter course requirement",
              defaultValue: data?.requirement,
            }}
          />
          <MultiImageField
            label="Gallery"
            inputOpt={{ name: "gallery", defaultValue: data?.gallery }}
          />
          <div className="text-center pt-4">
            <button className="w-1/2 py-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
