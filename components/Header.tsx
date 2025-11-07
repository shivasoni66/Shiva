import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';
import type { Page } from '../constants';
import { BellIcon } from './icons/BellIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { MenuIcon } from './icons/MenuIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LogOutIcon } from './icons/LogOutIcon';
import { DashboardIcon } from './icons/DashboardIcon'; // For admin panel icon

interface HeaderProps {
    // Fix: User can be null before login or while loading.
    user: User | null;
    onLogout: () => void;
    onToggleSidebar: () => void;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onToggleSidebar, onNavigate }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavigation = (page: Page) => {
        onNavigate(page);
        setDropdownOpen(false);
    }
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button onClick={onToggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-700">
                             <MenuIcon className="h-6 w-6" />
                        </button>
                        <div className="flex-shrink-0">
                           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAACDCAYAAADlIuPvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGAAAP+lSURBVHhe7J0J3F1F+v/nF8l+JGkSJE3SpEkSjQhGBBGxKCoqiKjYUVFFFLEgKliiAUTFiiAiioqA2GNEI01Smm57sv/vOf3eN/e+l+ySJLv3fj7f+Xn3vve+l9y5c8+5c/adg/cQkKYS0eXQ4S7d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3-AAAAAAAALm51d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d...Aq+i=" alt='ConnectEd Logo' className="h-10" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                            <BellIcon className="h-6 w-6" />
                        </button>
                        <div className="relative" ref={dropdownRef}>
                           {user && (
                             <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
                                <img 
                                    className="h-9 w-9 rounded-full object-cover" 
                                    src={user.profilePictureUrl} 
                                    alt={user.name} 
                                />
                                <span className="hidden sm:inline font-semibold text-slate-700">{user.name}</span>
                                <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                            </button>
                           )}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 ring-1 ring-black ring-opacity-5">
                                    {user?.role === 'alumni' && (
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('profile'); }} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                            <UserCircleIcon className="h-5 w-5"/>
                                            My Profile
                                        </a>
                                    )}
                                    {user?.role === 'admin' && (
                                         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('admin'); }} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                            <DashboardIcon className="h-5 w-5"/>
                                            Admin Panel
                                        </a>
                                    )}
                                    <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                        <LogOutIcon className="h-5 w-5" />
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;