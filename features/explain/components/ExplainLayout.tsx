import React, { KeyboardEventHandler, useState, useEffect } from 'react';
import { HeaderSubtitleCentered } from '@/components/HeaderSubtitleCentered';
import { Loader } from '@/components/Loader';
import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { FaRobot } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export const ExplainLayout = () => {
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [sentInput, setSentInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const auth = getAuth();

  const explain = async () => {
    setSentInput(input);
    setInput('');
    if (localStorage.getItem('apiKey') == null) {
      toast.error('Please add your API key in your profile.');
    } else {
      setLoading(true);
      fetch('/api/notes/explain', {
        method: 'POST',
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          messages: conversations,
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
          const { data, chat } = resultantResponse;
          setLoading(false);
          let chats = chat;
          chats.push({ role: 'system', content: data });
          setConversations(chats);
          setSentInput('');
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
          toast.error('Something went wrong. Please try again later.');
        });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnKeyUp: KeyboardEventHandler<HTMLInputElement> = (e: any) => {
    if (e.key === 'Enter') explain();
  };

  return (
    <>
      <div className="text-lg">
        <div className="p-10"></div>
        <HeaderSubtitleCentered
          title="Explainer"
          subTitle="We will give you a simple yet detailed explanation on whatever doubts you have"
        />
      </div>
      <div className="">
        {/* User's Input Text */}
        {conversations.map((conversation, i) => {
          const { content, role } = conversation;
          return (
            <div key={i}>
              {role == 'user' ? (
                <>
                  {' '}
                  {/* User sent question */}
                  <div className="bg-brand-neutral px-24 py-4 flex flex-row items-center">
                    {/* Profile Pic */}
                    <div className="self-start relative min-w-[36px] min-h-[36px] mr-4">
                      <Image
                        src={
                          auth.currentUser?.photoURL
                            ? auth.currentUser.photoURL
                            : '/misc/default-profile.jpg'
                        }
                        alt="profile picture"
                        fill={true}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>{content}</div>
                  </div>
                </>
              ) : (
                <>
                  {' '}
                  {/* ChatGPT's Response Text */}
                  <div className="bg-gray-100 px-24 py-4 flex flex-row items-center">
                    <FaRobot className="self-start mr-4 min-w-[32px] min-h-[32px]" />
                    {content}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {sentInput && (
          <div className="bg-brand-neutral px-24 py-4 flex flex-row items-center">
            <div className="self-start relative min-w-[36px] min-h-[36px] mr-4">
              <Image
                src={
                  auth.currentUser?.photoURL
                    ? auth.currentUser.photoURL
                    : '/misc/default-profile.jpg'
                }
                alt="profile picture"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
            <div>{sentInput}</div>
          </div>
        )}

        {/* Loader */}
        {loading && (
          <div className="bg-gray-100">
            <Loader text={'Generating explanation...'} />
          </div>
        )}
      </div>

      <div className="flex gap-3 px-8 py-4 bg-brand-neutral shadow">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full shadow-inner border-2 rounded-lg px-4 py-3"
          id="notesInput"
          placeholder="Type your questions or notes..."
          required
          autoComplete="off"
          onKeyUp={handleOnKeyUp}
        />
        <button
          className={`flex self-center text-4xl px-[10px] rounded-full ${
            input.length > 0
              ? 'bg-brand-pink hover:bg-brand-red text-white'
              : ' bg-gray-300 text-gray-400'
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
