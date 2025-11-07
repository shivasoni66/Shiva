import React, { useState } from 'react';
import type { Job } from '../../types';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { XIcon } from '../icons/XIcon';


interface JobManagementProps {
    jobs: Job[];
    alumniNames: string[];
    onAdd: (job: Omit<Job, 'id'>) => void;
    onDelete: (id: number) => void;
}

const JobManagement: React.FC<JobManagementProps> = ({ jobs, alumniNames, onAdd, onDelete }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    
    const handleDelete = (id: number, title: string) => {
        if (window.confirm(`Are you sure you want to delete the job posting for "${title}"?`)) {
            onDelete(id);
        }
    };

    return (
        <div>
            {isAddModalOpen && (
                <AddJobModal 
                    onClose={() => setAddModalOpen(false)} 
                    onAdd={onAdd}
                    alumniNames={alumniNames}
                />
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Job Management</h1>
                <button 
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5"/>
                    <span>Add Job</span>
                </button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Posted Date</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td className="py-4 px-6 whitespace-nowrap font-semibold text-slate-800">{job.title}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{job.company}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{job.type}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{new Date(job.postedDate).toLocaleDateString()}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button onClick={() => handleDelete(job.id, job.title)} className="text-red-600 hover:text-red-800 p-2 ml-2 rounded-md hover:bg-red-50 transition-colors">
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AddJobModal: React.FC<{onClose: () => void; onAdd: (job: Omit<Job, 'id'>) => void; alumniNames: string[]}> = ({ onClose, onAdd, alumniNames }) => {
    const [formState, setFormState] = useState({
        title: '', company: '', location: '', type: 'Full-time' as Job['type'], description: '', postedBy: alumniNames[0] || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({ ...formState, postedDate: new Date().toISOString() });
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">Add New Job Posting</h2>
                    <button onClick={onClose} className="text-slate-500 hover:bg-slate-100 rounded-full p-2"><XIcon/></button>
                </div>
                {/* FIX: Added form id to associate the external submit button with this form. */}
                <form id="add-job-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Job Title" name="title" value={formState.title} onChange={handleChange} required />
                        <FormField label="Company" name="company" value={formState.company} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <FormField label="Location" name="location" value={formState.location} onChange={handleChange} placeholder="e.g., Bhopal, MP or Remote" required />
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                             <select name="type" value={formState.type} onChange={handleChange} className="form-input">
                                <option>Full-time</option>
                                <option>Internship</option>
                                <option>Contract</option>
                                <option>Part-time</option>
                             </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleChange} rows={5} className="form-input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Posted By (Alumni)</label>
                        <select name="postedBy" value={formState.postedBy} onChange={handleChange} className="form-input">
                            {alumniNames.map(name => <option key={name}>{name}</option>)}
                        </select>
                    </div>
                </form>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-50">Cancel</button>
                    {/* FIX: Removed onClick and added form attribute to link to the form. */}
                    <button type="submit" form="add-job-form" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Add Job</button>
                </div>
            </div>
        </div>
    );
};

const FormField: React.FC<{label: string, name: string, value: string, onChange: any, placeholder?: string, required?: boolean}> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input id={props.name} type="text" {...props} className="form-input" />
    </div>
);

export default JobManagement;