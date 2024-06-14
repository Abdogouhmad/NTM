import React from "react";
import { Note } from "./dash";

interface DeletenoteProps {
  note: Note | null;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const Deletenote: React.FC<DeletenoteProps> = ({
  note,
  onClose,
  onConfirmDelete,
}) => {
  if (!note) return null;

  return (
    <div className="fixed z-50 bg-slate-400/80 w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/6 mx-auto bg-white p-10 rounded flex flex-col items-center gap-4">
        <h1>Delete Note</h1>
        <p>
          Are you sure you want to delete the note &quot;{note.Title}&quot;?
        </p>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white p-2 w-[100px] rounded"
            onClick={() => {
              onConfirmDelete();
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-500 text-white p-2 w-[100px] rounded"
            onClick={() => {
              onClose();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletenote;
