// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { generateGPTStreamWithContext } from '@/openai/gptapi';
import { parseStream } from '@/openai/utils';
import { NextRequest, NextResponse } from 'next/server';
import { ParsedEvent, ReconnectInterval } from 'eventsource-parser';

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
    const { prompt, apiKey, messages } = await req.json();

    const stream = (
      await generateGPTStreamWithContext(
        prompt,
        apiKey,
        'You will give clear and easy to understand explanations',
        messages
      )
    ).body;

    if (!stream) {
      return NextResponse.json({ explanation: '' });
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

    return NextResponse.json({ explanation: result });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
