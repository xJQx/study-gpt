import React, { useState } from 'react';
import { FlashCardLayout } from './flashcard';
import { Notes } from './Notes';
import { Loader } from '@/components';
import { toast, Toaster } from 'react-hot-toast';

export const FlashCardMainLayout = () => {
  const [isNotesView, toggleNotesView] = useState(true);
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [loading, setLoading] = useState<boolean>(false);
  async function generateCards(notes: string) {
    if (localStorage.getItem('apiKey') == null) {
      toast.error('Please add your API key in your profile.');
    } else {
      setLoading(true);
      await fetch('/api/notes/quiz', {
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
      })
        .then(async res => {
          const resJson = await res.json();
          const { quiz } = resJson.data;
          setQuestions(quiz);
          toggleNotesView(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error('Something went wrong. Please try again later.');
        });
    }
  }

  function newTest() {
    toggleNotesView(true);
    setLoading(false);
  }

  return (
    <>
      <Toaster />
      <div className="shadow-lg bg-brand-neutral p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg transition hover:scale-105">
        {isNotesView ? (
          <>
            {loading ? (
              <>
                <Loader text={'Generating flash cards...'} />
              </>
            ) : (
              <>
                {' '}
                <Notes submitNotes={generateCards} />
              </>
            )}
          </>
        ) : (
          <FlashCardLayout list={questions} newTest={newTest} />
        )}
      </div>
    </>
  );
};
