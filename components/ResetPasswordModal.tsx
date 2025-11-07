import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';


interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: ShowToastFunction;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, showToast }) => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    
    if (!isOpen) return null;

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log(`Password reset requested for ${email}`);
            setIsSent(true);
            showToast(`If an account exists for ${email}, a reset link has been sent.`, 'success');
        }
    };
    
    const handleClose = () => {
        onClose();
        // Reset state after modal closes
        setTimeout(() => {
            setEmail('');
            setIsSent(false);
        }, 300);
    }
    
    return (
         <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={handleClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-center p-8 relative animate-fade-in-up"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 right-4 text-slate-500 hover:bg-slate-100 rounded-full p-2 transition-colors"
                    aria-label="Close"
                >
                    <XIcon />
                </button>
                
                <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>

                {isSent ? (
                    <div className="mt-4">
                        <p className="text-slate-600">Please check your email for instructions on how to reset your password. You can now close this window.</p>
                        <button 
                            onClick={handleClose}
                            className="w-full mt-6 bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-600 mt-2">Enter your email address and we'll send you a link to reset your password.</p>
                        <form onSubmit={handleReset} className="mt-6 text-left">
                            <label htmlFor="reset-email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                id="reset-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="you@example.com"
                            />
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button 
                                    type="button"
                                    className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordModal;