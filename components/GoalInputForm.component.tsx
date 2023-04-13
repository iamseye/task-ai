import React, { useState, SyntheticEvent } from 'react';
import { DotLoader } from './DotLoader.component';

interface GoalInputFormProps {
  isLoading: boolean;
  setInputGoal: (_: string) => void;
  onSubmitGenerate: (event: SyntheticEvent) => void;
}
const GoalInputForm = ({
  isLoading,
  setInputGoal,
  onSubmitGenerate,
}: GoalInputFormProps) => {
  return (
    <div className="mt-10 mb-10 items-center justify-center w-full">
      <form onSubmit={onSubmitGenerate}>
        <label
          htmlFor="input-todo"
          className="mb-2 text-lg font-medium text-gray-600 w-full"
        >
          Write down what you want to achieve and your specific situation
        </label>

        <div className="flex flex-col">
          <textarea
            id="input-todo"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="I never make videos before but I want to be a profitable Youtuber... I'm into the topic of travel, software development and food"
            onChange={(event) => setInputGoal(event.target.value.trim())}
          ></textarea>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
          >
            {isLoading ? <DotLoader /> : 'Generate milestones'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalInputForm;
