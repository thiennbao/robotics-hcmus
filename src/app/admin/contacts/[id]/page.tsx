import { InputField, TextField } from "../../_components/editor";

export default function ContactViewerPage() {
  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">CONTACTS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="font-bold border-b border-gray-500">Contact details</div>
        <form className="flex-wrap *:mb-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <InputField label="Subject" readonly />
            <InputField label="Name" readonly />
            <InputField label="Email" readonly />
            <InputField label="Phone" readonly />
          </div>
          <TextField label="Message" readonly />
        </form>
      </div>
    </div>
  );
}
