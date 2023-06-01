// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GPT_MODE, getGPTPrompt } from '@/gpt/gptapi';
import { ref, push } from 'firebase/database';
import { db } from '@/firebase/firebaseService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  const { method, body } = req;

  // Post Request
  if (method === 'POST') {
    let resultantContent: any;
    const { text, apiKey, title, userId } = body;

    const promptResult = await getGPTPrompt(text, apiKey, GPT_MODE.SUMMARISER);
    const { data, isJson, success } = promptResult;

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
    await push(ref(db, 'summary/'), {
      userId,
      title,
      summary: resultantContent
    }).then(() => {
      return res.status(200).json({
        data: resultantContent
      });
    });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
