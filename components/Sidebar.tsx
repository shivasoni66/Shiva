
import React, { useState } from 'react';
// Fix: Removed NAV_ITEMS_ADMIN as it is not suitable for the main sidebar.
import { NAV_ITEMS, Page } from '../constants';
import GiveBackModal from './GiveBackModal';
// Fix: Corrected import path for type definitions from the centralized types file.
import type { ShowToastFunction } from '../types';
import type { User } from '../types';
// Fix: Import DashboardIcon for the 'Admin Panel' link.
import { DashboardIcon } from './icons/DashboardIcon';

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isOpen: boolean;
    onClose: () => void;
    showToast: ShowToastFunction;
    userRole: User['role'];
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, onClose, showToast, userRole }) => {
    const [isGiveBackOpen, setGiveBackOpen] = useState(false);
    
    const handleNavigate = (page: Page) => {
        onNavigate(page);
        onClose(); // Close sidebar on mobile after navigation
    };
    
    // Fix: Build navigation items dynamically based on user role to prevent routing errors.
    let itemsToRender = [...NAV_ITEMS];

    // "My Profile" is only for alumni.
    if (userRole !== 'alumni') {
        itemsToRender = itemsToRender.filter(item => item.path !== 'profile');
    }

    // Add "Admin Panel" link for admins.
    if (userRole === 'admin') {
        itemsToRender.push({ name: 'Admin Panel', path: 'admin', icon: DashboardIcon });
    }
    
    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="p-4 flex-shrink-0">
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAACDCAYAAADlIuPvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGAAAP+lSURBVHhe7J0J3F1F+v/nF8l+JGkSJE3SpEkSjQhGBBGxKCoqiKjYUVFFFLEgKliiAUTFiiAiioqA2GNEI01Smm57sv/vOf3eN/e+l+ySJLv3fj7f+Xn3vve+l9y5c8+5c/adg/cQkKYS0eXQ4S7d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3-AAAAAAAALm51d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3" alt='ConnectEd Logo' className="h-14" />
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {itemsToRender.map(item => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.path;
                        return (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(item.path as Page);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                        isActive
                                        ? 'bg-indigo-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                    }`}
                                >
                                    {Icon && <Icon className="h-5 w-5" />}
                                    <span className="font-semibold">{item.name}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            {userRole === 'alumni' && (
                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={() => setGiveBackOpen(true)}
                        className="w-full flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 font-bold py-2.5 px-4 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                       <img src="https://img.icons8.com/color/48/university.png" alt="Give Back" className="h-5 w-5" />
                        <span>Give Back</span>
                    </button>
                </div>
            )}
        </div>
    );
    
    return (
        <>
            <GiveBackModal isOpen={isGiveBackOpen} onClose={() => setGiveBackOpen(false)} showToast={showToast} />
            {/* Mobile Sidebar */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose}
            ></div>
            <aside 
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {sidebarContent}
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-white shadow-sm flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
                {sidebarContent}
            </aside>
        </>
    );
};

export default Sidebar;