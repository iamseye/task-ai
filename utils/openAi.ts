const defaultQuestionTemplate = (task: string) =>
  `what are the first 3 small milestones to start ${task} with clear goals and measurable targets and labelled with bullet points`;
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
