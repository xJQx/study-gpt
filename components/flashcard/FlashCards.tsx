import React, { useState } from 'react';
import { FlashCard } from './FlashCard';
import { Button } from '@/components';

interface FlashCardsProps {
  list: Array<{
    question: string;
    answer: string;
  }>;
  generateNewFlashCards: () => void;
}

export const FlashCards = (props: FlashCardsProps) => {
  const { list, generateNewFlashCards } = props;

  const [isAnswerRevealed, toggleIsAnswerRevealed] = useState(false);
  const [questionNo, setQuestionNo] = useState(0);

  const toggleNextQuestion = () => {
    setQuestionNo(questionNo + 1);
    toggleIsAnswerRevealed(false);
  };

  const togglePreviousCard = (isQuestionCard: boolean) => {
    if (isQuestionCard) setQuestionNo(questionNo - 1);
    toggleIsAnswerRevealed(!isAnswerRevealed);
  };

  return (
    <>
      {!isAnswerRevealed ? (
        <>
          {/* Question */}
          <FlashCard
            title={list[questionNo].question}
            subtitle={`Question ${questionNo + 1}/${list.length}`}
            leftButton={
              questionNo > 0 && (
                <Button
                  secondary={true}
                  onClick={() => togglePreviousCard(true)}
                >
                  Back
                </Button>
              )
            }
            rightButton={
              <Button onClick={() => toggleIsAnswerRevealed(true)}>
                Answer
              </Button>
            }
          />
        </>
      ) : (
        <>
          <FlashCard
            title={list[questionNo].answer}
            subtitle={`Answer ${questionNo + 1}/${list.length}`}
            leftButton={
              <Button
                secondary={true}
                onClick={() => togglePreviousCard(false)}
              >
                Back
              </Button>
            }
            rightButton={
              questionNo < list.length - 1 ? (
                <Button onClick={toggleNextQuestion}>Next</Button>
              ) : (
                <Button onClick={generateNewFlashCards}>
                  Generate New Flash Cards
                </Button>
              )
            }
          />
        </>
      )}
    </>
  );
};
