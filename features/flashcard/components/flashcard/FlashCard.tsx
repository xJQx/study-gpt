import React, { useState } from 'react';
import { FlashCardContent } from './FlashCardContent';

interface FlashCardProps {
  list: { question: string; answer: string }[];
  newTest: () => void;
}

export const FlashCardLayout = ({ list, newTest }: FlashCardProps) => {
  const [ansRevealed, toggleAnsReveal] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);

  function nextQuestion() {
    setQuestionNo(questionNo + 1);
    toggleAnsReveal(false);
  }

  function previousCard(isQuestionCard: boolean) {
    if (isQuestionCard) setQuestionNo(questionNo - 1);
    toggleAnsReveal(!ansRevealed);
  }

  return !ansRevealed ? (
    <>
      <FlashCardContent
        title={list[questionNo].question}
        number={`Question ${questionNo + 1}/${list.length}`}
      />
      <div className="flex mt-8">
        {questionNo > 0 ? (
          <button
            className="flex bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded"
            onClick={() => previousCard(true)}
          >
            Back
          </button>
        ) : (
          <></>
        )}
        <button
          className="flex justify-end ml-auto mr-0 bg-brand-pink hover:bg-brand-red text-white py-2 px-4 rounded"
          onClick={() => toggleAnsReveal(true)}
        >
          Answer
        </button>
      </div>
    </>
  ) : (
    <>
      <FlashCardContent
        title={list[questionNo].answer}
        number={`Question ${questionNo + 1}/${list.length}`}
      />
      <div className="flex mt-8">
        <button
          className="flex bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded"
          onClick={() => previousCard(false)}
        >
          Back
        </button>
        {questionNo < list.length - 1 ? (
          <button
            className="flex justify-end ml-auto mr-0 bg-brand-pink hover:bg-brand-red text-white py-2 px-4 rounded"
            onClick={nextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="flex justify-end ml-auto mr-0 bg-brand-pink hover:bg-brand-red text-white py-2 px-4 rounded"
            onClick={newTest}
          >
            Back to Home
          </button>
        )}
      </div>
    </>
  );
};
