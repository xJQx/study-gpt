// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatPrompt } from '@/gpt/gptapi';
import { ref, push } from 'firebase/database';
import { db } from '@/firebase/firebaseService';

export const config = {
  runtime: 'edge'
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { method, body } = req;

  // Post Request
  if (method === 'POST') {
    let resultantContent: any;
    const { messages, text, apiKey, title, userId } = body;

    const promptResult = await getChatPrompt(text, apiKey, messages);
    const { data, isJson, success, chat } = promptResult;

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

    await push(ref(db, 'explain/'), {
      userId,
      title,
      content: resultantContent
    }).then(() => {
      return res.status(200).json({
        data: resultantContent,
        chat
      });
    });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
