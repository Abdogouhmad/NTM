"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

// types for Addnote
type AddNoteSchema = {
  title: string;
  description: string;
  notetype: string; // either for twm or today (data I mean)
  note: string;
};

function Addnote({ onClose }) {
  // use form here
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddNoteSchema>();

  // data form
  const NoteOptions = [
    { value: "Today's notes", label: "Today's Notes" },
    { value: "Tomorrow's notes", label: "Tomorrow's Notes" },
    { value: "This week's notes", label: "This Week's Notes" },
  ];

  const Notedata = [
    {
      id: 1,
      type: "text",
      plc: "Title",
      register: "title",
      req: "Please enter the title",
      max: 20,
      msgmax: "max characters allowed are 20",
      min: 2,
      msgmin: "min characters allowed are 2",
    },
    {
      id: 2,
      type: "text",
      plc: "Description",
      register: "description",
      req: "Please enter the description",
      max: 50,
      msgmax: "max characters allowed are 50",
      min: 2,
      msgmin: "min characters allowed are 2",
    },
  ];

  // Handle add note
  const HandleAddNote: SubmitHandler<AddNoteSchema> = async (data) => {
    // get the cookie username as value
    const username = getCookie("username");
    // deconstract the values from the data
    const { description, note, notetype, title } = data;
    // url var
    const API_URL =
      "https://bcmkkuxdqf.execute-api.us-east-1.amazonaws.com/prod/note";
    // inject all these into payload
    const payload = {
      title,
      description,
      notetype,
      note,
      username,
    };

    try {
      // post the payload to the /notes api
      const resp = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // check the return of the axios
      if (resp.status === 200 || resp.status === 202) {
        toast.success("Note added successfully!");
      } else {
        console.error("Something went wrong:", resp.status);
        toast.error("Failed to add note.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("An error occurred while adding the note.");
    } finally {
      reset();
    }
  };

  return (
    <div className="fixed z-50 bg-black/80 w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/6 mx-auto bg-white p-10 rounded">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-4">
            <FaRegTrashAlt className="cursor-pointer text-2xl hover:fill-red-700" />
            <MdEditDocument className="cursor-pointer text-2xl hover:fill-black/70" />
          </div>
          <div>
            <IoMdClose className="cursor-pointer text-2xl" onClick={onClose} />
          </div>
        </div>
        <form onSubmit={handleSubmit(HandleAddNote)}>
          <div className="flex flex-col gap-4 mt-5">
            <h1 className="text-xl font-semibold">Add Note</h1>
            {Notedata.map((field) => (
              <div key={field.id}>
                <input
                  className="bg-zinc-100/50 p-2 border border-gray-200 rounded w-full"
                  type={field.type}
                  placeholder={field.plc}
                  {...register(field.register as keyof AddNoteSchema, {
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
                {errors[field.register as keyof AddNoteSchema] && (
                  <p className="text-red-500 mt-2">
                    {errors[field.register as keyof AddNoteSchema]?.message}
                  </p>
                )}
              </div>
            ))}
            <div>
              <select
                className="w-full p-2 bg-zinc-100/50 rounded border border-gray-200"
                {...register("notetype" as keyof AddNoteSchema, {
                  required: "Choose the data of the note",
                })}
              >
                <option value="">Select note type</option>
                {NoteOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors["notetype" as keyof AddNoteSchema] && (
                <p className="text-red-500 mt-2">
                  {errors["notetype" as keyof AddNoteSchema]?.message}
                </p>
              )}
            </div>
            <textarea
              rows={5}
              className="block p-2.5 w-full bg-zinc-100 rounded-lg border border-gray-300"
              placeholder="Write your Notes here..."
              {...register("note" as keyof AddNoteSchema, {
                required: "Leave a note that is important",
                minLength: {
                  value: 1 as number,
                  message: "At lease one character man!",
                },
              })}
            />
            {errors["note" as keyof AddNoteSchema] && (
              <p className="text-red-500 mt-2">
                {errors["note" as keyof AddNoteSchema]?.message}
              </p>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white p-2 w-[100px] rounded"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addnote;
