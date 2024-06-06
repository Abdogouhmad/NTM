import React from "react";
import { CiStickyNote } from "react-icons/ci";
function Notecard({ onAddNote, onDeleteNote }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <CiStickyNote className="text-xl" />
      <div className="flex-1">
        <h3 className="font-medium">Run out door</h3>
        <p className="text-gray-600">Leave the house at 5 am</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-black p-2 rounded hover:bg-black/70 text-md font-semibold text-white"
          onClick={onAddNote}
        >
          Add
        </button>
        <button
          className="bg-black p-2 rounded hover:bg-black/70 text-md font-semibold text-white"
          onClick={() => console.log("edit")}
        >
          Edit
        </button>
        <button
          className="bg-black p-2 rounded hover:bg-red-600 text-md font-semibold text-white"
          onClick={onDeleteNote}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notecard;
