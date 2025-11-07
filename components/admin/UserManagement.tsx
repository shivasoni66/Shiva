import React from 'react';
import type { Alumni } from '../../types';
import { TrashIcon } from '../icons/TrashIcon';

interface UserManagementProps {
    alumni: Alumni[];
    onDelete: (id: number) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ alumni, onDelete }) => {

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete the profile for ${name}? This action cannot be undone.`)) {
            onDelete(id);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
            </div>
             <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Graduation Year</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {alumni.map(user => (
                            <tr key={user.id}>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <img className="h-10 w-10 rounded-full object-cover" src={user.profilePictureUrl} alt={user.name} />
                                        <div>
                                            <div className="font-semibold text-slate-800">{user.name}</div>
                                            <div className="text-sm text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{user.jobTitle}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{user.graduationYear}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button onClick={() => handleDelete(user.id, user.name)} className="text-red-600 hover:text-red-800 p-2 ml-2 rounded-md hover:bg-red-50 transition-colors">
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

export default UserManagement;
