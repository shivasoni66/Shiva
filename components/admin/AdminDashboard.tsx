import React from 'react';
import type { AppData } from '../../types';
import { UsersIcon } from '../icons/UsersIcon';
import { BriefcaseIcon } from '../icons/BriefcaseIcon';
import { CalendarIcon } from '../icons/CalendarIcon';

interface AdminDashboardProps {
    data: Omit<AppData, 'currentUser'>;
}

const StatCard: React.FC<{ title: string; value: number; icon: React.FC<React.SVGProps<SVGSVGElement>> }> = ({ title, value, icon: Icon }) => (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex items-center gap-4">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
            <Icon className="h-6 w-6"/>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Alumni" value={data.alumni.length} icon={UsersIcon} />
                <StatCard title="Total Jobs" value={data.jobs.length} icon={BriefcaseIcon} />
                <StatCard title="Total Events" value={data.events.length} icon={CalendarIcon} />
            </div>
             <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Welcome, Admin!</h2>
                <p className="text-slate-600">This is your control center for the ConnectEd platform. You can manage user profiles, job postings, and community events from the navigation on the left. All changes you make here will be reflected across the application in real-time.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
