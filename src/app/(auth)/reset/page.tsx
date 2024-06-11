"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// the type of schema
type FormSchema = {
  username: string;
  resetcode: string;
  newpassword: string;
};

export default function Page() {
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
      label: "Reset code",
      register: "resetcode",
      req: "Please enter reset code",
      max: 10,
      min: 3,
      msgmax: "The max characters allowed is 10",
      msgmin: "min characters allowed is 3",
    },
    {
      id: 3,
      type: "password",
      label: "Your new password",
      register: "newpassword",
      req: "Please enter your new password",
      max: 12,
      min: 8,
      msgmax: "The max characters allowed is 12",
      msgmin: "min characters allowed is 8",
    },
  ];

  // handle submit
  const submitform: SubmitHandler<FormSchema> = async (data) => {
    try {
      // post the form at the backend
      const resp = await axios.post("/api/reset", data);
      // if the resp went well clear the forma and redirect to confirmation
      if (resp.status === 202 || 200) {
        toast.success("Password is updated successfuly");
        reset();
        router.push("/login");
      } else {
        toast.success("Updating password is failed:", resp.data.message);
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
        Update Your Password
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
        Update
      </button>
    </form>
  );
}
