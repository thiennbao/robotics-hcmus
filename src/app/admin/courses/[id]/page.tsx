import { ImageField, InputField, MultiImageField, TextField } from "@/components/editor";

export default function CourseEditorPage() {
  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">COURSES DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="font-bold border-b border-gray-500">Add new course</div>
        <form className="*:mb-4">
          <InputField
            label="Course Name"
            required
            placeholder="Enter course name"
            errorMsg="Course name is required"
          />
          <ImageField label="Thumbnail" required errorMsg="Thumbnail is required" />
          <div className="grid lg:grid-cols-2 gap-4">
            <TextField
              label="Description"
              required
              placeholder="Enter description"
              errorMsg="Description is required"
            />
            <TextField
              label="Objectives"
              required
              placeholder="Enter objectives"
              errorMsg="Objectives is required"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <InputField label="Age" required placeholder="Enter age" errorMsg="Age is required" />
            <InputField
              label="Lesson"
              required
              placeholder="Enter lesson"
              errorMsg="Lesson is required"
            />
            <InputField
              label="Duration"
              required
              placeholder="Enter duration"
              errorMsg="Duration is required"
            />
          </div>
          <InputField
            label="Requirement"
            placeholder="Enter requirement"
            errorMsg="Requirement is required"
          />
          <MultiImageField label="Gallery" />
        </form>
      </div>
    </div>
  );
}
