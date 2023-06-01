import React from 'react';

interface SummarisedNotesProps {
  summarisedNotes: string;
}

export const SummarisedNotes = ({ summarisedNotes }: SummarisedNotesProps) => {
  return (
    <>
      <div className="py-5">
        <div
          className="w-full shadow-inner border-2 rounded-lg p-4 h-64 bg-gray-50"
          style={{ height: 'auto' }}
        >
          {summarisedNotes}
        </div>
      </div>
    </>
  );
};
