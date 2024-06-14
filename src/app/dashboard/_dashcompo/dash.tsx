"use client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdHome, IoMdPerson } from "react-icons/io";
import Notecard from "./notecard";
import Addnote from "./addnote";
import Deletenote from "./deletenote";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import Link from "next/link";

export interface Note {
  id: string;
  NoteType: string;
  Note: string;
  Title: string;
  Description: string;
}

export interface NotesData {
  notes: Note[];
}

export default function Dash() {
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  useEffect(() => {
    // Retrieve the username from the cookie
    const username = getCookie("username");
    setUsername(username || "");

    // Fetch notes when component mounts
    handleFetch();
  }, []);

  // Fetch notes from API
  const handleFetch = async () => {
    const API_URL =
      "https://w1zmls7b31.execute-api.us-east-1.amazonaws.com/prod/note";

    try {
      const resp = await axios.get<NotesData>(API_URL);
      setNotes(resp.data.notes);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  // Handle opening the delete note confirmation dialog
  const handleDeleteNoteOpen = (note: Note) => {
    setNoteToDelete(note);
    setDeleteNoteOpen(true);
  };

  // Handle closing the delete note confirmation dialog
  const handleDeleteNoteClose = () => {
    setDeleteNoteOpen(false);
    setNoteToDelete(null);
  };

  // Handle confirming the deletion of the note
  const handleConfirmDeleteNote = async () => {
    if (noteToDelete) {
      const API_URL =
        "https://bcmkkuxdqf.execute-api.us-east-1.amazonaws.com/prod/note";

      try {
        await axios.delete(`${API_URL}?id=${noteToDelete.id}`);
        // Refresh the notes list after deletion
        handleFetch();
      } catch (error) {
        console.error("Error deleting note: ", error);
      } finally {
        // Close the delete confirmation dialog
        setDeleteNoteOpen(false);
        setNoteToDelete(null);
      }
    }
  };

  // Handle logging out the user
  const handleLogout = async () => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      try {
        deleteCookie("username");
        deleteCookie("accessToken");
        window.location.href = "/login"; // Update with your login route
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    } else {
      console.error("Refresh token not found");
    }
  };

  // Handle opening the add note form
  const handleAddNoteOpen = () => {
    setAddNoteOpen(true);
  };

  // Handle closing the add note form
  const handleAddNoteClose = () => {
    setAddNoteOpen(false);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden bg-white w-1/6 md:flex flex-col justify-between py-10 items-center shadow-xl shadow-black/30">
          {/* Navigation section */}
          <div className="flex flex-col gap-2">
            <Link href={"/"} passHref>
              <div className="flex items-center gap-1 text-md cursor-pointer font-semibold hover:text-green-700">
                <IoMdHome className="text-2xl" />
                Home
              </div>
            </Link>
            <span
              className="flex items-center gap-1 text-md cursor-pointer font-semibold hover:text-green-700"
              onClick={handleAddNoteOpen}
            >
              <IoMdAddCircle className="text-2xl" />
              Add Note
            </span>
          </div>
          {/* User section */}
          <div className="flex items-center gap-1 text-xl cursor-pointer">
            <IoMdPerson className="text-2xl" />
            <div className="flex items-center">
              <span className="first-letter:uppercase font-medium">
                {username}
              </span>
            </div>
          </div>
        </div>
        {/* Main content area */}
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
          {/* Note cards */}
          <Notecard
            notesData={{ notes }}
            onEditNote={handleAddNoteOpen} // Replace with your edit note handler
            onDeleteNote={handleDeleteNoteOpen}
          />
        </div>
        {/* Add note form */}
        {addNoteOpen && <Addnote onClose={handleAddNoteClose} />}
        {/* Delete confirmation dialog */}
        {deleteNoteOpen && (
          <Deletenote
            note={noteToDelete}
            onClose={handleDeleteNoteClose}
            onConfirmDelete={handleConfirmDeleteNote}
          />
        )}
      </div>
    </>
  );
}
