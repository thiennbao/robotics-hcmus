import AuthForm from "@/components/forms/authForm";
import Image from "next/image";

export default function AuthPage() {
  return (
    <main className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-gray-400 p-4 overflow-hidden">
        <Image src="/logo.svg" alt="Robotics and IoT HCMUS" width={200} height={125} className="m-auto" />
        <div className="text-center mt-12 mb-8">
          <p>Welcome back</p>
          <p>Please sign-in to your account</p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
