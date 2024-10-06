import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex justify-center items-center text-light bg-gray-900 overflow-hidden">
      <div className="text-center pb-16">
        <Image width={320} height={320} src="/not-found.svg" alt="Not found" className="w-72 m-auto" />
        <h2 className="text-3xl mb-4">Not Found</h2>
        <p>Trang bạn đang tìm không tồn tại hoặc đã bị xóa</p>
        <Link
          href="/"
          className="inline-block mt-8 p-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
