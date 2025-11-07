import React, { useState } from 'react';
import type { AppData, Job, Event, Alumni } from '../types';
import type { AdminPage } from '../constants';
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import JobManagement from './admin/JobManagement';
import EventManagement from './admin/EventManagement';
import { NAV_ITEMS_ADMIN } from '../constants';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';


interface AdminPanelProps {
    data: Omit<AppData, 'currentUser'>;
    onDeleteAlumni: (id: number) => void;
    onAddJob: (job: Omit<Job, 'id'>) => void;
    onDeleteJob: (id: number) => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
    onDeleteEvent: (id: number) => void;
    showToast: ShowToastFunction;
}


const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

    const renderContent = () => {
        switch (currentPage) {
            case 'dashboard':
                return <AdminDashboard data={data} />;
            case 'users':
                return <UserManagement alumni={data.alumni} onDelete={props.onDeleteAlumni} />;
            case 'jobs':
                return <JobManagement jobs={data.jobs} onAdd={props.onAddJob} onDelete={props.onDeleteJob} alumniNames={data.alumni.map(a => a.name)} />;
            case 'events':
                return <EventManagement events={data.events} onAdd={props.onAddEvent} onDelete={props.onDeleteEvent} />;
            default:
                return <AdminDashboard data={data} />;
        }
    };
    
    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            <div className="bg-white w-full lg:w-64 rounded-xl shadow-sm p-4 flex-shrink-0">
                <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">Admin Panel</h2>
                <ul className="space-y-2">
                    {NAV_ITEMS_ADMIN.map(item => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.path;
                        return (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(item.path as AdminPage);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                        isActive
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-semibold">{item.name}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPanel;