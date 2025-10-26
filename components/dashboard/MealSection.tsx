
import React, { useState } from 'react';
import { FoodEntry, MealType } from '../../types';
import { ChevronDown, Trash2 } from 'lucide-react';

interface MealSectionProps {
  title: MealType;
  entries: FoodEntry[];
  onDelete: (entryId: string) => void;
}

const MealSection: React.FC<MealSectionProps> = ({ title, entries, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <button
        className="w-full flex justify-between items-center p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-slate-500">{Math.round(totalCalories)} calories</p>
        </div>
        <ChevronDown
          size={24}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {entries.length > 0 ? (
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {entries.map(entry => (
                <li key={entry.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{entry.foodName}</p>
                    <p className="text-sm text-slate-500">{entry.servingSize} &bull; {Math.round(entry.calories)} cal</p>
                  </div>
                  <button onClick={() => onDelete(entry.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-400 py-4">No food logged for this meal.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MealSection;
