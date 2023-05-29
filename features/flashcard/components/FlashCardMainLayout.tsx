import React, { useState } from 'react';
import { FlashCardLayout } from './flashcard';
import { Notes } from './Notes';

export const FlashCardMainLayout = () => {
    const [isNotesView, toggleNotesView] = useState(true);
    const [notes, setNotes] = useState('');

    function submitNotes(notes: string) {
        setNotes(notes);
        // TODO: Send notes to api, receive response. If api did not return an error message, toggle to flash cards; otherwise 
        // notify error to user
        toggleNotesView(false);
    }

    return (
        <div className='shadow p-10 bg-gray-100 mx-48 my-12 rounded-lg text-lg'>
            {
                isNotesView 
                ? <Notes submitNotes={submitNotes} />
                : <FlashCardLayout />
            }
        </div>
    );
}
