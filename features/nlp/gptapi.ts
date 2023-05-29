const { Configuration, OpenAIApi } = require('openai');


let getGPTPrompt = async (notes: string,apiKey: string): Promise<any> => {
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);
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
