import AuthForm from "@/components/forms/authForm";
import { ZodIssue } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { authSchema } from "@/lib/schemas";
import { signToken } from "@/lib/token";

export default function AuthPage() {
  const handleAuthenticate = async (_prevState: any, formData: FormData) => {
    "use server";

    const validation = authSchema.safeParse({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (!validation.success) {
      return { errors: validation.error.issues };
    } else {
      const { username, password } = validation.data;
      const foundUser = await db.user.findUnique({ where: { username } });
      if (!foundUser) {
        return { errors: [{ message: "Username not found", path: ["username"] } as ZodIssue] };
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
        return { errors: [{ message: "Wrong password", path: ["password"] } as ZodIssue] };
      }

      const token = await signToken({ username: foundUser.username, role: foundUser.role });
      cookies().set("token", token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        domain: process.env.HOST ?? "localhost",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      redirect("/admin");
    }
  };

  return (
    <main className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-gray-400 p-4 overflow-hidden">
        <img src="/logo.svg" className="w-48 m-auto" />
        <div className="text-center mt-12 mb-8">
          <p>Welcome back</p>
          <p>Please sign-in to your account</p>
        </div>
        <AuthForm action={handleAuthenticate} />
      </div>
    </main>
  );
}
