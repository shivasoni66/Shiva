
import React, { useState, useMemo } from 'react';
import type { Alumni, Filters } from '../types';
import { XIcon } from './icons/XIcon';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  alumni: Alumni[];
  currentFilters: Filters;
  onApplyFilters: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose, alumni, currentFilters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState<Filters>(currentFilters);

  const { years, majors, locations } = useMemo(() => {
    const yearSet = new Set<number>();
    const majorSet = new Set<string>();
    const locationSet = new Set<string>();
    alumni.forEach(a => {
      yearSet.add(a.graduationYear);
      majorSet.add(a.major);
      locationSet.add(a.location);
    });
    return {
      years: Array.from(yearSet).sort((a, b) => b - a),
      majors: Array.from(majorSet).sort(),
      locations: Array.from(locationSet).sort()
    };
  }, [alumni]);

  const handleCheckboxChange = (category: keyof Filters, value: string | number) => {
    // FIX: Re-implemented with type guards to ensure type safety when manipulating different set types.
    // The original implementation had type inference issues with the Set constructor and its methods.
    setLocalFilters(prev => {
      if (category === 'years') {
        const newSet = new Set(prev.years);
        if (typeof value === 'number') {
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
        }
        return { ...prev, years: newSet };
      } else { // 'majors' or 'locations'
        const currentSet = prev[category];
        const newSet = new Set(currentSet);
        if (typeof value === 'string') {
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
        }
        return { ...prev, [category]: newSet };
      }
    });
  };
  
  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    // FIX: Explicitly type the new Sets to avoid them being inferred as Set<unknown>.
    const clearedFilters = { years: new Set<number>(), majors: new Set<string>(), locations: new Set<string>() };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  const activeFilterCount = localFilters.years.size + localFilters.majors.size + localFilters.locations.size;

  return (
    <>
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
        ></div>
        <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                <button onClick={onClose} className="text-slate-500 hover:text-slate-700"><XIcon /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <FilterSection title="Graduation Year">
                    {years.map(year => (
                        <Checkbox 
                            key={year} 
                            label={year.toString()} 
                            checked={localFilters.years.has(year)}
                            onChange={() => handleCheckboxChange('years', year)}
                        />
                    ))}
                </FilterSection>
                <FilterSection title="Major">
                     {majors.map(major => (
                        <Checkbox 
                            key={major} 
                            label={major} 
                            checked={localFilters.majors.has(major)}
                            onChange={() => handleCheckboxChange('majors', major)}
                        />
                    ))}
                </FilterSection>
                 <FilterSection title="Location">
                     {locations.map(location => (
                        <Checkbox 
                            key={location} 
                            label={location} 
                            checked={localFilters.locations.has(location)}
                            onChange={() => handleCheckboxChange('locations', location)}
                        />
                    ))}
                </FilterSection>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-4">
                <button 
                    onClick={handleClear}
                    disabled={activeFilterCount === 0}
                    className="w-1/2 bg-white border border-slate-300 text-slate-700 font-bold py-2.5 px-4 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Clear All
                </button>
                 <button 
                    onClick={handleApply}
                    className="w-1/2 bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    </>
  );
};

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{title}</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {children}
        </div>
    </div>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input 
            type="checkbox" 
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-slate-700">{label}</span>
    </label>
);

export default FilterPanel;