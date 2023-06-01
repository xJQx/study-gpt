import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';
import { OriginalNotes, SummarisedNotes } from '@/components/summariser';

export default function Summariser() {
  const [originalNotes, setOriginalNotes] = useState('');
  const [summarisedNotes, setSummarisedNotes] = useState('');

  const [isNotesInputOpened, toggleNotesInput] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const summarize = async (notes: string) => {
    if (localStorage.getItem('apiKey') === null) {
      toast.error('Please add your API key in your profile.');
      return;
    }

    setLoading(true);

    // API request
    await fetch('/api/summary', {
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
    })
      .then(async res => {
        const resultantResponse = await res.json();
        const { data } = resultantResponse;
        setSummarisedNotes(data);
        toggleNotesInput(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong. Please try again later.');
      });
  };

  return (
    <div className="shadow-lg bg-brand-neutral p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg transition hover:scale-105">
      {/* Header */}
      <div className="mt-8">
        <PageHeader
          title="Summariser"
          subTitle="We will process the information and summarise everything for you"
        />
      </div>

      {/* Original Content */}
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
        {isNotesInputOpened && (
          <OriginalNotes
            originalNotes={originalNotes}
            setOriginalNotes={setOriginalNotes}
            summarize={summarize}
          />
        )}
      </div>

      {/* Summarised Content */}
      <div className="px-8 py-5 border-gray-300 border-t-2">
        <h3 className="font-bold text-xl">Summarised content</h3>
        {loading ? (
          <>
            <Loader text={'Generating summary...'} />
          </>
        ) : (
          <>
            <SummarisedNotes summarisedNotes={summarisedNotes} />
          </>
        )}
      </div>
    </div>
  );
}
