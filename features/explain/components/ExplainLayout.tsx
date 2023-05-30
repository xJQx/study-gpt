import React, { useState } from 'react';
import { HeaderSubtitleCentered } from '@/components/HeaderSubtitleCentered';

export const ExplainLayout = () => {
  const [input, setInput] = useState('');
  const [sentInput, setSentInput] = useState('');
  const [explanation, setExplanation] = useState('');

  const explain = async () => {
    setSentInput(input);
    setInput('');
    setExplanation('');
    // TODO: Send notes to api, receive response. If api did not return an error message, toggle to flash cards; otherwise
    // notify error to user
    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        text: sentInput,
        title: 'Generate explanation',
        apiKey: localStorage.getItem('apiKey'),
        hasQuestion: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      const resultantResponse = await res.json();
      console.log('resultantResponse', resultantResponse);
      const { notes } = resultantResponse.data;
      console.log('notes', notes);
      setExplanation(notes);
    });
  };

  return (
    <>
      <div className="text-lg">
        <div className="p-10"></div>
        <HeaderSubtitleCentered
          title="Explanation"
          subTitle="We will give you a simple yet detailed explanation on whatever doubts you have"
        />
      </div>
      <div className="">
        <div className="bg-gray-200 px-24 py-4">{sentInput}</div>
        <div className="bg-white px-24 py-4">{explanation}</div>
      </div>

      <div className="flex gap-3 px-8 py-4 bg-gray-300 shadow">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full shadow-inner border-2 rounded-lg px-4 py-3"
          id="notesInput"
          placeholder="Type your questions..."
          required
          autoComplete="off"
        />
        <button
          className={`flex justify-end ml-auto mr-0 text-4xl align-middle pt-1 px-4 rounded-full ${
            input.length > 0
              ? 'bg-brand-pink hover:bg-brand-red text-white'
              : ' bg-gray-200 text-gray-300 border-2'
          }`}
          onClick={explain}
          disabled={input.length == 0}
        >
          ↵
        </button>
      </div>
    </>
  );
};
