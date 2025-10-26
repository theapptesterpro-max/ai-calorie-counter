import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { AIFoodItem, MealType } from '../../types';
import { getMealTypeForCurrentTime } from '../../utils/helpers';


interface AIFoodReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: AIFoodItem[];
  onLog: (itemsToLog: AIFoodItem[]) => void;
}

const AIFoodReviewModal: React.FC<AIFoodReviewModalProps> = ({ isOpen, onClose, results, onLog }) => {
  const [editedResults, setEditedResults] = useState<AIFoodItem[]>(results);
  const [selectedItems, setSelectedItems] = useState<boolean[]>(results.map(() => true));
  const [mealType, setMealType] = useState<MealType>(getMealTypeForCurrentTime());

  useEffect(() => {
    setEditedResults(results);
    setSelectedItems(results.map(() => true));
  }, [results]);

  // FIX: Type 'number' is not assignable to type 'never'.
  // Replaced original logic to prevent type conflicts by parsing values before assignment
  // within a type-safe switch statement that allows TypeScript to infer correct types.
  const handleUpdate = (index: number, field: keyof AIFoodItem, value: any) => {
    setEditedResults(prev => {
      const newResults = [...prev];
      const itemToUpdate = { ...newResults[index] };

      switch (field) {
        case 'calories':
        case 'proteinGrams':
        case 'carbsGrams':
        case 'fatsGrams':
          itemToUpdate[field] = parseFloat(value) || 0;
          break;
        case 'foodName':
        case 'portionSize':
          itemToUpdate[field] = value;
          break;
        // No default case needed, 'confidence' is not editable here.
      }

      newResults[index] = itemToUpdate;
      return newResults;
    });
  };
  
  const handlePortionChange = (index: number, multiplier: number) => {
    const newResults = [...editedResults];
    const item = newResults[index];
    newResults[index] = {
        ...item,
        calories: Math.round(item.calories * multiplier),
        proteinGrams: Math.round(item.proteinGrams * multiplier),
        carbsGrams: Math.round(item.carbsGrams * multiplier),
        fatsGrams: Math.round(item.fatsGrams * multiplier),
    };
    setEditedResults(newResults);
  };

  const handleToggleSelect = (index: number) => {
    const newSelected = [...selectedItems];
    newSelected[index] = !newSelected[index];
    setSelectedItems(newSelected);
  };

  const handleLog = () => {
    const itemsToLog = editedResults.filter((_, index) => selectedItems[index]);
    onLog(itemsToLog);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review AI Results">
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Review and edit the items identified by AI. Uncheck any items you don't want to log.</p>
        
        {editedResults.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700/50">
            <div className="flex items-start gap-4">
                <input type="checkbox" checked={selectedItems[index]} onChange={() => handleToggleSelect(index)} className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"/>
                <div className="flex-1">
                    <input type="text" value={item.foodName} onChange={e => handleUpdate(index, 'foodName', e.target.value)} className="font-semibold bg-transparent w-full mb-1" />
                    <input type="text" value={item.portionSize} onChange={e => handleUpdate(index, 'portionSize', e.target.value)} className="text-sm text-slate-500 bg-transparent w-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-sm">
                <div><label className="text-xs text-slate-400">Cal</label><input type="number" value={Math.round(item.calories)} onChange={e => handleUpdate(index, 'calories', e.target.value)} className="w-full bg-transparent" /></div>
                <div><label className="text-xs text-slate-400">Protein</label><input type="number" value={Math.round(item.proteinGrams)} onChange={e => handleUpdate(index, 'proteinGrams', e.target.value)} className="w-full bg-transparent" /></div>
                <div><label className="text-xs text-slate-400">Carbs</label><input type="number" value={Math.round(item.carbsGrams)} onChange={e => handleUpdate(index, 'carbsGrams', e.target.value)} className="w-full bg-transparent" /></div>
                <div><label className="text-xs text-slate-400">Fats</label><input type="number" value={Math.round(item.fatsGrams)} onChange={e => handleUpdate(index, 'fatsGrams', e.target.value)} className="w-full bg-transparent" /></div>
            </div>
            <div className="flex gap-1 mt-2">
                {[0.5, 0.75, 1.25, 1.5].map(m => (
                    <button key={m} onClick={() => handlePortionChange(index, m)} className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded">{m}x</button>
                ))}
            </div>
          </div>
        ))}

        <select value={mealType} onChange={e => setMealType(e.target.value as MealType)} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
          {Object.values(MealType).map(meal => <option key={meal} value={meal}>{meal}</option>)}
        </select>
        
        <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="bg-slate-200 text-slate-800 py-2 px-4 rounded-lg">Cancel</button>
            <button onClick={handleLog} className="bg-green-600 text-white py-2 px-4 rounded-lg">Log Selected Foods</button>
        </div>
      </div>
    </Modal>
  );
};

export default AIFoodReviewModal;