

import React, { useState } from 'react';
import type { Alumni } from '../types';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import { XIcon } from './icons/XIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ProfileModalProps {
  alumni: Alumni;
  onClose: () => void;
  showToast: ShowToastFunction;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ alumni, onClose, showToast }) => {
  const [connectState, setConnectState] = useState<'idle' | 'pending' | 'sent'>('idle');

  const handleConnect = () => {
    if (connectState !== 'idle') return;
    setConnectState('pending');
    setTimeout(() => {
        setConnectState('sent');
        showToast(`Connection request sent to ${alumni.name}!`, 'success');
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:bg-slate-100 rounded-full p-2 transition-colors"
          aria-label="Close profile"
        >
          <XIcon />
        </button>
        
        <div className="overflow-y-auto">
            {/* Header */}
            <div className="p-8 pb-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                    <img src={alumni.profilePictureUrl} alt={alumni.name} className="w-28 h-28 rounded-full object-cover shadow-md flex-shrink-0" />
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">{alumni.name}</h2>
                        <p className="text-lg text-indigo-600 font-semibold mt-1">{alumni.jobTitle}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-slate-500 text-sm mt-2">
                             <span className="flex items-center gap-1.5"><BriefcaseIcon className="h-4 w-4" />{alumni.company}</span>
                             <span className="flex items-center gap-1.5"><MapPinIcon className="h-4 w-4" />{alumni.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">About</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{alumni.bio}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-slate-700 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {alumni.skills.map(skill => (
                                <span key={skill} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">Education</h4>
                        <div className="flex items-start gap-3">
                            <GraduationCapIcon className="h-5 w-5 text-slate-400 mt-0.5"/>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{alumni.major}</p>
                                <p className="text-xs text-slate-500">Graduated {alumni.graduationYear}</p>
                            </div>
                        </div>
                    </div>
                    {alumni.willingToMentor && (
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2">Mentorship</h4>
                            <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                                <HandshakeIcon className="h-5 w-5 text-green-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-green-800">Available to Mentor</p>
                                    <p className="text-xs text-green-700">Ready to help and guide.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        <div className="flex-shrink-0 p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-2xl">
            <button 
                className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={onClose}
            >
                Close
            </button>
            <button 
                className={`font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    connectState === 'idle' ? 'bg-indigo-600 text-white hover:bg-indigo-700' :
                    connectState === 'pending' ? 'bg-indigo-400 text-white cursor-wait' :
                    'bg-emerald-500 text-white cursor-not-allowed'
                }`}
                onClick={handleConnect}
                disabled={connectState !== 'idle'}
            >
                {connectState === 'idle' && 'Connect'}
                {connectState === 'pending' && 'Sending...'}
                {connectState === 'sent' && <><CheckCircleIcon className="h-5 w-5"/> Request Sent</>}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;