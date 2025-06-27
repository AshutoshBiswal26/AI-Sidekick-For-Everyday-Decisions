
import React from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-md shadow-lg p-6 text-center sticky top-0 z-50">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-sky-400">
          <span role="img" aria-label="light bulb" className="mr-2">💡</span>
          {APP_TITLE}
        </h1>
        <p className="text-slate-300 text-lg mt-1">{APP_SUBTITLE}</p>
      </div>
    </header>
  );
};

export default Header;
