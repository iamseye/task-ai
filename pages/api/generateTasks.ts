import { openAiRequest } from '@/utils/openAI';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { prompt } = req.query as {
    prompt?: string;
  };

  if (!prompt) {
    throw new Error('prompt is required');
  }

  const requestParameters = openAiRequest(prompt);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    body: JSON.stringify(requestParameters),
  });

  if (!response.ok) {
    const error = await response.json();

    console.error('OpenAI API Error:', error);

    return res.status(400).json(error);
  }

  const data = await response?.json();

  res.status(200).json(data.choices?.[0]?.message?.content ?? '');
}