"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdHome, IoMdPerson } from "react-icons/io";
import Notecard from "./notecard";
import Addnote from "./addnote";
import Deletenote from "./deletenote";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";

export default function Dash() {
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);

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

    // Fetch notes when component mounts
    handleFetch();
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

  // fetch the data
  const handleFetch = async () => {
    const API_URL =
      "https://bcmkkuxdqf.execute-api.us-east-1.amazonaws.com/prod/note";

    try {
      const resp = await axios.get(API_URL);
      const { notes } = resp.data;
      setNotes(notes);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  // handle adding a new note
  // ... (existing code)

  return (
    <>
      <div className="flex h-[100%]">
        <div className="hidden bg-white w-1/6 md:flex flex-col justify-between py-10 items-center shadow-xl shadow-black/30">
          {/* Top section */}
          <div className="flex flex-col gap-2">
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
            <div className="flex items-center">
              <span className="first-letter:uppercase font-medium">
                {username}
              </span>
            </div>
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
          <Notecard
            notesData={{ notes }}
            onEditNote={handleAddNoteOpen}
            onDeleteNote={handleDeleteNoteOpen}
          />
        </div>
        {addNoteOpen && <Addnote onClose={handleAddNoteClose} />}
        {deleteNoteOpen && <Deletenote setdeleteNote={handleDeleteNoteClose} />}
      </div>
    </>
  );
}
