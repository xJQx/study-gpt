// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import getGPTPrompt from '@/features/nlp/gptapi';
import { db } from '../../../common/config/FirebaseService';
import { ref, push } from 'firebase/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  // check the type of request
  const { method } = req;
  if (method === 'POST') {
    // const { text, APIkey } = body;
    //   const promptResult = await getGPTPrompt(text,APIkey);
    const promptResult = {
      summary: 'Send me your recommendations will ya?',
      quiz: [
        { question: 'What is 1+1?', answer: '2' },
        { question: 'What is 1+3?', answer: '4' }
      ]
    };

    // add summary into firebase realtime database
    const putSummary = async (summary: string) => {
      await push(ref(db, 'topic/'), {
        userId: 'testing',
        summary
      }).then(async res => {
        await putQuestions(promptResult.quiz, res.key);
      });
    };

    // add questions into firebase realtime database
    const putQuestions = async (
      questions: Array<object>,
      topicId: string | null
    ) => {
      if (topicId) {
        await push(ref(db, 'questions/'), {
          topicId,
          questions
        });
      }
    };

    await putSummary(promptResult.summary)
      .then(() => {
        return res.status(200).json({
          data: {
            message: 'Successfully created',
            summary: promptResult.summary,
            quiz: promptResult.quiz
          }
        });
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({
          message: 'Something went wrong'
        });
      });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
