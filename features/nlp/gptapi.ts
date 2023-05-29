const { Configuration, OpenAIApi } = require('openai');

let getGPTPrompt = async (notes: string, apiKey: string): Promise<any> => {
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);
  let prompt =
    notes +
    '\n' +
    `Explain the concepts of the notes above, along with a summary of the concepts. 
  Do generate a set of questions and answers of the notes above, at least 5 questions.  
  Put the generated output in the following JSON structure:
  {
    "notes": "..",
    "summary": "..",
    "quiz":[
      {"question":"..", "answer":".."},..
    ] 
  }
  `;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1024
  });
  console.log(completion.data)
  return completion.data.choices[0].text;
};

export default getGPTPrompt;
