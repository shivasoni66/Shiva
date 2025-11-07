
import React, { useState } from 'react';
import type { User, AdminUser, Alumni, AlumniUser } from '../types';
import ResetPasswordModal from './ResetPasswordModal';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
    alumni: Alumni[];
    showToast: ShowToastFunction;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, alumni, showToast }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isResetModalOpen, setResetModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            // Admin Login
            if (email.toLowerCase() === 'admin@connected.com' && password === 'ram123') {
                const adminUser: AdminUser = {
                    id: 999,
                    name: 'Ram Bhandarkar',
                    email: 'admin@connected.com',
                    profilePictureUrl: 'https://i.pravatar.cc/150?u=rambhandarkar',
                    role: 'admin',
                };
                onLogin(adminUser);
            } 
            // Special user login for Shiva
            else if (email.toLowerCase() === 'shiva@gmail.com' && password === 'shiva123') {
                 if (alumni.length > 0) {
                    const shivaUser: AlumniUser = { 
                        // Use a dummy profile based on the first alumnus but override with Shiva's details
                        ...alumni[0], 
                        id: 1000, 
                        name: 'Shiva Kumar', 
                        email: 'shiva@gmail.com', 
                        profilePictureUrl: `https://i.pravatar.cc/150?u=shivakumar`,
                        jobTitle: "Senior Software Engineer",
                        company: "ConnectEd Corp",
                        role: 'alumni' 
                    };
                    onLogin(shivaUser);
                } else {
                    setError('No alumni data available to create a test user.');
                }
            }
            // Alumni Login
            else {
                const foundAlumni = alumni.find(a => a.email.toLowerCase() === email.toLowerCase());
                if (foundAlumni && password === 'password123') {
                    const alumniUser: AlumniUser = { ...foundAlumni, role: 'alumni' };
                    onLogin(alumniUser);
                } else {
                    setError('Invalid credentials. Please try again.');
                }
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            <ResetPasswordModal 
                isOpen={isResetModalOpen}
                onClose={() => setResetModalOpen(false)}
                showToast={showToast}
            />
            <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
                <div className="w-full max-w-md">
                     <div className="text-center mb-8">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAACDCAYAAADlIuPvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGAAAP+lSURBVHhe7J0J3F1F+v/nF8l+JGkSJE3SpEkSjQhGBBGxKCoqiKjYUVFFFLEgKliiAUTFiiAiioqA2GNEI01Smm57sv/vOf3eN/e+l+ySJLv3fj7f+Xn3vve+l9y5c8+5c/adg/cQkKYS0eXQ4S7d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3-AAAAAAAALm51d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3" alt='ConnectEd Logo' className="h-20 mx-auto" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h2>
                        <p className="text-slate-500 mb-6">Sign in to the network of Sagar Institute of Science, Technology and Engineering.</p>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="e.g., shiva@gmail.com or admin@connected.com"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password"className="block text-sm font-medium text-slate-700">Password</label>
                                    <button 
                                        type="button" 
                                        onClick={() => setResetModalOpen(true)}
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="e.g., shiva123, ram123, or password123"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
