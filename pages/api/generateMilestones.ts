import { OpenAIStream } from '../../utils/openAI';

export const config = {
  runtime: 'edge',
};

export const handler = async (req: Request, res: Response) => {
  const { prompt } = (await req.json()) as {
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
    return new Response(`generatedMilestones Error: ${error}`, { status: 500 });
  }
};

export default handler;
