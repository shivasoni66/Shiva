import { DashboardIcon } from './components/icons/DashboardIcon';
import { UsersIcon } from './components/icons/UsersIcon';
import { HandshakeIcon } from './components/icons/HandshakeIcon';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { CalendarIcon } from './components/icons/CalendarIcon';
import { UserCircleIcon } from './components/icons/UserCircleIcon';


export const NAV_ITEMS = [
    { name: 'Dashboard', path: 'dashboard', icon: DashboardIcon },
    { name: 'Alumni Directory', path: 'directory', icon: UsersIcon },
    { name: 'Mentorship', path: 'mentorship', icon: HandshakeIcon },
    { name: 'Jobs Board', path: 'jobs', icon: BriefcaseIcon },
    { name: 'Events', path: 'events', icon: CalendarIcon },
    { name: 'My Profile', path: 'profile', icon: UserCircleIcon },
];

export const NAV_ITEMS_ADMIN = [
    { name: 'Dashboard', path: 'dashboard', icon: DashboardIcon },
    { name: 'User Management', path: 'users', icon: UsersIcon },
    { name: 'Job Management', path: 'jobs', icon: BriefcaseIcon },
    { name: 'Event Management', path: 'events', icon: CalendarIcon },
];


export type Page = 'dashboard' | 'directory' | 'mentorship' | 'jobs' | 'events' | 'profile' | 'admin';
export type AdminPage = 'dashboard' | 'users' | 'jobs' | 'events';