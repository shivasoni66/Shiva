import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    <p className="text-slate-600 font-medium">Loading ConnectEd Data...</p>
  </div>
);

export default Spinner;