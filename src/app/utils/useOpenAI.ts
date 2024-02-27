import { OpenAI } from 'openai';

export function usedOpenAI(key: string) {
  const apiKey = process.env.OPENAI_API_KEY || key;
  return new OpenAI({
    apiKey,
  });
}
