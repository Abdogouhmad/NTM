"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdHome, IoMdPerson } from "react-icons/io";
import Notecard from "./notecard";
import Addnote from "./addnote";
import Deletenote from "./deletenote";
import { getCookie, deleteCookie } from "cookies-next";

export default function Dash() {
  const notesData = {
    notes: [
      {
        id: 1,
        NoteType: "Today's notes",
        Note: "hey man",
        Title: "abdo",
        Description: "cool",
      },
      {
        id: 2,
        NoteType: "Tomorrow's notes",
        Note: "Discussed the project milestones, assigned tasks, and set deadlines for the next phase. Follow-up required on budget approval.",
        Title: "Meeting Summary",
        Description: "Summary of the meeting held on June 12th.",
      },
      {
        id: 3,
        NoteType: "This week's notes",
        Note: "Discussed the project milestones, assigned tasks, and set deadlines for the next phase. Follow-up required on budget approval.",
        Title: "Meeting Summary",
        Description: "Summary of the meeting held on June 12th.",
      },
    ],
  };

  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);
  const [username, setUsername] = useState("");

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

  useEffect(() => {
    // Retrieve the username from the cookie
    const username = getCookie("username");
    setUsername(username || "");
  }, []);

  // logout from session
  const handleLogout = async () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      try {
        deleteCookie("username");
        deleteCookie("accessToken");
        window.location.href = "/login"; // Update with the correct login route
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    } else {
      console.error("Refresh token not found");
    }
  };

  return (
    <>
      <div className="flex  h-screen">
        <div className="hidden bg-white w-1/6 md:flex flex-col justify-between py-10 items-center shadow-xl shadow-black/30">
          {/* Top section */}
          <div className="flex flex-col gap-2 ">
            <Link
              href={"/"}
              className="flex items-center gap-1 text-md cursor-pointer font-semibold hover:text-green-700"
            >
              <IoMdHome className="text-2xl" />
              Home
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
              {username}
            </span>
          </div>
        </div>
        {/* the notes are here */}
        <div className="w-5/6 p-5 flex flex-col gap-4">
          <div className="flex justify-between border-b border-black p-5 items-center">
            <h1 className="text-xl font-bold">My Notes</h1>
            <button
              onClick={handleLogout}
              className="bg-black p-2 w-auto rounded hover:bg-red-600 text-md font-semibold text-white"
            >
              Log out
            </button>
          </div>
          {/* the note cards are here */}
          <div className="bg-gray-50 shadow-lg shadow-black/20 p-5 rounded-sm">
            <Notecard
              notesData={notesData}
              onEditNote={handleAddNoteOpen}
              onDeleteNote={handleDeleteNoteOpen}
            />
          </div>
        </div>
        {addNoteOpen && <Addnote onClose={handleAddNoteClose} />}
        {deleteNoteOpen && <Deletenote setdeleteNote={handleDeleteNoteClose} />}
      </div>
    </>
  );
}
