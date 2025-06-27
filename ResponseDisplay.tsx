
import React from 'react';
// Using a simple div to render text which might contain markdown.
// For full markdown rendering, a library like 'marked' or 'react-markdown' would be used.
// For simplicity, we'll render as pre-formatted text.

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  // Basic markdown-like formatting for newlines
  const formattedResponse = response.split('\\n').map((line, index, arr) => (
    <React.Fragment key={index}>
      {line}
      {index < arr.length - 1 && <br />}
    </React.Fragment>
  ));


  return (
    <div className="my-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold mb-4 text-sky-300">AI Sidekick's Advice:</h3>
      <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap leading-relaxed">
        {/*
          For actual markdown rendering, you would use a library:
          import { marked } from 'marked';
          <div dangerouslySetInnerHTML={{ __html: marked(response) }} />
          However, to avoid adding external libraries beyond specified and for safety,
          we'll display it as text, respecting newlines.
          The prompt to Gemini requests markdown, so this might not look perfect without a parser.
          Using whitespace-pre-wrap will respect newlines and spaces.
        */}
        {response}
      </div>
    </div>
  );
};

export default ResponseDisplay;
