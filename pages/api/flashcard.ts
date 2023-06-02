// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { generateGPTStream } from '@/openai/gptapi';
import { NextRequest, NextResponse } from 'next/server';
import { ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { parseStream } from '@/openai/utils';

export const config = {
  runtime: 'edge'
};

export default async function handler(
  req: NextRequest,
  res: NextApiResponse<object>
) {
  const { method } = req;

  // Post Request
  if (method === 'POST') {
    const { prompt, apiKey } = await req.json();

    const stream = (
      await generateGPTStream(
        `Generate at 1 set of at least 5 questions and answers for the given content, in the following specified JSON format =
    {
      "quiz": [
        {"question":"Question 1", "answer":"Answer 1"},
        {"question":"Question 2", "answer":"Answer 2"}
      ]
    }\n\nContent=\n` + prompt,
        apiKey
      )
    ).body;

    if (!stream) {
      return NextResponse.json({ flashCardList: [] });
    }

    let result = '';

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === 'event') {
        const data = event.data;
        try {
          result += JSON.parse(data).text ?? '';
        } catch (e) {
          console.error(e);
        }
      }
    };

    await parseStream(stream, onParse);

    if (!result.startsWith('{')) result = '{' + result; // gpt not returning the starting '{'
    const flashCardList = JSON.parse(result).quiz;

    return NextResponse.json({
      flashCardList: flashCardList
    });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
