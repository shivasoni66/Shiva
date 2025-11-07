

import React from 'react';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ToastType } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { InfoIcon } from './icons/InfoIcon';
import { XIcon } from './icons/XIcon';

interface ToastProps {
  toast: { message: string; type: ToastType } | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const { message, type } = toast;
  
  const icon = type === 'success' 
    ? <CheckCircleIcon className="h-6 w-6 text-emerald-500" /> 
    : <InfoIcon className="h-6 w-6 text-sky-500" />;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-toast-in">
        <div className="max-w-sm bg-white shadow-2xl rounded-lg flex items-center gap-4 p-4 border-l-4 border-emerald-400">
           {icon}
            <p className="text-sm font-medium text-slate-700 flex-1">{message}</p>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                <XIcon className="h-4 w-4" />
            </button>
        </div>
    </div>
  );
};

export default Toast;