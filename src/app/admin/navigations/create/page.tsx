import NavigationEditor from "@/components/forms/navigationEditor";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";

export default async function NavigationCreatePage() {
  return (
    <div className="text-light">
      <h2 className="text-3xl mb-6">NAVIGATION DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="/admin/navigations" className="font-bold hover:text-sky-500 transition">
            Navigations
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">Tạo mới</span>
        </div>
        <NavigationEditor />
      </div>
    </div>
  );
}
