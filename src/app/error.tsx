"use client";

import Image from "next/image";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-light overflow-hidden">
      <div className="text-center">
        <Image width={320} height={320} src="/error.svg" alt="Error" className="w-72 m-auto" />
        <h2 className="text-xl">Internal Server Error</h2>
        <p className="m-auto">Something went wrong, please try again later.</p>
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
