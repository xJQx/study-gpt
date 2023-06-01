// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Configuration, OpenAIApi } = require('openai');

export enum GPT_MODE {
  'SUMMARISER',
  'EXPLAINER',
  'FLASH_CARD_GENERATOR'
}

interface GPTPromptResponse {
  isJson: boolean;
  data: string;
  success: boolean;
}

export const getGPTPrompt = async (
  userInput: string,
  apiKey: string,
  mode: GPT_MODE
): Promise<GPTPromptResponse> => {
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);

  let prompt = '';
  let isJson = false;

  switch (mode) {
    // for summary
    case GPT_MODE.SUMMARISER:
      prompt = userInput + `\n summarise the concepts of the notes above.`;
      isJson = false;
      break;

    // for explanation
    case GPT_MODE.EXPLAINER:
      prompt = userInput + `\n Answer the question above, with explanations.`;
      isJson = false;
      break;

    // for flash card generator
    case GPT_MODE.FLASH_CARD_GENERATOR:
      prompt =
        userInput +
        `\n With the content above, generate a set of questions and answers of the notes above, at least 5 questions. \n
        Put the generated output in the following JSON structure that is beautified, and the JSON must be valid: \n
        {
          "quiz": [
            {"question":"Question 1", "answer":"Answer 1"},
            {"question":"Question 2", "answer":"Answer 2"},
            ...
          ]
        }`;
      isJson = true;
      break;
    default:
      isJson = false;
      prompt = '';
  }

  if (prompt.length === 0) {
    return { isJson, data: '', success: false };
  }

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1024
  });

  return {
    isJson,
    data: completion.data.choices[0].text,
    success: true
  };
};

interface GPTChatPromptResponse extends GPTPromptResponse {
  chat: Array<{
    role: 'user' | 'system';
    content: string;
  }>;
}

export const getChatPrompt = async (
  userInput: string,
  apiKey: string,
  messages: Array<{
    role: 'user' | 'system';
    content: string;
  }>
): Promise<GPTChatPromptResponse> => {
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);

  const userMessages = messages;
  userMessages.push({ role: 'user', content: userInput });

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Please answer with explanations' },
      ...userMessages
    ]
  });

  return {
    isJson: false,
    data: completion.data.choices[0].message.content,
    chat: userMessages,
    success: true
  };
};
