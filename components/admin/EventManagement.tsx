import React, { useState } from 'react';
import type { Event } from '../../types';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { XIcon } from '../icons/XIcon';

interface EventManagementProps {
    events: Event[];
    onAdd: (event: Omit<Event, 'id'>) => void;
    onDelete: (id: number) => void;
}

const EventManagement: React.FC<EventManagementProps> = ({ events, onAdd, onDelete }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleDelete = (id: number, title: string) => {
        if (window.confirm(`Are you sure you want to delete the event "${title}"?`)) {
            onDelete(id);
        }
    };
    
    return (
        <div>
            {isAddModalOpen && <AddEventModal onClose={() => setAddModalOpen(false)} onAdd={onAdd} />}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Event Management</h1>
                 <button 
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <PlusIcon className="h-5 w-5"/>
                    <span>Add Event</span>
                </button>
            </div>
             <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="py-3 px-6 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {events.map(event => (
                            <tr key={event.id}>
                                <td className="py-4 px-6 whitespace-nowrap font-semibold text-slate-800">{event.title}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{new Date(event.date).toLocaleString()}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{event.location}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-slate-600">{event.type}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button onClick={() => handleDelete(event.id, event.title)} className="text-red-600 hover:text-red-800 p-2 ml-2 rounded-md hover:bg-red-50 transition-colors">
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

const AddEventModal: React.FC<{onClose: () => void; onAdd: (event: Omit<Event, 'id'>) => void;}> = ({ onClose, onAdd }) => {
    const [formState, setFormState] = useState({
        title: '', location: '', type: 'Networking' as Event['type'], description: '', date: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventDate = new Date(formState.date).toISOString();
        onAdd({ ...formState, date: eventDate });
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">Add New Event</h2>
                    <button onClick={onClose} className="text-slate-500 hover:bg-slate-100 rounded-full p-2"><XIcon/></button>
                </div>
                {/* FIX: Added form id to associate the external submit button with this form. */}
                <form id="add-event-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                     <FormField label="Event Title" name="title" value={formState.title} onChange={handleChange} required />
                     <FormField label="Date and Time" name="date" type="datetime-local" value={formState.date} onChange={handleChange} required />
                     <FormField label="Location" name="location" value={formState.location} onChange={handleChange} placeholder="e.g., SISTec-R Campus or Online" required />
                     <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
                         <select name="type" value={formState.type} onChange={handleChange} className="form-input">
                            <option>Networking</option>
                            <option>Workshop</option>
                            <option>Webinar</option>
                            <option>Social</option>
                         </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea name="description" value={formState.description} onChange={handleChange} rows={4} className="form-input" required />
                    </div>
                </form>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-50">Cancel</button>
                    {/* FIX: Removed onClick and added form attribute to link to the form. */}
                    <button type="submit" form="add-event-form" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Add Event</button>
                </div>
            </div>
        </div>
    );
};

const FormField: React.FC<{label: string, name: string, value: string, onChange: any, type?: string, placeholder?: string, required?: boolean}> = ({ label, type="text", ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input id={props.name} type={type} {...props} className="form-input" />
    </div>
);

export default EventManagement;