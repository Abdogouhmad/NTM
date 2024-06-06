"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// the type of schema
type FormSchema = {
  username: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const router = useRouter();
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
      label: "Your username",
      register: "username",
      req: "Please enter your username",
      max: 50,
      min: 2,
      msgmax: "The max characters allowed is 50",
      msgmin: "min characters allowed is 2",
      pattern: /^[A-Za-z0-9]+$/,
      msgptr: "Only Alphabets and digits are allowed in username",
    },
    {
      id: 2,
      type: "text",
      label: "Your email",
      register: "email",
      req: "Please enter your email",
      max: 100,
      min: 5,
      pattern: /@/i,
      msgptr: "This is not a valid email",
      msgmax: "The max characters allowed is 100",
      msgmin: "min characters allowed is 5",
    },
    {
      id: 3,
      type: "password",
      label: "Your password",
      register: "password",
      req: "Please enter your password",
      max: 12,
      min: 8,
      msgmax: "The max characters allowed is 12",
      msgmin: "min characters allowed is 8",
    },
  ];

  // handle submit
  const submitform: SubmitHandler<FormSchema> = async (data) => {
    // console.log(data);
    try {
      const resp = await axios.post("/api/signup", data);
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
    <form
      onSubmit={handleSubmit(submitform)}
      className="flex flex-col space-y-5 items-center justify-center min-h-screen p-10"
    >
      <h1 className="text-2xl md:text-xl text-center font-bold">
        Sign Up in <span className="text-green-600"> Noty </span>
        and start taking notes
      </h1>
      {Form_object.map((field) => (
        <div key={field.id} className="w-96">
          <input
            className="text-lg font-medium w-full border-[1px] border-gray-400 bg-inherit p-2 rounded"
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
        </div>
      ))}
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-96 rounded border border-green-600 p-2 text-md font-medium hover:bg-green-600"
      >
        Sign Up
      </button>
      <button
        disabled={isSubmitting}
        onClick={() => router.push("/login")}
        className="w-96 rounded border border-black p-2 text-md font-medium hover:bg-green-600"
      >
        Log In
      </button>
    </form>
  );
}
