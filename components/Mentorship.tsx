

import React, { useState, useMemo } from 'react';
import type { Alumni } from '../types';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import AlumniCard from './AlumniCard';
import ProfileModal from './ProfileModal';
import { SearchIcon } from './icons/SearchIcon';

interface MentorshipProps {
  alumni: Alumni[];
  showToast: ShowToastFunction;
}

const Mentorship: React.FC<MentorshipProps> = ({ alumni, showToast }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

    const mentors = useMemo(() => {
        return alumni.filter(a => 
            a.willingToMentor && 
            (a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             a.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
             a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [alumni, searchTerm]);

    return (
        <div className="space-y-6">
            {selectedAlumni && <ProfileModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} showToast={showToast} />}

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h1 className="text-3xl font-bold text-slate-800">Mentorship Program</h1>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Connect with experienced alumni who are ready to guide you. Search by name, skill, or industry to find your perfect mentor.</p>
            </div>
            
            {/* FIX: Corrected sticky position to account for the header height and aligned styling with other pages. */}
            <div className="sticky top-[4rem] bg-slate-100/80 backdrop-blur-sm py-4 z-10">
                 <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <SearchIcon className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for mentors by skill, name, job title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mentors.length > 0 ? (
                    mentors.map(mentor => (
                        <div key={mentor.id} onClick={() => setSelectedAlumni(mentor)} className="cursor-pointer">
                            <AlumniCard alumni={mentor} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-slate-500">No mentors found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mentorship;