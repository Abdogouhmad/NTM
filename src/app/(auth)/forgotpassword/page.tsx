"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type ResetPassSchema = {
  email: string;
};

export default function Page() {
  const router = useRouter();
  // call the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPassSchema>();

  // provide the form object
  const Form_object = [
    {
      id: 1,
      type: "text",
      label: "Your username",
      register: "username",
      req: "Please enter your username",
      max: 100,
      min: 2,
      msgmax: "The max characters allowed is 100",
      msgmin: "min characters allowed is 2",
    },
  ];
  // handle submit
  const submitform: SubmitHandler<ResetPassSchema> = async (data) => {
    try {
      // post the form at the backend
      const resp = await axios.post("/api/forgot", data);
      // if the resp went well clear the forma and redirect to confirmation
      if (resp.status === 202 || 200) {
        console.log("Check your Inbox");
        reset();
        router.push("/login");
      } else {
        console.error("Signup failed:", resp.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitform)}
      className="flex flex-col space-y-5 items-center justify-center min-h-screen p-10"
    >
      <h1 className="text-2xl md:text-xl text-center font-bold">
        Reset Password
      </h1>
      {Form_object.map((field) => (
        <div key={field.id} className="w-96">
          <input
            className="text-lg font-medium w-full border-[1px] border-gray-400 bg-inherit p-2 rounded"
            type={field.type}
            placeholder={field.label}
            {...register(field.register as keyof ResetPassSchema, {
              required: field.req,
              maxLength: {
                value: field.max,
                message: field.msgmax,
              },
              minLength: {
                value: field.min,
                message: field.msgmin,
              },
            })}
          />
          {errors[field.register as keyof ResetPassSchema] && (
            <p className="text-red-500 mt-2">
              {errors[field.register as keyof ResetPassSchema]?.message}
            </p>
          )}
        </div>
      ))}
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-72 rounded border border-green-600 p-2 text-md font-medium hover:bg-green-600"
      >
        Reset
      </button>
      <div className="flex gap-2 items-center justify-center space-x-4">
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
    </form>
  );
}
