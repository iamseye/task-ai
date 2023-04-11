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
    return new Response('No prompt in the request', { status: 400 });
  }

  try {
    const requestParameters = openAiRequest(prompt.trim());

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      },
      body: JSON.stringify(requestParameters),
    });

    const data = await response?.json();
    res.status(200).json(data.choices?.[0]?.message?.content ?? '');
    console.log(JSON.stringify(data));

    if (!response.ok) {
      const error = await response.json();

      console.error('generatedMilestones Error:', error);

      return res.status(400).json(error);
    }
  } catch (error) {
    console.error('generatedMilestones Error:', error);
    res.status(500).json(error as any);
  }
}
