import React, { useState } from 'react';
import type { Job } from '../types';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import JobDetailsModal from './JobDetailsModal';
import { MapPinIcon } from './icons/MapPinIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SearchIcon } from './icons/SearchIcon';

interface JobsProps {
    jobs: Job[];
    showToast: ShowToastFunction;
}

const Jobs: React.FC<JobsProps> = ({ jobs, showToast }) => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {selectedJob && <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} showToast={showToast} />}

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h1 className="text-3xl font-bold text-slate-800">Jobs Board</h1>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Discover career opportunities shared by fellow alumni. Your next role could be right here.</p>
            </div>

            <div className="sticky top-[4rem] bg-slate-100/80 backdrop-blur-sm py-4 z-10">
                 <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <SearchIcon className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search jobs by title, company, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                </div>
            </div>
            
            {jobs.length === 0 ? (
                 <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-slate-500">No job opportunities available at the moment.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <ul className="divide-y divide-slate-200">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                               <li key={job.id} onClick={() => setSelectedJob(job)} className="p-6 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                        <div>
                                            <h3 className="text-lg font-bold text-indigo-600">{job.title}</h3>
                                            <p className="font-semibold text-slate-700">{job.company}</p>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                             <span className={`text-xs font-semibold px-2.5 py-1 inline-block rounded-full ${
                                                job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                                                job.type === 'Internship' ? 'bg-blue-100 text-blue-800' :
                                                job.type === 'Contract' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-slate-100 text-slate-800'
                                            }`}>{job.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                                        <span className="flex items-center gap-1.5"><MapPinIcon className="h-4 w-4" />{job.location}</span>
                                        <span className="flex items-center gap-1.5"><ClockIcon className="h-4 w-4" />Posted on {new Date(job.postedDate).toLocaleDateString()} by {job.postedBy}</span>
                                    </div>
                               </li>
                            ))
                        ) : (
                             <li className="p-6 text-center text-slate-500">
                                No jobs found matching your search.
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Jobs;