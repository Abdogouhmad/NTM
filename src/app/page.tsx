"use client";

import { useRouter } from "next/navigation";

//import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const Btn_metadata = [
    { id: 1, name: "Sign Up", rt: "/signup" },
    { id: 2, name: "Log In", rt: "/login" },
  ];
  return (
    <>
      {/* the main doc */}
      <main className="flex justify-center items-center p-10">
        {/* the main section */}
        <section className="flex flex-col space-y-10 justify-center items-center">
          <h1 className="text-4xl font-extrabold">
            {" "}
            Start taking notes with{" "}
            <span className="text-green-700"> NTM </span>{" "}
          </h1>

          {/* div for button redirection */}
          <div className="flex flex-row space-x-7">
            {Btn_metadata.map((item) => (
              <button
                className="text-md font-bold rounded border border-green-500 p-2 hover:bg-green-600"
                onClick={() => router.push(item.rt)}
                key={item.id}
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
