import { revalidatePath } from "next/cache";
import { ImageField, InputField, MultiImageField, TextField } from "../../_components/editorUtils";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/storage";

export default async function CourseEditorPage({ params }: { params: { id: string } }) {
  // Fetch data
  const data = await prisma.course.findFirst({ where: { id: params.id } });

  // Redirect to 404 page if not add page and data not found
  if (params.id !== "add" && !data) {
    notFound();
  }

  // Submit action
  const handleSubmit = async (formData: FormData) => {
    "use server";

    // Files handle
    const thumbnailData: string = formData.get("thumbnail") as string;
    const galleryData: string[] = JSON.parse(formData.get("gallery") as string);

    // Delete files from image storage
    if (data && data?.thumbnail !== thumbnailData) {
      deleteFile(data?.thumbnail);
    }
    for (let image of data?.gallery || []) {
      if (!galleryData.includes(image)) {
        deleteFile(image);
      }
    }

    // Upload new files to image storage and get urls back
    const thumbnail = thumbnailData.startsWith("data:")
      ? await uploadFile(thumbnailData)
      : thumbnailData;
    const gallery = await Promise.all(
      galleryData.map(async (image: string) =>
        image.startsWith("data:") ? await uploadFile(image) : image
      )
    );

    // Get full data
    const saveData = {
      name: formData.get("name") as string,
      thumbnail,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      age: formData.get("age") as string,
      lesson: formData.get("lesson") as string,
      duration: formData.get("duration") as string,
      requirement: formData.get("requirement") as string,
      gallery,
    };

    // Save to database
    if (params.id === "add") {
      await prisma.course.create({ data: saveData });
    } else {
      console.log(saveData);
      await prisma.course.update({ where: { id: params.id }, data: saveData });
    }

    // Redirect
    revalidatePath("/admin/courses");
    redirect("/admin/courses");
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSES DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="font-bold border-b border-gray-500">Add new course</div>
        <form action={handleSubmit} noValidate className="*:mb-4">
          <InputField
            label="Course Name"
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
