import AuthForm from "@/components/forms/authForm";

export default function AuthPage() {
  return (
    <main className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="text-gray-400 p-4 overflow-hidden">
        <img src="/logo.svg" className="w-48 m-auto" />
        <div className="text-center mt-12 mb-8">
          <p>Welcome back</p>
          <p>Please sign-in to your account</p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
