import AccountEditor from "@/components/forms/accountEditor";
import { userSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { FaAngleDoubleRight } from "react-icons/fa";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { ZodIssue } from "zod";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";

export default async function UserEditorPage() {
  const token = cookies().get("token")?.value as string;
  const decode = await verifyToken(token);
  const username = decode.payload.username as string; // TODO: get from token

  const data = await db.user.findUnique({ where: { username } });

  if (!data) notFound();

  const handleSubmit = async (_prevState: any, formData: FormData) => {
    "use server";

    const passwords = {
      old: formData.get("old") as string,
      new: formData.get("password") as string,
      confirm: formData.get("confirm") as string,
    };

    const validation = userSchema.safeParse({
      username: data.username,
      password: passwords.new,
      role: data.role,
    });

    if (!validation.success) {
      return { errors: validation.error.issues };
    } else if (passwords.new !== passwords.confirm) {
      return {
        errors: [{ message: "Password not match", path: ["confirm"] } as ZodIssue],
      };
    } else if (!(await bcrypt.compare(passwords.old, data.password))) {
      return {
        errors: [{ message: "Wrong password", path: ["old"] } as ZodIssue],
      };
    } else {
      validation.data.password = await bcrypt.hash(validation.data.password, 10);
      await db.user.update({ where: { username }, data: validation.data });
      revalidatePath("/admin/account");
      redirect("/admin/account");
    }
  };

  return (
    <div className="min-h-screen text-light">
      <h2 className="text-3xl mb-6">ACCOUNT DASHBOARD</h2>
      <div className="bg-gray-700 rounded-xl *:px-12 *:py-6">
        <div className="border-b border-gray-500 flex items-center">
          <span className="font-bold">{data.username}</span>
          <FaAngleDoubleRight className="mx-2" />
          <span className="text-nowrap overflow-hidden text-ellipsis">Change password</span>
        </div>
        <AccountEditor data={data} action={handleSubmit} />
      </div>
    </div>
  );
}
