import { InputField } from "@/components/editor";

export default function AccountDashboardPage() {
  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">ACCOUNT DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="font-bold border-b border-gray-500">Change password</div>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Username" readonly />
            <InputField label="Role" readonly />
            <InputField label="Password" required />
            <InputField label="Confirm password" required />
          </div>
        </form>
      </div>
    </div>
  );
}
