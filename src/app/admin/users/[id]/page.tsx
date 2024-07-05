import UserEditor from "@/components/forms/userEditor";
import { userSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function UserEditorPage({ params }: { params: { id: string } }) {
  const username = decodeURI(params.id);

  let data: User | null = null;
  if (username !== "add") {
    data = await db.user.findUnique({ where: { username } });
    if (!data) notFound();
  }

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = userSchema.safeParse({
      username: formData.get("username") as string,
      password: (formData.get("password") as string) || data?.password,
      role: formData.get("role") as string,
    });

    if (validation.success) {
      if (username === "add") {
        validation.data.password = await bcrypt.hash(validation.data.password, 10);
        await db.user.create({ data: validation.data });
      } else {
        if (validation.data.password !== data?.password) {
          validation.data.password = await bcrypt.hash(validation.data.password, 10);
        }
        await db.user.update({ where: { username }, data: validation.data });
      }
      revalidatePath("/admin/users");
      redirect("/admin/users");
    } else {
      return { errors: validation.error.issues };
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">USER DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <Link href="../" className="font-bold hover:text-sky-500 transition">
            Users
          </Link>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">
            {data?.username || "Add a user"}
          </span>
        </div>
        <UserEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
