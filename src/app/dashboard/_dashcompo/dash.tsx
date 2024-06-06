"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdAddCircle, IoMdPerson } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import Notecard from "./notecard";
import Addnote from "./addnote";
import Deletenote from "./deletenote";

export default function Dash() {
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);

  const handleAddNoteOpen = () => {
    setAddNoteOpen(true);
  };

  const handleAddNoteClose = () => {
    setAddNoteOpen(false);
  };

  const handleDeleteNoteOpen = () => {
    setDeleteNoteOpen(true);
  };

  const handleDeleteNoteClose = () => {
    setDeleteNoteOpen(false);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-white w-1/6 flex flex-col justify-between py-10 items-center shadow-xl shadow-black/30">
          {/* Top section */}
          <div className="flex flex-col gap-2">
            <Link
              href={"/dashboard"}
              className="flex items-center gap-1 text-md cursor-pointer font-semibold hover:text-green-700"
            >
              <MdDashboard className="text-2xl" />
              Dashboard
            </Link>
            <span
              className="flex items-center gap-1 text-md cursor-pointer font-semibold hover:text-green-700"
              onClick={handleAddNoteOpen}
            >
              <IoMdAddCircle className="text-2xl" />
              Add Note
            </span>
          </div>

          {/* Bottom section */}
          <div className="flex items-center gap-1 text-xl cursor-pointer">
            <IoMdPerson className="text-2xl" />
            <span className="first-letter:uppercase font-medium">
              A.Gouhmad
            </span>
          </div>
        </div>

        {/* the notes are here */}
        <div className=" w-5/6 p-5 flex flex-col gap-4">
          <div className="flex justify-between border-b border-black p-5  items-center">
            <h1 className="text-xl font-bold">My Notes</h1>
            <button className="bg-black p-2 w-auto rounded hover:bg-red-600 text-md font-semibold text-white ">
              Log out
            </button>
          </div>
          {/* the note cards are here */}
          <div className="bg-gray-50 shadow-lg shadow-black/20 p-5 rounded-sm">
            <h1 className="text-xl font-bold">Today&apos;s Notes</h1>
            <br />
            <div className="flex flex-col gap-4">
              <Notecard
                onEditNote={handleAddNoteOpen}
                onDeleteNote={handleDeleteNoteOpen}
              />
            </div>
          </div>
          <div className="bg-gray-50 shadow-lg shadow-black/20 p-5 rounded-sm">
            <h1 className="text-xl font-bold">Tomorrow&apos;s Notes</h1>
            <br />
            <div className="flex flex-col gap-4">
              <Notecard
                onEditNote={handleAddNoteOpen}
                onDeleteNote={handleDeleteNoteOpen}
              />
            </div>
          </div>
          <div className="bg-gray-50 shadow-lg shadow-black/20 p-5 rounded-sm">
            <h1 className="text-xl font-bold">This Week&apos;s Notes</h1>
            <br />
            <div className="flex flex-col gap-4">
              <Notecard
                onEditNote={handleAddNoteOpen}
                onDeleteNote={handleDeleteNoteOpen}
              />
            </div>
          </div>
        </div>
        {addNoteOpen && <Addnote onClose={handleAddNoteClose} />}
        {deleteNoteOpen && <Deletenote setdeleteNote={handleDeleteNoteClose} />}
      </div>
    </>
  );
}
