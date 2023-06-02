import {
  ParsedEvent,
  ReconnectInterval,
  createParser
} from 'eventsource-parser';

export const parseStream = async (
  stream: ReadableStream<Uint8Array>,
  onParse: (_: ParsedEvent | ReconnectInterval) => void
) => {
  // https://web.dev/streams/#the-getreader-and-read-methods
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const parser = createParser(onParse);
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    parser.feed(chunkValue);
  }
};
