const ENCOURAGE_FORMAT = 'Encouragement:';

const defaultQuestionTemplate = (task: string) =>
  `what are the first 3 small milestones to start ${task} with clear goals and measurable(number) and actionable targets and in the end write a short encouragement after text '${ENCOURAGE_FORMAT}'
  make sure to list every milestones with the formate: 'Milestone 1:', 'Milestone 2:', 'Milestone 3:'...etc and make sure to have concrete and measurable action to follow`;

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

interface getMilestonesAndEncouragement {
  milestones: string[];
  encouragement: string;
}

export const getMilestonesAndEncouragement = (
  text: string
): getMilestonesAndEncouragement => {
  const milestones = text
    .substring(
      text.indexOf('Milestone 1') + 'Milestone 1'.length + 1,
      text.indexOf(ENCOURAGE_FORMAT)
    )
    .split(new RegExp(`\nMilestone [0-9]: `));

  const encouragement = text.substring(
    text.indexOf(ENCOURAGE_FORMAT) + ENCOURAGE_FORMAT.length + 1
  );

  return {
    milestones,
    encouragement,
  };
};
