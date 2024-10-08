import Image from "next/image";
import Link from "next/link";

export default function AdminNotFoundPage() {
  return (
    <div className="h-full flex justify-center items-center text-light overflow-hidden">
      <div className="text-center">
        <Image width={320} height={320} src="/not-found.svg" alt="Error" className="w-72 m-auto" />
        <h2 className="text-xl">Not Found</h2>
        <p>Không thể tìm thấy tài nguyên được yêu cầu</p>
        <Link
          href="/admin"
          className="inline-block mt-4 p-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
