import { changUserPasswordById, getUserById } from "@/lib/query";
import { InputField } from "../../_components/editorUtils";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

export default async function AccountDashboardPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch data
  const data = await getUserById(id);

  // Redirect to 404 page if data not found
  if (!data) {
    notFound();
  }

  // Submit action
  const handleChangePassword = async (formData: FormData) => {
    "use server";

    const data = {
      old: formData.get("password/old") as string,
      new: formData.get("password/new") as string,
      confirm: formData.get("password/confirm") as string,
    };

    if (data.new === data.confirm) {
      // Save to database
      // TODO: check old password
      await changUserPasswordById(id, data.new);

      // Redirect
      redirect("/admin/users");
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">USERS DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/users" className="font-bold hover:text-sky-500 transition">
            Users
          </Link>
          <FaAnglesRight className="mx-2 text-sm" />
          <span className="text-nowrap overflow-hidden text-ellipsis">{data.username}</span>
        </div>
        <form action={handleChangePassword} className="*:mb-4">
          <InputField label="Username" inputOpt={{ defaultValue: data.username, readOnly: true }} />
          <InputField label="Role" inputOpt={{ defaultValue: data.role, readOnly: true }} />
          <InputField
            label="Old password"
            inputOpt={{ name: "password/old", type: "password", required: true }}
          />
          <InputField
            label="New password"
            inputOpt={{ name: "password/new", type: "password", required: true }}
          />
          <InputField
            label="Confirm password"
            inputOpt={{ name: "password/confirm", type: "password", required: true }}
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
