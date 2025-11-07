
import React from 'react';
import type { Alumni } from '../types';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';

interface AlumniCardProps {
  alumni: Alumni;
  simple?: boolean;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni, simple = false }) => {
    if (simple) {
        return (
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
                <img className="h-12 w-12 rounded-full object-cover" src={alumni.profilePictureUrl} alt={alumni.name} />
                <div>
                    <h3 className="font-bold text-slate-800">{alumni.name}</h3>
                    <p className="text-sm text-slate-500">{alumni.jobTitle}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col text-center overflow-hidden">
            <div className="p-6">
                <img
                    className="w-24 h-24 mx-auto rounded-full object-cover ring-4 ring-slate-100"
                    src={alumni.profilePictureUrl}
                    alt={alumni.name}
                />
                <h3 className="mt-4 text-lg font-bold text-slate-800">{alumni.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{alumni.jobTitle}</p>
                <p className="text-xs text-slate-500 mt-1">{alumni.company}</p>
            </div>
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-sm text-slate-600 space-y-2 text-left">
                <p className="flex items-center gap-2">
                    <GraduationCapIcon className="h-4 w-4 text-slate-400" />
                    <span>Class of {alumni.graduationYear}, {alumni.major}</span>
                </p>
            </div>
        </div>
    );
};

export default AlumniCard;