import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="h-full flex justify-center items-center text-light overflow-hidden">
      <div className="text-center">
        <img src="/not-found.svg" className="w-72 m-auto" />
        <h2 className="text-xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          href="/admin"
          className="inline-block mt-4 p-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
