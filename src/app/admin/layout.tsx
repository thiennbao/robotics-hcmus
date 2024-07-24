import Sidebar from "@/components/layouts/sidebar";
import { deleteToken, verifyToken } from "@/lib/token";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const decode = await verifyToken();
  const isRoot = decode.payload.role === "ROOT";

  const logout = async () => {
    "use server";

    deleteToken();
    redirect("/auth");
  };
  return (
    <main className="flex bg-gray-900">
      <Sidebar isRoot={isRoot} logout={logout} />
      <div className="px-4 py-8 md:px-12 md:py-10 min-h-screen overflow-hidden flex-grow">
        {children}
      </div>
    </main>
  );
}
