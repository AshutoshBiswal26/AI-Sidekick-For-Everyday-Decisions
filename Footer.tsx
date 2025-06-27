
import React from 'react';
import { APP_TITLE } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 mt-auto text-center text-slate-400 border-t border-slate-700">
      <p>&copy; {currentYear} {APP_TITLE}. Powered by AI.</p>
      <p className="text-xs mt-1">
        Disclaimer: AI responses are for informational purposes only and should not be considered professional advice.
      </p>
    </footer>
  );
};

export default Footer;
