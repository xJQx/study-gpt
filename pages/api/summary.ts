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
        'Summarise the key concepts of the following notes =\n' + prompt,
        apiKey
      )
    ).body;

    if (!stream) {
      return NextResponse.json({ summary: '' });
    }

    let summary = '';

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === 'event') {
        const data = event.data;
        try {
          summary += JSON.parse(data).text ?? '';
        } catch (e) {
          console.error(e);
        }
      }
    };

    await parseStream(stream, onParse);

    return NextResponse.json({ summary: summary });
  } else {
    return res.status(404).json({ message: 'Method not found' });
  }
}
