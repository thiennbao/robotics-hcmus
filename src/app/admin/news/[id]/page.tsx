import { ImageField, InputField, RichTextField } from "../../_components/editor";

export default function NewsEditorPage() {
  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">NEWS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="font-bold border-b border-gray-500">Add news or blog</div>
        <form className="*:mb-4">
          <InputField
            label="Title"
            required
            placeholder="Enter title"
            errorMsg="Title is required"
          />
          <ImageField label="Thumbnail" required errorMsg="Thumbnail is required" />
          <RichTextField label="Content" required errorMsg="Content is required" />
        </form>
      </div>
    </div>
  );
}
