
import React, { useState } from 'react';

interface DecisionInputProps {
  onQuerySubmit: (query: string) => void;
  isLoading: boolean;
}

const DecisionInput: React.FC<DecisionInputProps> = ({ onQuerySubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onQuerySubmit(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
      <label htmlFor="decisionQuery" className="block text-xl font-semibold mb-3 text-sky-300">
        What decision is on your mind?
      </label>
      <textarea
        id="decisionQuery"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="e.g., Should I learn a new programming language this year?"
        rows={4}
        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-slate-100 placeholder-slate-400 resize-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="mt-4 w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {isLoading ? 'Getting Advice...' : 'Get Advice'}
      </button>
    </form>
  );
};

export default DecisionInput;
