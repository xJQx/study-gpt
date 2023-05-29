import React, { useState } from 'react';
import { OriginalNotes } from './OriginalNotes';
import { SummarisedNotes } from './SummarisedNotes';
import { HeaderSubtitleCentered } from '@/components/HeaderSubtitleCentered'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const SummariseLayout = () => {
    const [notes, setNotes] = useState('');
    const [summarisedNotes, setSummarisedNotes] = useState('');
    const [isNotesInputOpened, toggleNotesInput] = useState(true);

    function summarize(notes: string) {
        setNotes(notes);
        // TODO: Send notes to api, receive response. If api did not return an error message, toggle to flash cards; otherwise 
        // notify error to user
        setSummarisedNotes("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque in dictum non?");
        toggleNotesInput(false);
    }

    return (
        <>
            <div className='shadow bg-gray-100 mx-48 my-12 rounded-lg text-lg'>
                <div className='p-10'></div>
                <HeaderSubtitleCentered title='Enter your content' subTitle='We will process the information and summarise everything for you' />
                <div className='px-10 py-5 border-gray-300 border-t-2'>
                    <div className='flex'>
                        <h3 className='font-bold text-xl'>Your original content</h3>
                        <div onClick={() => toggleNotesInput(!isNotesInputOpened)} className='ml-auto hover:cursor-pointer hover:text-gray-500'>
                            {
                                isNotesInputOpened
                                ? <FaMinus />
                                : <FaPlus />
                            }
                            
                        </div>
                    </div>
                    {
                        isNotesInputOpened
                        ? <OriginalNotes summarize={summarize} />
                        : <></>
                    }
                </div>
                <div className='px-10 py-5 border-gray-300 border-t-2'>
                    <h3 className='font-bold text-xl'>Summarised content</h3>
                    <SummarisedNotes summarisedNotes={summarisedNotes} />
                </div>
            </div>
        </>
    );
}