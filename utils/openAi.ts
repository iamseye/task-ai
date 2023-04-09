import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const defaultSystemPrompt = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current date and time: {{ datetime }}
`.trim();

export const defaultModel = 'gpt-3.5-turbo';

const openai = new OpenAIApi(configuration);
