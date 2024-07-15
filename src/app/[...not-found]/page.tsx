import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center text-light bg-gray-900 overflow-hidden">
      <div className="text-center pb-16">
        <img src="/not-found.svg" className="w-72 m-auto" />
        <h2 className="text-3xl mb-4">Not Found</h2>
        <p>The page you are looking for was moved, removed, renamed or might never existed!</p>
        <Link
          href="/"
          className="inline-block mt-8 p-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
