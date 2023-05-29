import React, { useState } from 'react';

interface NotesProps {
    submitNotes: (notes: string) => void;
}

export const Notes = ({ submitNotes }: NotesProps) => {
    const [notes, setNotes] = useState('');

    return (
        <>
            <h2 className='font-bold text-2xl mb-12 text-center'>Enter your study notes here</h2>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className='w-full shadow-inner border-2 rounded-lg p-4 h-64'
                id="notesInput"
                required
            ></textarea>
            <button
                className={`flex justify-end ml-auto mr-0 mt-2 font-bold py-2 px-4 rounded ${
                    notes.length > 0 ? 'bg-brand-red hover:bg-brand-pink text-white' : ' bg-gray-200 text-gray-300 border-2'
                }`}
                onClick={() => submitNotes(notes)}
                disabled={notes.length == 0}
            >
                Start Test
            </button>
        </>
    );
}