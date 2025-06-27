
import React, { useState } from 'react';
import { Decision } from '../types';

interface DecisionHistoryItemProps {
  item: Decision;
}

const DecisionHistoryItem: React.FC<DecisionHistoryItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-700/70 p-4 rounded-lg shadow-md mb-3 transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-md font-medium text-sky-400 truncate pr-2 flex-1">
            {item.query}
          </h4>
          <span className="text-xs text-slate-400 mr-2">
            {item.timestamp.toLocaleTimeString()}
          </span>
          <svg
            className={`w-5 h-5 text-slate-300 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-600">
          <p className="text-sm text-slate-300 mb-2 whitespace-pre-wrap">
            <strong className="text-sky-300">Your Query:</strong> {item.query}
          </p>
          <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
            <strong className="text-sky-300">AI's Advice:</strong> {item.response}
          </p>
        </div>
      )}
    </div>
  );
};

export default DecisionHistoryItem;
