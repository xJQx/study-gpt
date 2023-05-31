import React, { useState } from 'react';
import { HeaderSubtitleCentered } from '@/components/HeaderSubtitleCentered';
import { LoadingContainer } from '@/components/LoadingContainer';
export const ExplainLayout = () => {
  const [input, setInput] = useState('');
  const [sentInput, setSentInput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const explain = async () => {
    setSentInput(input);
    setInput('');
    setExplanation('');
    if (localStorage.getItem('apiKey') == null) {
      alert('Please add your API key in your profile');
    } else {
      setLoading(true);
      await fetch('/api/notes/explain', {
        method: 'POST',
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          text: input,
          title: 'Generate explanation',
          apiKey: localStorage.getItem('apiKey'),
          hasQuestion: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async res => {
          const resultantResponse = await res.json();
          const { data } = resultantResponse;
          setExplanation(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          alert('Something went wrong');
        });
    }
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
        {sentInput && <div className="bg-gray-200 px-24 py-4">{sentInput}</div>}
        {loading ? (
          <LoadingContainer text={'Generating explanation...'} />
        ) : (
          <>
            {' '}
            {explanation && (
              <div className="bg-white px-24 py-4">{explanation}</div>
            )}
          </>
        )}
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
