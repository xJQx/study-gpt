import React, { useState } from 'react';
import { Loader } from '@/components';
import { toast } from 'react-hot-toast';
import { FlashCardNotes, FlashCards } from '@/components/flashcard';

export default function FlashCardGenerator() {
  const [isEnterNotesView, toggleEnterNotesView] = useState(true);
  const [flashCardList, setFlashCardList] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateFlashCards = async (notes: string) => {
    if (localStorage.getItem('apiKey') === null) {
      toast.error('Please add your API key in your profile.');
      return;
    }

    setIsLoading(true);

    // API request
    try {
      const response = await fetch('/api/flashcard', {
        method: 'POST',
        body: JSON.stringify({
          prompt: notes,
          apiKey: localStorage.getItem('apiKey')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (!data) {
        return;
      }
      const { flashCardList } = data;

      setFlashCardList(flashCardList);
      toggleEnterNotesView(false);
    } catch (e) {
      setIsLoading(false);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const generateNewFlashCard = () => {
    toggleEnterNotesView(true);
    setIsLoading(false);
  };

  return (
    <>
      <div className="shadow-lg bg-brand-neutral p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg transition hover:scale-105">
        {isEnterNotesView ? (
          <>
            {isLoading ? (
              <>
                <Loader text={'Generating flash cards...'} />
              </>
            ) : (
              <>
                <FlashCardNotes generateFlashCards={generateFlashCards} />
              </>
            )}
          </>
        ) : (
          <FlashCards
            list={flashCardList}
            generateNewFlashCards={generateNewFlashCard}
          />
        )}
      </div>
    </>
  );
}
