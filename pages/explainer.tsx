import React, { KeyboardEventHandler, useState } from 'react';
import { Loader, PageHeader } from '@/components';
import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { FaRobot } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { ChatGPTAgent } from '@/openai/OpenAIStream';

export default function Explainer() {
  const [newPrompt, setNewPrompt] = useState('');
  const [lastPrompt, setLastPrompt] = useState('');
  const [conversations, setConversations] = useState<
    Array<{ role: ChatGPTAgent; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth();

  const explain = async () => {
    if (localStorage.getItem('apiKey') === null) {
      toast.error('Please add your API key in your profile.');
      return;
    }

    setLastPrompt(newPrompt);
    setNewPrompt('');
    setIsLoading(true);

    // API request
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        body: JSON.stringify({
          prompt: newPrompt,
          apiKey: localStorage.getItem('apiKey'),
          messages: conversations
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      if (!data) {
        return;
      }
      const { explanation } = data;

      setConversations([
        ...conversations,
        { role: 'user', content: newPrompt },
        { role: 'system', content: explanation }
      ]);
      setLastPrompt('');
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnKeyUp: KeyboardEventHandler<HTMLInputElement> = (e: any) => {
    if (e.key === 'Enter') explain();
  };

  return (
    <>
      {/* Header */}
      <div className="text-lg">
        <div className="p-10"></div>
        <PageHeader
          title="Explainer"
          subTitle="We will give you a simple yet detailed explanation on whatever doubts you have"
        />
      </div>

      {/* Conversation */}
      <div className="">
        {/* User's Input Text */}
        {conversations.map((conversation, i) => {
          const { content, role } = conversation;
          return (
            <div key={i}>
              {role == 'user' ? (
                <>
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

        {lastPrompt && (
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
            <div>{lastPrompt}</div>
          </div>
        )}

        {/* Loader */}
        {isLoading && (
          <div className="bg-gray-100">
            <Loader text={'Generating explanation...'} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3 px-8 py-4 bg-brand-neutral shadow">
        <input
          value={newPrompt}
          onChange={e => setNewPrompt(e.target.value)}
          className="w-full shadow-inner border-2 rounded-lg px-4 py-3"
          id="notesInput"
          placeholder="Type your questions or notes..."
          required
          autoComplete="off"
          onKeyUp={handleOnKeyUp}
        />
        <button
          className={`flex self-center text-4xl px-[10px] rounded-full ${
            newPrompt.length > 0
              ? 'bg-brand-pink hover:bg-brand-red text-white'
              : ' bg-gray-300 text-gray-400'
          }`}
          onClick={explain}
          disabled={newPrompt.length == 0}
        >
          ↵
        </button>
      </div>
    </>
  );
}
