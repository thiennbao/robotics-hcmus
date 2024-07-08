import { verifyToken } from "@/lib/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SidebarNav from "./sidebarNav";

const Sidebar = async () => {
  const token = cookies().get("token")?.value as string;
  const decode = await verifyToken(token);
  const isRoot = decode.payload.role === "ROOT";

  const logout = async () => {
    "use server";

    cookies().delete("token");
    redirect("/auth");
  };

  return <SidebarNav isRoot={isRoot} logout={logout} />;
};

export default Sidebar;
