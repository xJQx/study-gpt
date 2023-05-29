import React, { useState } from 'react';
import { FlashCardContent } from './components/FlashCardContent';

export const FlashCardLayout = () => {
    const [ansRevealed, toggleAnsReveal] = useState(false);
    const [questionNo, addQuestionNo] = useState(0);

    let list = [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque in dictum non.",
            ans: "Ac ut consequat semper viverra nam libero justo laoreet sit. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sapien et ligula ullamcorper malesuada proin libero nunc. Tincidunt dui ut ornare lectus sit."
        },
        {
            question: "Suspendisse potenti nullam ac tortor vitae purus faucibus ornare.",
            ans: "Magna fringilla urna porttitor rhoncus dolor purus non enim praesent. Lectus nulla at volutpat diam ut venenatis. Urna id volutpat lacus laoreet."
        }
    ]

    function nextQuestion() {
        addQuestionNo(questionNo + 1);
        toggleAnsReveal(false);
    }

    return (
        <div className='shadow p-10 bg-gray-100 mx-48 my-12 rounded-lg text-lg'>
            { !ansRevealed
                ? <>
                    <FlashCardContent title={ list[questionNo].question } paragraph='FlashCard lorum ipsum' />
                    <button
                        className='flex justify-end ml-auto mr-0 mt-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded'
                        onClick={() => toggleAnsReveal(true)}
                    >
                        Answer
                    </button>
                </>
                : <>
                    <FlashCardContent title={ list[questionNo].ans } paragraph='FlashCard lorum ipsum' />
                    {
                        questionNo < list.length - 1
                        ? <button
                            className='flex justify-end ml-auto mr-0 mt-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded'
                            onClick={nextQuestion}
                        >
                            Next
                        </button>
                        : <></>
                    }
                </>
            } 
        </div>
    );
}
