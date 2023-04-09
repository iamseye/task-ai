const defaultQuestionTemplate = (task: string) =>
  `breakdown the tasks of ${task} and clearly labeled "1." and "2."., at most breakdown to 5 items`;

export const openAiRequest = (prompt: string) => ({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: defaultQuestionTemplate(prompt) }],
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 200,
  stream: false,
  n: 1,
});
