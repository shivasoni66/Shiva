import React from 'react';
import type { Alumni, Job, Event, User } from '../types';
import type { Page } from '../constants';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import AlumniCard from './AlumniCard';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface DashboardProps {
  user: User;
  alumni: Alumni[];
  jobs: Job[];
  events: Event[];
  showToast: ShowToastFunction;
  onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, alumni, jobs, events, onNavigate }) => {
    
    const mentors = alumni.filter(a => a.willingToMentor).slice(0, 4);
    const recentJobs = jobs.slice(0, 3);
    const upcomingEvents = events.slice(0, 2);
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="mt-2 text-slate-600">Here's what's happening in your network.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Featured Mentors */}
                    <DashboardSection title="Connect with Mentors" onSeeAll={() => onNavigate('mentorship')}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mentors.map(mentor => (
                               <AlumniCard key={mentor.id} alumni={mentor} simple />
                            ))}
                        </div>
                    </DashboardSection>
                    
                     {/* Recent Jobs */}
                    <DashboardSection title="Recent Job Postings" onSeeAll={() => onNavigate('jobs')}>
                         {recentJobs.length > 0 ? (
                            <ul className="space-y-4">
                                {recentJobs.map(job => (
                                    <li key={job.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-indigo-600">{job.title}</h4>
                                                <p className="text-sm font-medium text-slate-700">{job.company}</p>
                                                <p className="text-xs text-slate-500">{job.location}</p>
                                            </div>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                            }`}>{job.type}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 text-center py-4">No recent job postings.</p>
                        )}
                    </DashboardSection>
                </div>
                
                {/* Side Content */}
                <div className="space-y-8">
                    {/* Upcoming Events */}
                    <DashboardSection title="Upcoming Events" onSeeAll={() => onNavigate('events')}>
                         {upcomingEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {upcomingEvents.map(event => (
                                   <li key={event.id} className="p-4 bg-slate-50 rounded-lg">
                                       <p className="text-xs font-semibold text-purple-700">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</p>
                                       <h4 className="font-bold text-slate-800">{event.title}</h4>
                                       <p className="text-xs text-slate-500">{event.location}</p>
                                   </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 text-center py-4">No upcoming events.</p>
                        )}
                    </DashboardSection>
                    
                    {user.role === 'admin' && (
                        <div className="bg-indigo-600 text-white p-6 rounded-xl text-center">
                            <h3 className="font-bold text-xl">Admin Access</h3>
                            <p className="text-sm opacity-90 mt-2">You have administrative privileges. Manage users, jobs, and events from the admin panel.</p>
                            <button onClick={() => onNavigate('admin')} className="mt-4 bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                                Go to Admin Panel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DashboardSection: React.FC<{ title: string; onSeeAll: () => void; children: React.ReactNode }> = ({ title, onSeeAll, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <button onClick={onSeeAll} className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                See all <ArrowRightIcon className="h-4 w-4" />
            </button>
        </div>
        <div>{children}</div>
    </div>
);

export default Dashboard;