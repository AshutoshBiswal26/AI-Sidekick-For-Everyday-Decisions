
import React from 'react';
import { Decision } from '../types';
import DecisionHistoryItem from './DecisionHistoryItem';

interface DecisionHistoryProps {
  history: Decision[];
}

const DecisionHistory: React.FC<DecisionHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="my-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold mb-4 text-sky-300">Decision Log</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
        {history.slice().reverse().map((item) => ( // Show newest first
          <DecisionHistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DecisionHistory;
