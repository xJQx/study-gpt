import React, { useState } from 'react';

interface NotesProps {
  submitNotes: (notes: string) => void;
}

export const Notes = ({ submitNotes }: NotesProps) => {
  const [notes, setNotes] = useState('');
  const [isApiPromptOpened, toggleApiPrompt] = useState(false);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="font-bold text-2xl mb-2">Enter your study notes</h2>
        <p className="text-sm text-gray-500 font-bold">
          We will process the information and create up to 10 flash cards to
          test you
        </p>
      </div>
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
        onClick={() => submitNotes(notes)}
        disabled={notes.length == 0}
      >
        Start Test
      </button>
    </>
  );
};
