// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getGPTPrompt } from '@/features/nlp/gptapi';
import { db } from '../../../config/FirebaseService';
import { ref, push } from 'firebase/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  // check the type of request
  const { method, body } = req;
  if (method === 'POST') {
    let resultantContent: any;
    const { text, apiKey, title, userId } = body;

    const promptResult = await getGPTPrompt(text, apiKey, 2);
    const { data, isJson, success } = promptResult;
    // result has:
    // data
    // isJson
    // success
    if (!success) {
      return res.status(500).json({
        message: 'Something went wrong'
      });
    }
    if (isJson) {
      resultantContent = JSON.parse(data);
    } else {
      resultantContent = data;
    }
    await push(ref(db, 'quiz/'), {
      userId,
      title,
      quiz: resultantContent.quiz
    }).then(() => {
      return res.status(200).json({
        data: resultantContent
      });
    });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
