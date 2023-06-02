import { OpenAIStream, OpenAIStreamPayload } from './OpenAIStream';

export const generateGPTStream = async (
  prompt: string,
  apiKey: string
): Promise<Response> => {
  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1024,
    stream: true
  };

  const stream = await OpenAIStream(payload, apiKey);

  return new Response(stream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      // 'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    })
  });
};

export const generateGPTStreamWithContext = async (
  newPrompt: string,
  apiKey: string,
  systemPrompt: string,
  messages: Array<{
    role: 'user' | 'system';
    content: string;
  }>
): Promise<Response> => {
  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
      { role: 'user', content: newPrompt }
    ],
    max_tokens: 1024,
    stream: true
  };

  const stream = await OpenAIStream(payload, apiKey);

  return new Response(stream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      // 'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    })
  });
};
