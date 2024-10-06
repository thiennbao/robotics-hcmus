import AuthForm from "@/components/forms/authForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth | Robotics & IoT HCMUS",
  description: "Đăng nhập vào Robotics and IoT HCMUS",
};

export default function AuthPage() {
  return (
    <main className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-gray-400 p-4 overflow-hidden">
        <Image src="/logo.png" alt="Robotics and IoT HCMUS" width={200} height={125} className="m-auto" />
        <div className="text-center mt-12 mb-8">
          <p>Chào mừng quay trở lại</p>
          <p>Xin vui lòng đăng nhập vào hệ thống</p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
