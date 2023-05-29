import React, { useState } from 'react';

interface OriginalNotesProps {
  summarize: (notes: string) => void;
}

export const OriginalNotes = ({ summarize }: OriginalNotesProps) => {
  const [notes, setNotes] = useState('');

  return (
    <>
      <div className="py-5">
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full shadow-inner border-2 rounded-lg p-4 h-64"
          id="notesInput"
          required
        ></textarea>
        <button
          className={`flex justify-end ml-auto mr-0 mt-2 py-2 px-4 rounded ${
            notes.length > 0
              ? 'bg-brand-pink hover:bg-brand-red text-white'
              : ' bg-gray-200 text-gray-300 border-2'
          }`}
          onClick={() => summarize(notes)}
          disabled={notes.length == 0}
        >
          Summarise
        </button>
      </div>
    </>
  );
};
