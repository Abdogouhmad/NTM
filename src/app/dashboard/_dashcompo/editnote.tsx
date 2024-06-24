"use client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { Note } from "./dash"; // Import Note interface from dash

// types for EditNoteSchema
type EditNoteSchema = {
  Title: string;
  Description: string;
  NoteType: string; // either for twm or today (data I mean)
  Note: string;
};

// Define the props for EditNote
interface EditNoteProps {
  note: Note | null;
  onClose: () => void;
}

const Editnote: React.FC<EditNoteProps> = ({ note, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditNoteSchema>();

  const NoteOptions = [
    { value: "Today's notes", label: "Today's Notes" },
    { value: "Tomorrow's notes", label: "Tomorrow's Notes" },
    { value: "This week's notes", label: "This Week's Notes" },
  ];

  const HandleEditNote: SubmitHandler<EditNoteSchema> = async (data) => {
    const Username = getCookie("username");
    const { Description, Note, NoteType, Title } = data;
    const id = note?.id;
    const API_URL = `https://9q2n41kupj.execute-api.us-east-1.amazonaws.com/dev/note`;

    const payload = {
      id,
      Title,
      Description,
      NoteType,
      Note,
      Username,
    };
    console.log(payload);
    try {
      const resp = await axios.put(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status === 200 || resp.status === 202) {
        toast.success("Note edited successfully!");
      } else {
        console.error("Something went wrong:", resp.status);
        toast.error("Failed to edit note.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("An error occurred while editing the note.");
    } finally {
      reset();
      onClose();
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
        <form onSubmit={handleSubmit(HandleEditNote)}>
          <div className="flex flex-col gap-4 mt-5">
            <h1 className="text-xl font-semibold">Edit Note</h1>
            <input
              className="bg-zinc-100/50 p-2 border border-gray-200 rounded w-full"
              type="text"
              placeholder="Title"
              {...register("Title", { required: true })}
              defaultValue={note?.Title}
            />
            {errors.Title && (
              <p className="text-red-500 mt-2">{errors.Title?.message}</p>
            )}
            <input
              className="bg-zinc-100/50 p-2 border border-gray-200 rounded w-full"
              type="text"
              placeholder="Description"
              {...register("Description", { required: true })}
              defaultValue={note?.Description}
            />
            {errors.Description && (
              <p className="text-red-500 mt-2">{errors.Description?.message}</p>
            )}
            <select
              className="w-full p-2 bg-zinc-100/50 rounded border border-gray-200"
              {...register("NoteType", { required: true })}
              defaultValue={note?.NoteType}
            >
              <option value="">Select note type</option>
              {NoteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.NoteType && (
              <p className="text-red-500 mt-2">{errors.NoteType?.message}</p>
            )}
            <textarea
              rows={5}
              className="block p-2.5 w-full bg-zinc-100 rounded-lg border border-gray-300"
              placeholder="Write your Notes here..."
              {...register("Note", { required: true })}
              defaultValue={note?.Note}
            />
            {errors.Note && (
              <p className="text-red-500 mt-2">{errors.Note?.message}</p>
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
};

export default Editnote;
