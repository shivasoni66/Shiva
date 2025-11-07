

import React from 'react';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import { XIcon } from './icons/XIcon';
import { UniversityIcon } from './icons/UniversityIcon';

interface GiveBackModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: ShowToastFunction;
}

const GiveBackModal: React.FC<GiveBackModalProps> = ({ isOpen, onClose, showToast }) => {
  if (!isOpen) return null;

  const handleDonate = () => {
    showToast('Thank you for your contribution!', 'success');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-center p-8 relative animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:bg-slate-100 rounded-full p-2 transition-colors"
          aria-label="Close"
        >
          <XIcon />
        </button>
        
        <div className="mx-auto bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center">
            <UniversityIcon className="h-8 w-8 text-indigo-600"/>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mt-6">Support Our Institution</h2>
        <p className="text-slate-600 mt-2">
            Your generosity helps us provide scholarships, improve campus facilities, and support future generations of students. Every contribution, big or small, makes a significant impact.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
             <button 
                className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={onClose}
            >
                Maybe Later
            </button>
            <button 
                onClick={handleDonate}
                className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Donate Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default GiveBackModal;