import React, { useState } from 'react';
import type { Event } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { MapPinIcon } from './icons/MapPinIcon';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';

interface EventsProps {
    events: Event[];
    showToast: ShowToastFunction;
}

const Events: React.FC<EventsProps> = ({ events, showToast }) => {
    const [rsvpedEvents, setRsvpedEvents] = useState<Set<number>>(new Set());

    const handleRsvp = (event: Event) => {
        if (rsvpedEvents.has(event.id)) return;
        
        setRsvpedEvents(prev => new Set(prev).add(event.id));
        showToast(`You are now attending "${event.title}"!`, 'success');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h1 className="text-3xl font-bold text-slate-800">Community Events</h1>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Join workshops, networking sessions, and social gatherings. Reconnect and grow with your community.</p>
            </div>
            
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => {
                        const isAttending = rsvpedEvents.has(event.id);
                        return (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                <div className="p-6">
                                    <span className={`text-xs font-semibold px-2.5 py-1 mb-3 inline-block rounded-full ${
                                        event.type === 'Networking' ? 'bg-sky-100 text-sky-800' :
                                        event.type === 'Workshop' ? 'bg-purple-100 text-purple-800' :
                                        event.type === 'Webinar' ? 'bg-amber-100 text-amber-800' :
                                        'bg-rose-100 text-rose-800'
                                    }`}>{event.type}</span>
                                    <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                                    <div className="space-y-2 mt-3 text-sm text-slate-600">
                                        <p className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-slate-400"/>
                                            <span>{new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4 text-slate-400"/>
                                            <span>{event.location}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 border-t border-slate-200 p-6 text-sm text-slate-600 flex-1">
                                     <p>{event.description}</p>
                                </div>
                                <div className="p-4 bg-slate-50 border-t border-slate-200">
                                    <button 
                                        onClick={() => handleRsvp(event)}
                                        disabled={isAttending}
                                        className={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${
                                            isAttending 
                                            ? 'bg-emerald-500 text-white cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                    >
                                        {isAttending ? 'Attending' : 'RSVP Now'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <p className="text-slate-500">There are no upcoming events scheduled.</p>
                </div>
            )}
        </div>
    );
};

export default Events;