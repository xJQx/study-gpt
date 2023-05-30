import React, { useState } from 'react';
import { FlashCardLayout } from './flashcard';
import { Notes } from './Notes';

export const FlashCardMainLayout = () => {
  const [isNotesView, toggleNotesView] = useState(true);
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  async function generateCards(notes: string) {
    const res = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        text: notes,
        title: 'Generate questions',
        apiKey: localStorage.getItem('apiKey')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const resJson = await res.json();
    setQuestions(resJson.data.quiz);
    toggleNotesView(false);
  }

  function newTest() {
    setNotes('');
    toggleNotesView(true);
  }

  return (
    <div className="shadow bg-gray-100 p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg">
      {isNotesView ? (
        <Notes submitNotes={generateCards} />
      ) : (
        <FlashCardLayout list={questions} newTest={newTest} />
      )}
    </div>
  );
};
