import React, { useState } from 'react';

interface FlashCardNotesProps {
  generateFlashCards: (_: string) => void;
}

export const FlashCardNotes = ({ generateFlashCards }: FlashCardNotesProps) => {
  const [notes, setNotes] = useState('');

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-bold text-2xl mb-2">Flash Card Generator</h2>
        <p className="text-sm text-gray-500 font-bold">
          We will process the information and create at least 5 flash cards for
          you to test your knowledge
        </p>
      </div>

      {/* Input */}
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        className="w-full shadow-inner border-2 rounded-lg p-4 h-64"
        id="notesInput"
        required
      />

      {/* Button */}
      <button
        className={`flex justify-end ml-auto mr-0 mt-2 py-2 px-4 rounded ${
          notes.length > 0
            ? 'bg-brand-pink hover:bg-brand-red text-white'
            : ' bg-gray-200 text-gray-300'
        }`}
        onClick={() => generateFlashCards(notes)}
        disabled={notes.length == 0}
      >
        Generate
      </button>
    </>
  );
};
