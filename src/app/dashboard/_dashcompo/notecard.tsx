import React from "react";
import { CiStickyNote } from "react-icons/ci";

interface Note {
  id: string;
  NoteType: string;
  Note: string;
  Title: string;
  Description: string;
}

interface NotesData {
  notes: Note[];
}

interface NotecardProps {
  notesData: NotesData;
  onEditNote: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
}

const Notecard: React.FC<NotecardProps> = ({
  notesData,
  onEditNote,
  onDeleteNote,
}) => {
  const groupedNotes = notesData.notes.reduce<Record<string, Note[]>>(
    (acc, note) => {
      if (!acc[note.NoteType]) {
        acc[note.NoteType] = [];
      }
      acc[note.NoteType].push(note);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-5">
      {Object.values(groupedNotes).map((notesList, index) => (
        <div key={index} className="bg-zinc-100/50 rounded p-3">
          <h1 className="text-xl font-bold">
            {notesList[0]?.NoteType || "Other Notes"}
          </h1>
          <br />
          {notesList.map((note) => (
            <div className="flex items-center gap-4 mb-2" key={note.id}>
              <CiStickyNote className="text-xl" />
              <div className="flex-1">
                <h3 className="font-medium">{note.Title}</h3>
                <p className="text-gray-600">{note.Description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-black p-2 rounded hover:bg-black/70 text-md font-semibold text-white"
                  onClick={() => onEditNote(note)}
                >
                  Edit
                </button>
                <button
                  className="bg-black p-2 rounded hover:bg-red-600 text-md font-semibold text-white"
                  onClick={() => onDeleteNote(note)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Notecard;
