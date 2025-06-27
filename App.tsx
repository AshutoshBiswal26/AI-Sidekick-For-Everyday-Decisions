
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DecisionInput from './components/DecisionInput';
import ResponseDisplay from './components/ResponseDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import DecisionHistory from './components/DecisionHistory';
import WelcomeMessage from './components/WelcomeMessage';
import Footer from './components/Footer';
import { getDecisionAdvice } from './services/geminiService';
import { Decision } from './types';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(''); // For DecisionInput's internal state, or passed down
  const [currentQuery, setCurrentQuery] = useState<string>(''); // The query being processed
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<Decision[]>([]);

  const handleQuerySubmit = useCallback(async (query: string) => {
    setCurrentQuery(query);
    setIsLoading(true);
    setAiResponse(null);
    setError(null);

    try {
      const advice = await getDecisionAdvice(query);
      setAiResponse(advice);
      const newDecision: Decision = {
        id: Date.now().toString(), // Simple ID generation
        query: query,
        response: advice,
        timestamp: new Date(),
      };
      setDecisionHistory(prevHistory => [newDecision, ...prevHistory]); // Add to beginning for newest first
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleExamplePromptClick = (prompt: string) => {
    // This function can set the input field's value directly if DecisionInput exposes a way,
    // or trigger a submit. For simplicity, we'll trigger a direct submit.
    // If DecisionInput controlled its own state, we'd need a ref or callback to set its value.
    // For now, assume DecisionInput takes value and onChange. Let's adjust DecisionInput or App.
    // Simpler: Just submit. User can see the prompt in history.
    setUserInput(prompt); // Update a shared state for the input field value
    handleQuerySubmit(prompt); // Then submit it
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full max-w-3xl">
        <DecisionInput
          onQuerySubmit={handleQuerySubmit}
          isLoading={isLoading}
          // key={userInput} // To re-initialize input if needed, but not necessary here
        />
        
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {aiResponse && !isLoading && !error && (
          <ResponseDisplay response={aiResponse} />
        )}

        {!isLoading && !aiResponse && !error && (
           <WelcomeMessage onExampleClick={handleExamplePromptClick} />
        )}
        
        <DecisionHistory history={decisionHistory} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
