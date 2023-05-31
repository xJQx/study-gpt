const { Configuration, OpenAIApi } = require('openai');

let getGPTPrompt = async (
  userInput: string,
  apiKey: string,
  mode: number
): Promise<any> => {
  const modes = ['summary', 'explanation', 'quiz'];
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);
  let prompt = '';
  let isJson = false;
  switch (mode) {
    // for summary
    case 0:
      prompt = userInput + `\n summarise the concepts of the notes above.`;
      isJson = false;
      break;

    // for explanation
    case 1:
      prompt = userInput + `\n Answer the question above, with explanations.`;
      isJson = false;
      break;

    // for quiz
    case 2:
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
}
             `;
      isJson = true;
      break;
    default:
      isJson = false;
      prompt = '';
  }
  if (prompt.length == 0) {
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

export default getGPTPrompt;
