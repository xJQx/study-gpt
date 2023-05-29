import React, { useState } from 'react';
import { FlashCardLayout } from './flashcard';
import { Notes } from './Notes';

export const FlashCardMainLayout = () => {
    const [isNotesView, toggleNotesView] = useState(true);
    const [notes, setNotes] = useState('');
    const [questions, setQuestions] = useState([{question: '', answer: ''}]);

    function submitNotes(notes: string) {
        setNotes(notes);
        // TODO: Send notes to api, receive response. If api did not return an error message, toggle to flash cards; otherwise 
        // notify error to user
        setQuestions([
            {
                question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque in dictum non?",
                answer: "Ac ut consequat semper viverra nam libero justo laoreet sit. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sapien et ligula ullamcorper malesuada proin libero nunc. Tincidunt dui ut ornare lectus sit."
            },
            {
                question: "Suspendisse potenti nullam ac tortor vitae purus faucibus ornare?",
                answer: "Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Lectus nulla at volutpat diam ut venenatis. Urna id volutpat lacus laoreet."
            }
        ]);
        toggleNotesView(false);
    }

    function newTest() {
        setNotes('');
        toggleNotesView(true);
    }

    return (
        <div className='shadow p-10 bg-gray-100 mx-48 my-12 rounded-lg text-lg'>
            {
                isNotesView 
                ? <Notes submitNotes={submitNotes} />
                : <FlashCardLayout list={questions} newTest={newTest} />
            }
        </div>
    );
}
