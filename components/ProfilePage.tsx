import React from 'react';
import type { AlumniUser } from '../types';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { MapPinIcon } from './icons/MapPinIcon';


interface ProfilePageProps {
    user: AlumniUser;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex-shrink-0 text-center">
                    <img 
                        src={user.profilePictureUrl} 
                        alt={user.name}
                        className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg border-4 border-white"
                    />
                     <h1 className="text-3xl font-bold text-slate-800 mt-4">{user.name}</h1>
                     <p className="text-indigo-600 font-semibold">{user.jobTitle}</p>
                </div>
                <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                        <InfoItem icon={BriefcaseIcon} text={user.company} />
                        <InfoItem icon={MapPinIcon} text={user.location} />
                        <InfoItem icon={GraduationCapIcon} text={`Class of ${user.graduationYear}`} />
                        <InfoItem icon={GraduationCapIcon} text={user.major} />
                    </div>
                     <div>
                        <h4 className="font-bold text-slate-700 mb-2">About</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{user.bio}</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-slate-700 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map(skill => (
                                <span key={skill} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                         <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{icon: React.FC<React.SVGProps<SVGSVGElement>>, text: string}> = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
        <Icon className="h-5 w-5 text-slate-400 flex-shrink-0" />
        <span className="truncate">{text}</span>
    </div>
);


export default ProfilePage;