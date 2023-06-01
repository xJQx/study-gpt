import React from 'react';

interface OriginalNotesProps {
  originalNotes: string;
  setOriginalNotes: React.Dispatch<React.SetStateAction<string>>;
  summarize: (_: string) => void;
}

export const OriginalNotes = (props: OriginalNotesProps) => {
  const { originalNotes, setOriginalNotes, summarize } = props;

  return (
    <>
      <div className="py-5">
        <textarea
          value={originalNotes}
          onChange={e => setOriginalNotes(e.target.value)}
          className="w-full shadow-inner border-2 rounded-lg p-4 h-64"
          id="notesInput"
          required
        ></textarea>
        <button
          className={`flex justify-end ml-auto mr-0 mt-2 py-2 px-4 rounded ${
            originalNotes.length > 0
              ? 'bg-brand-pink hover:bg-brand-red text-white'
              : ' bg-gray-200 text-gray-300'
          }`}
          onClick={() => summarize(originalNotes)}
          disabled={originalNotes.length == 0}
        >
          Summarise
        </button>
      </div>
    </>
  );
};
