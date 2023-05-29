const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  // apiKey: "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"
  apiKey: process.env.OPEN_AI_API_KEY
});
const openai = new OpenAIApi(configuration);

let getGPTPrompt = async (notes: string): Promise<any> => {
  console.log(process.env.OPEN_AI_API_KEY)
  console.log('notes', notes);
  // let prompt = notes + "\n" + "Explain the concepts of the notes above, along with a summary of the concepts. Do generate a set of questions and answers of the notes above, between 10 and 20 questions."
  // const completion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt:notes
  // });
  // return completion.data.choices[0].text;
  const completion = await openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: notes
    })
    return completion.data.choices[0].text;

};

export default getGPTPrompt;
