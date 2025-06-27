
import React from 'react';
import { EXAMPLE_PROMPTS } from '../constants';

interface WelcomeMessageProps {
  onExampleClick: (prompt: string) => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onExampleClick }) => {
  return (
    <div className="my-8 p-6 bg-slate-800/80 rounded-xl shadow-xl text-center">
      <h2 className="text-2xl font-semibold mb-3 text-sky-300">Welcome to AI Sidekick!</h2>
      <p className="text-slate-300 mb-6">
        Need help making a decision? Type your query above, or try one of these examples:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {EXAMPLE_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(prompt)}
            className="bg-slate-700 hover:bg-slate-600/70 text-slate-200 text-sm p-3 rounded-lg transition-colors duration-200 text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;
