import React, { useState, SyntheticEvent } from 'react';

interface TaskGeneratorProps {
  setInputTodo: (_: string) => void;
  onSubmitGenerate: (event: SyntheticEvent) => void;
}
const TaskGenerator = ({
  setInputTodo,
  onSubmitGenerate,
}: TaskGeneratorProps) => {
  return (
    <div className="mt-10 items-center justify-center w-full">
      <form onSubmit={onSubmitGenerate}>
        <label
          htmlFor="input-todo"
          className="mb-2 text-sm font-medium text-gray-900 w-full"
        >
          Input what you want to get done today
        </label>

        <div className="flex justify-between">
          <input
            type="text"
            id="input-todo"
            className="p-2.5 w-full mr-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={(event) => setInputTodo(event.target.value.trim())}
          ></input>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Generate tasks
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskGenerator;
