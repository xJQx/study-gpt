import React, { useState } from 'react';
import { OriginalNotes } from './OriginalNotes';
import { SummarisedNotes } from './SummarisedNotes';
import { HeaderSubtitleCentered } from '@/components/HeaderSubtitleCentered';
import { FaMinus, FaPlus } from 'react-icons/fa';

export const SummariseLayout = () => {
  const [summarisedNotes, setSummarisedNotes] = useState('');
  const [isNotesInputOpened, toggleNotesInput] = useState(true);

  const summarize = async (notes: string) => {
    if (localStorage.getItem('apiKey') == null) {
      alert('Please add your API key in your profile');
    } else {
      await fetch('/api/notes/summary', {
        method: 'POST',
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          text: notes,
          title: 'title',
          apiKey: localStorage.getItem('apiKey')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async res => {
        const resultantResponse = await res.json();
        const { data } = resultantResponse;
        setSummarisedNotes(data);
        toggleNotesInput(false);
      });
    }
  };

  return (
    <>
      <div className="shadow bg-gray-100 p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg">
        <div className="mt-8">
          <HeaderSubtitleCentered
            title="Enter your content"
            subTitle="We will process the information and summarise everything for you"
          />
        </div>
        <div className="px-8 py-5 border-gray-300 border-t-2">
          <div className="flex">
            <h3 className="font-bold text-xl">Your original content</h3>
            <div
              onClick={() => toggleNotesInput(!isNotesInputOpened)}
              className="ml-auto hover:cursor-pointer hover:text-gray-500"
            >
              {isNotesInputOpened ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {isNotesInputOpened ? <OriginalNotes summarize={summarize} /> : <></>}
        </div>
        <div className="px-8 py-5 border-gray-300 border-t-2">
          <h3 className="font-bold text-xl">Summarised content</h3>
          <SummarisedNotes summarisedNotes={summarisedNotes} />
        </div>
      </div>
    </>
  );
};
