import React, { useState } from 'react';
import { FlashCardContent } from './FlashCardContent';

export const FlashCardLayout = () => {
    const [ansRevealed, toggleAnsReveal] = useState(false);
    const [questionNo, addQuestionNo] = useState(0);

    let list = [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque in dictum non.",
            answer: "Ac ut consequat semper viverra nam libero justo laoreet sit. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sapien et ligula ullamcorper malesuada proin libero nunc. Tincidunt dui ut ornare lectus sit."
        },
        {
            question: "Suspendisse potenti nullam ac tortor vitae purus faucibus ornare.",
            answer: "Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Lectus nulla at volutpat diam ut venenatis. Urna id volutpat lacus laoreet."
        }
    ]

    function nextQuestion() {
        addQuestionNo(questionNo + 1);
        toggleAnsReveal(false);
    }

    return (
        !ansRevealed
        ? <>
            <FlashCardContent title={ list[questionNo].question } paragraph='FlashCard lorum ipsum' />
            <button
                className='flex justify-end ml-auto mr-0 mt-2 bg-brand-red hover:bg-brand-pink text-white font-bold py-2 px-4 rounded'
                onClick={() => toggleAnsReveal(true)}
            >
                Answer
            </button>
        </>
        : <>
            <FlashCardContent title={ list[questionNo].answer } paragraph='FlashCard lorum ipsum' />
            {
                questionNo < list.length - 1
                ? <button
                    className='flex justify-end ml-auto mr-0 mt-2 bg-brand-red hover:bg-brand-pink text-white font-bold py-2 px-4 rounded'
                    onClick={nextQuestion}
                >
                    Next
                </button>
                : <></>
            }
        </>
    );
}
