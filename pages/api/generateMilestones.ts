import { OpenAIStream } from '@/utils/openAI';
import { response } from 'express';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { prompt } = req.body as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  try {
    const stream = await OpenAIStream(prompt.trim());

    return new Response(stream);
  } catch (error) {
    console.error('generatedMilestones Error:', error);
    res.status(500).json(error as any);
  }
}
