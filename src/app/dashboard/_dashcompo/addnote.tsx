"use client";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

function Addnote({ onClose }) {
  const NoteOptions = [
    { value: "today", label: "Today's Notes" },
    { value: "tomorrow", label: "Tomorrow's Notes" },
    { value: "week", label: "This Week's Notes" },
  ];

  const Notedata = [
    {
      id: 1,
      type: "text",
      plc: "Title",
    },
    {
      id: 2,
      type: "text",
      plc: "Description",
    },
  ];

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
        <div className="flex flex-col gap-4 mt-5">
          <h1 className="text-xl font-semibold">Add Note</h1>
          {Notedata.map((data) => (
            <input
              key={data.id}
              className="bg-zinc-100/50 p-2 border border-gray-200 rounded w-full"
              type={data.type}
              placeholder={data.plc}
            />
          ))}
          <div>
            <select className="w-full p-2 bg-zinc-100/50 rounded border border-gray-200">
              <option value="">Select note type</option>
              {NoteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            rows={5}
            className="block p-2.5 w-full bg-zinc-100 rounded-lg border border-gray-300"
            placeholder="Write your Notes here..."
          />
          <div className="flex justify-end">
            <button className="bg-black text-white p-2 w-[100px] rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addnote;
