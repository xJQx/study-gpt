// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getGPTPrompt from '@/features/nlp/gptapi';

export default async function  handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // check the type of request
  const { method, body } = req;
    if (method === 'POST') {
      const { text,APIkey } = body;
    //   const promptResult = await getGPTPrompt(text,APIkey);    

      return res.status(200).json({
        data:{
            summary:"",
            quiz:[
                {question:"What is 1+1?",answer:"2"},
            ]
        }
      });
    } else {
      return res.status(404).json({ message: 'Method not found' });
    }
}
