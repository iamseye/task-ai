import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const ENCOURAGE_FORMAT = 'Encouragement:';
const DEFAULT_MILESTONES_NUM = 3;

interface getMilestonesAndEncouragement {
  milestones: { title: string; description: string }[];
  encouragement: string;
}

interface ChatGPTMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

const defaultQuestionTemplate = (task: string) =>
  `Give me the first ${DEFAULT_MILESTONES_NUM} milestones that I should follow to achieve the goal of ${task} with clear and measurable (frequency of the action) goals  as a short description and in the end write a short encouragement after text '${ENCOURAGE_FORMAT}'
Please return this response as a numbered list with the action title, followed by a colon, and then a brief description of the action. There should be a line of whitespace between each milestone in the list.`;

const getOpenAIStreamPayload = (prompt: string): OpenAIStreamPayload => ({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: defaultQuestionTemplate(prompt) }],
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 200,
  stream: true,
  n: 1,
});

export const getMilestonesAndEncouragement = (
  text: string
): getMilestonesAndEncouragement => {
  return {
    milestones: [],
    encouragement: '',
  };
};

export const OpenAIStream = async (prompt: string) => {
  console.log(prompt);
  const payload = getOpenAIStreamPayload(prompt);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  console.log(prompt);
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  console.log(res);
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || '';
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            console.log(text);
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
