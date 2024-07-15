import Sidebar from "@/components/layouts/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex bg-gray-900">
      <Sidebar />
      <div className="px-4 py-8 md:px-12 md:py-10 min-h-screen overflow-hidden flex-grow">{children}</div>
    </main>
  );
}
