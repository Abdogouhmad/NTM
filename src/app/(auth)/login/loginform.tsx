"use client";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

// the type of schema
type FormSchema = {
  username: string;
  email: string;
  password: string;
};

export default function SignInForm() {
  // call the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>();

  // provide the form object
  const Form_object = [
    {
      id: 1,
      type: "text",
      label: "Your email",
      register: "email",
      req: "Please Enter your correct email",
      max: 100,
      min: 5,
      pattern: /@/i,
      msgptr: "This is not a valid email",
      msgmax: "The max characters allowed is 100",
      msgmin: "min characters allowed is 5",
    },
    {
      id: 2,
      type: "password",
      label: "Your password",
      register: "password",
      req: "Please Enter your correct password",
      max: 12,
      min: 8,
      msgmax: "The max characters allowed is 12",
      msgmin: "min characters allowed is 8",
      forgot: "Did you forget your password?",
      rt: "/forgotpassword",
    },
  ];

  // handle submit
  const submitform: SubmitHandler<FormSchema> = async (data) => {
    console.log(data);
    reset();

    try {
      const resp = await axios.post("/api/signin", data);
      if (!resp) {
        console.error("Something went wrong");
      } else {
        console.log("The data is logged 🎉");
        reset();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitform)}
        className="flex flex-col space-y-7 items-center justify-center min-h-screen p-10"
      >
        <h1 className="text-xl font-bold">
          Log In <span className="text-green-600"> NTM </span>
          and start taking notes
        </h1>
        {Form_object.map((field) => (
          <div key={field.id} className="w-96">
            <input
              className="text-lg font-semibold w-full border border-gray-300 bg-inherit p-2 rounded"
              type={field.type}
              placeholder={field.label}
              {...register(field.register as keyof FormSchema, {
                required: field.req,
                maxLength: {
                  value: field.max,
                  message: field.msgmax,
                },
                minLength: {
                  value: field.min,
                  message: field.msgmin,
                },
                pattern: {
                  value: field.pattern as RegExp,
                  message: field.msgptr as string,
                },
              })}
            />
            {errors[field.register as keyof FormSchema] && (
              <p className="text-red-500 mt-2">
                {errors[field.register as keyof FormSchema]?.message}
              </p>
            )}
            {field.rt && field.forgot && (
              <Link
                href={field.rt}
                className="text-sm font-medium text-blue-500 hover:text-blue-700"
              >
                {" "}
                {field.forgot}{" "}
              </Link>
            )}
          </div>
        ))}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-96 rounded border border-green-600 p-2 text-md font-medium hover:bg-green-600"
        >
          Log In
        </button>
        <Link href="/signup" className="text-blue-600 font-medium text-md ">
          {" "}
          Don&apos;t have an acount yet?{" "}
        </Link>
      </form>
    </>
  );
}
