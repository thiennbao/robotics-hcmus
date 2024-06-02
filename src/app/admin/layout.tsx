import Sidebar from "./_layouts/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex bg-gray-900">
      <Sidebar />
      <div className="mx-4 my-8 md:mx-12 md:my-10 flex-grow overflow-hidden">{children}</div>
    </main>
  );
}
