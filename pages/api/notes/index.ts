// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getGPTPrompt from '@/features/nlp/gptapi';

export default async function  handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // check the type of request
  const { method, body } = req;
//   try {
    if (method === 'POST') {
      const { text } = body;
      const promptResult = await getGPTPrompt(text);
    //   const promptResult = "LOL"
    //   return res.status(200).json({res:text})

      return res.status(200).json({
        promptResult
      });
    } else {
      return res.status(404).json({ message: 'Method not found' });
    }
//   } catch (e: any) {
//     console.log(e);
//     return res.status(500).json({ message: e.message });
//   }
}