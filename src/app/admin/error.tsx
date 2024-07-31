"use client";

import Image from "next/image";

export default function AdminErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full flex justify-center items-center text-light overflow-hidden">
      <div className="text-center">
        <Image width={320} height={320} src="/error.svg" alt="Error" className="w-72 m-auto" />
        <h2 className="text-xl">Something went wrong</h2>
        <p className="w-3/4 m-auto">Error: {error.message}</p>
        <button
          onClick={reset}
          className="mt-4 p-2 rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
