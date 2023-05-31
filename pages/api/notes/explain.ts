// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getGPTPrompt from '@/features/nlp/gptapi';
import { db } from '../../../config/FirebaseService';
import { ref, push, set } from 'firebase/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  // check the type of request
  const { method, body } = req;
  if (method === 'POST') {
    let resultantContent;
    const { text, apiKey, title, userId } = body;

    const promptResult = await getGPTPrompt(text, apiKey, 1);
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
    return res.status(200).json({
      data: resultantContent
    });

    // add summary into firebase realtime database
    // const putTopic = async () => {
    //   await push(ref(db, 'topic/'), {
    //     userId,
    //     title,
    //     summary,
    //     notes
    //   }).then(async res => {
    //     await putQuestions(res.key);
    //   });
    // };

    // add questions into firebase realtime database
    // const putQuestions = async (topicId: string | null) => {
    //   if (topicId) {
    //     await set(ref(db, 'questions/' + topicId), {
    //       quiz
    //     });
    //   }
    // };

    // await putTopic()
    //   .then(() => {
    //     return res.status(200).json({
    //       data: {
    //         title,
    //         message: 'Successfully created',
    //         summary,
    //         quiz,
    //         notes
    //       }
    //     });
    //   })
    //   .catch((err: Error) => {
    //     console.log(err);
    //     return res.status(500).json({
    //       message: 'Something went wrong'
    //     });
    //   });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
