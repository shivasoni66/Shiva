

import React from 'react';
import type { Job } from '../types';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import { XIcon } from './icons/XIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  showToast: ShowToastFunction;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, showToast }) => {

  const handleApply = () => {
    showToast(`Your application for ${job.title} has been submitted!`, 'success');
    onClose();
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
          aria-label="Close job details"
        >
          <XIcon />
        </button>
        
        {/* Header */}
        <div className="p-8 pb-6 border-b border-slate-200">
            <span className={`text-xs font-semibold px-2.5 py-1 mb-3 inline-block rounded-full ${
                job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                job.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                job.type === 'Contract' ? 'bg-yellow-100 text-yellow-800' :
                'bg-slate-100 text-slate-800'
            }`}>{job.type}</span>
            <h2 className="text-3xl font-bold text-slate-800">{job.title}</h2>
            <p className="text-lg text-indigo-600 font-semibold mt-1">{job.company}</p>
            <div className="flex items-center gap-4 text-slate-500 text-sm mt-2">
                    <span className="flex items-center gap-1.5"><MapPinIcon className="h-4 w-4" />{job.location}</span>
            </div>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-1">
            <h4 className="font-bold text-slate-700 mb-2">Job Description</h4>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>
        
        <div className="flex-shrink-0 p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center rounded-b-2xl">
            <div className="text-xs text-slate-500">
                <p>Posted by: <span className="font-medium text-slate-700">{job.postedBy}</span></p>
                <p>On: {new Date(job.postedDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3">
                <button 
                    className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
                <button 
                    onClick={handleApply}
                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Apply Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;