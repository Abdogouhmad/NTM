import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="border border-black w-96 flex flex-col p-10 items-center justify-center gap-5 rounded h-[400px]">
        <h1 className="font-semibold text-2xl">Reset Password</h1>
        <input
          className="border border-gray-500 p-2 rounded w-full"
          type="text"
          placeholder="Email"
        />
        <button
          type="submit"
          className="w-full rounded border border-green-600 p-1 text-md font-medium  hover:bg-green-600"
        >
          Reset
        </button>
        <div className="flex gap-2 items-center space-x-4">
          <Link
            className="text-md text-blue-500 hover:text-blue-700"
            href="/login"
          >
            Login
          </Link>
          <div className="border brder-l h-4 border-green-700" />
          <Link
            className="text-md text-blue-500 hover:text-blue-700"
            href="/signup"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
