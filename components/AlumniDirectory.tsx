import React, { useState, useMemo } from 'react';
import type { Alumni, Filters } from '../types';
// Fix: Corrected import path for type definition from the centralized types file.
import type { ShowToastFunction } from '../types';
import AlumniCard from './AlumniCard';
import ProfileModal from './ProfileModal';
import FilterPanel from './FilterPanel';
import { SearchIcon } from './icons/SearchIcon';
import { FilterIcon } from './icons/FilterIcon';

interface AlumniDirectoryProps {
  alumni: Alumni[];
  showToast: ShowToastFunction;
}

const AlumniDirectory: React.FC<AlumniDirectoryProps> = ({ alumni, showToast }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        years: new Set(),
        majors: new Set(),
        locations: new Set(),
    });

    const filteredAlumni = useMemo(() => {
        return alumni.filter(a => {
            const searchMatch = searchTerm === '' ||
                a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                a.company.toLowerCase().includes(searchTerm.toLowerCase());
            
            const yearMatch = filters.years.size === 0 || filters.years.has(a.graduationYear);
            const majorMatch = filters.majors.size === 0 || filters.majors.has(a.major);
            const locationMatch = filters.locations.size === 0 || filters.locations.has(a.location);

            return searchMatch && yearMatch && majorMatch && locationMatch;
        });
    }, [alumni, searchTerm, filters]);

    const activeFilterCount = filters.years.size + filters.majors.size + filters.locations.size;

    return (
        <div className="space-y-6">
            {selectedAlumni && <ProfileModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} showToast={showToast} />}
            <FilterPanel 
                isOpen={isFilterOpen} 
                onClose={() => setFilterOpen(false)}
                alumni={alumni}
                currentFilters={filters}
                onApplyFilters={setFilters}
            />

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h1 className="text-3xl font-bold text-slate-800">Alumni Directory</h1>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Explore the network from Sagar Institute of Science, Technology and Engineering. Find classmates, colleagues, and connections.</p>
            </div>
            
            <div className="sticky top-[4rem] bg-slate-100/80 backdrop-blur-sm py-4 z-10 flex flex-col sm:flex-row gap-4 items-center">
                 <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                       <SearchIcon className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, major, company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                </div>
                <button 
                    onClick={() => setFilterOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-full hover:bg-slate-50 transition-colors relative"
                >
                    <FilterIcon className="h-5 w-5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAlumni.length > 0 ? (
                    filteredAlumni.map(alum => (
                        <div key={alum.id} onClick={() => setSelectedAlumni(alum)} className="cursor-pointer">
                            <AlumniCard alumni={alum} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-slate-500">No alumni found. Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniDirectory;