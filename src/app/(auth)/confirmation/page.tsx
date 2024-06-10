"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// type
type ConfiSchema = {
  code: number;
};

export default function Page() {
  const router = useRouter();
  // call the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConfiSchema>();

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
      label: "Your confirmation code",
      register: "code",
      req: "Please Enter the confirmation code",
      pattern: /^\d+$/,
      msgptr: "This is not a valid code confirmation only numbers",
    },
  ];

  // handle submit
  const submitform: SubmitHandler<ConfiSchema> = async (data) => {
    try {
      const resp = await axios.post("/api/confirm", data);
      // if the resp went well clear the forma and redirect to confirmation
      if (resp.status === 202 || 200) {
        console.log("well Confirmed 🎉");
        reset();
        router.push("/login");
      } else {
        console.error("Confirmation failed:", resp.data.message);
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
        <h1 className="text-xl font-bold">Confirm your account</h1>
        {Form_object.map((field) => (
          <div key={field.id} className="w-96">
            <input
              className="text-lg font-medium w-full border border-gray-300 bg-inherit p-2 rounded"
              type={field.type}
              placeholder={field.label}
              {...register(field.register as keyof ConfiSchema, {
                required: field.req,
                maxLength: {
                  value: field.max as number,
                  message: field.msgmax as string,
                },
                minLength: {
                  value: field.min as number,
                  message: field.msgmin as string,
                },
                pattern: {
                  value: field.pattern as RegExp,
                  message: field.msgptr as string,
                },
              })}
            />
            {errors[field.register as keyof ConfiSchema] && (
              <p className="text-red-500 mt-2">
                {errors[field.register as keyof ConfiSchema]?.message}
              </p>
            )}
          </div>
        ))}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-96 rounded border border-green-600 p-2 text-md font-medium hover:bg-green-600"
        >
          Confirm me
        </button>
      </form>
    </>
  );
}
