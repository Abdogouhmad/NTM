"use client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle, IoMdHome, IoMdPerson } from "react-icons/io";
import Notecard from "./notecard";
import Addnote from "./addnote";
import Editnote from "./editnote";
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
  const [addNoteOpen, setAddNoteOpen] = useState(false); // for add note to be open
  const [editNoteOpen, setEditNoteOpen] = useState(false); // edit note to be open
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false); // to delete note to be open
  const [username, setUsername] = useState(""); // username to be captured
  const [notes, setNotes] = useState<Note[]>([]); // note data to be passed
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null); // edit note data (id is passed here)
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null); // the note to be deleted

  useEffect(() => {
    const username = getCookie("username");
    setUsername(username || "");

    handleFetch();
  }, []);

  const handleFetch = async () => {
    const API_URL =
      "https://9q2n41kupj.execute-api.us-east-1.amazonaws.com/dev/note";

    try {
      const resp = await axios.get<NotesData>(API_URL);
      setNotes(resp.data.notes);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  // open the delete pop up
  const handleDeleteNoteOpen = (note: Note) => {
    setNoteToDelete(note);
    setDeleteNoteOpen(true);
  };

  // close the delete pop up
  const handleDeleteNoteClose = () => {
    setDeleteNoteOpen(false);
    setNoteToDelete(null);
  };

  // confirm the delete
  const handleConfirmDeleteNote = async () => {
    if (noteToDelete) {
      const API_URL =
        "https://9q2n41kupj.execute-api.us-east-1.amazonaws.com/dev/note";

      try {
        await axios.delete(`${API_URL}?id=${noteToDelete.id}`);
        handleFetch();
      } catch (error) {
        console.error("Error deleting note: ", error);
      } finally {
        setDeleteNoteOpen(false);
        setNoteToDelete(null);
      }
    }
  };

  // logout function
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

  // add note open pop up
  const handleAddNoteOpen = () => {
    setAddNoteOpen(true);
  };
  // add note close pop up
  const handleAddNoteClose = () => {
    setAddNoteOpen(false);
  };

  // edit note pop up open
  const handleEditNoteOpen = (note: Note) => {
    if (!note.id) {
      console.error("Note ID is missing:", note);
      return;
    }
    console.log(note.id);
    setNoteToEdit(note);
    setEditNoteOpen(true);
  };

  // edit note close pop up
  const handleEditNoteClose = () => {
    setEditNoteOpen(false);
    setNoteToEdit(null);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden bg-white w-1/6 md:flex flex-col justify-between py-10 items-center shadow-xl shadow-black/30">
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
          <div className="flex items-center gap-1 text-xl cursor-pointer">
            <IoMdPerson className="text-2xl" />
            <div className="flex items-center">
              <span className="font-medium">{username}</span>
            </div>
          </div>
        </div>
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
          <Notecard
            notesData={{ notes }}
            onEditNote={handleEditNoteOpen}
            onDeleteNote={handleDeleteNoteOpen}
          />
        </div>
        {addNoteOpen && <Addnote onClose={handleAddNoteClose} />}
        {editNoteOpen && (
          <Editnote note={noteToEdit} onClose={handleEditNoteClose} />
        )}
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
