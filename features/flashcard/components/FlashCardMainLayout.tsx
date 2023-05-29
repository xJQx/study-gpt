import React, { useState } from 'react';
import { FlashCardLayout } from './flashcard';
import { Notes } from './Notes';
import { ModalAPIKeyPrompt } from '@/components/ModalAPIKeyPrompt';
import { useDisclosure } from '@chakra-ui/react';


export const FlashCardMainLayout = () => {
  const [isNotesView, toggleNotesView] = useState(true);
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const {
    isOpen: isAPIKeyModalOpen,
    onOpen: onAPIKeyModalOpen,
    onClose: onAPIKeyModalClose
  } = useDisclosure();

	function submitNotes(notes: string) {
		setNotes(notes);
		onAPIKeyModalOpen();
	}

  async function generateCards(apiKey: string) {
    // TODO: Send notes to api, receive response. If api did not return an error message, toggle to flash cards; otherwise
    // notify error to user
		console.log(apiKey, notes);
    const res = await fetch('/api/notes', {
			method: 'POST',
			body: JSON.stringify({
				userId: localStorage.getItem('userId'),
				text: notes,
				title: 'Generate questions',
				apiKey: apiKey
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const resJson = await res.json();
		console.log(resJson);
    setQuestions(resJson.data.questions);
    toggleNotesView(false);
  }

  function newTest() {
    setNotes('');
    toggleNotesView(true);
  }

  return (
    <div className="shadow p-10 bg-gray-100 mx-48 my-12 rounded-lg text-lg">
      {isNotesView ? (
        <Notes submitNotes={submitNotes} />
      ) : (
        <FlashCardLayout list={questions} newTest={newTest} />
      )}
			
			<ModalAPIKeyPrompt
				useDisclosure={{
					isOpen: isAPIKeyModalOpen,
					onClose: onAPIKeyModalClose
				}}
				submitKey={generateCards}
			/>
    </div>
  );
}
